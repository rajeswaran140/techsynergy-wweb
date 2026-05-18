import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, validateRequest } from "@/lib/validation";
import { createInquiry } from "@/lib/models/inquiries";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

/**
 * POST /api/contact
 *
 * Lead intake pipeline:
 *   1. Rate-limit (3/hour per IP via lib/rate-limit if Redis is configured;
 *      no-op otherwise).
 *   2. Parse JSON, drop honeypot submissions silently with a 200.
 *   3. Validate against contactFormSchema (Zod).
 *   4. Save to DynamoDB via createInquiry().
 *   5. Send two SES emails — one to the team (notify), one to the visitor
 *      (auto-respond). SES failures are logged but do NOT fail the request,
 *      because the lead record is already persisted.
 *
 * Replaces the legacy us-east-1 API Gateway + Lambda endpoint so the form
 * submission stays in the same region as the rest of the site.
 */
export async function POST(request: NextRequest) {
  // 1. Rate limit
  const rateLimited = await checkRateLimit(request, "contact");
  if (rateLimited) return rateLimited;

  // 2. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Honeypot — bots that fill the hidden `_honey` field get a 200 with no
  // side effects, so they don't learn we're filtering them.
  const honey =
    typeof body === "object" && body !== null
      ? (body as { _honey?: unknown })._honey
      : undefined;
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3. Validate
  const result = validateRequest(contactFormSchema, body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const lead = result.data;

  // 4. Persist
  let inquiryId: string;
  try {
    const inquiry = await createInquiry({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || undefined,
      company: lead.company || undefined,
      service: lead.service,
      message: lead.message,
    });
    inquiryId = inquiry.id;
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return NextResponse.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 }
    );
  }

  // 5. Send emails — failures here are non-fatal. The lead is already saved
  // so we'd rather return success and have the team see the gap in their
  // inbox than lose the lead entirely.
  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `[techsynergy.ca] New ${lead.service} inquiry from ${lead.name}`,
    text: notifyTeamText(lead, inquiryId),
    html: notifyTeamHtml(lead, inquiryId),
    replyTo: lead.email,
  }).catch((err) => {
    console.error("SES notify-team email failed:", err);
  });

  await sendEmail({
    to: lead.email,
    subject: "Thanks for reaching out to TechSynergy",
    text: autoRespondText(lead),
    html: autoRespondHtml(lead),
  }).catch((err) => {
    console.error("SES auto-respond email failed:", err);
  });

  return NextResponse.json({ ok: true, id: inquiryId }, { status: 200 });
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

type Lead = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
};

function notifyTeamText(lead: Lead, inquiryId: string): string {
  return [
    `New inquiry from ${lead.name} <${lead.email}>`,
    "",
    `Service:  ${lead.service}`,
    `Company:  ${lead.company || "—"}`,
    `Phone:    ${lead.phone || "—"}`,
    `Message:`,
    "",
    lead.message,
    "",
    "---",
    `Inquiry ID: ${inquiryId}`,
    `Reply directly to this email to respond to ${lead.name}.`,
  ].join("\n");
}

function notifyTeamHtml(lead: Lead, inquiryId: string): string {
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.5; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="margin: 0 0 16px;">New inquiry — ${escapeHtml(lead.service)}</h2>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr><td style="padding: 6px 0; color: #64748b; width: 100px;">From:</td><td><strong>${escapeHtml(lead.name)}</strong> &lt;<a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>&gt;</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Company:</td><td>${escapeHtml(lead.company || "—")}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Phone:</td><td>${escapeHtml(lead.phone || "—")}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Service:</td><td>${escapeHtml(lead.service)}</td></tr>
  </table>
  <div style="border-left: 4px solid #1160f7; padding: 12px 16px; background: #f1f5f9; white-space: pre-wrap;">${escapeHtml(lead.message)}</div>
  <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Inquiry ID: <code>${escapeHtml(inquiryId)}</code> &middot; Reply directly to this email to respond.</p>
</body></html>`;
}

function autoRespondText(lead: Lead): string {
  return [
    `Hi ${lead.name},`,
    "",
    "Thanks for reaching out to TechSynergy. We've received your inquiry and will respond within one business day.",
    "",
    `For reference, you asked about: ${lead.service}.`,
    "",
    "If your question is urgent, you can also reach us directly on LinkedIn:",
    "https://www.linkedin.com/in/rajwaran/",
    "",
    "Talk soon,",
    "The TechSynergy team",
    "",
    "---",
    `${SITE_URL}`,
    "Markham, Ontario, Canada",
  ].join("\n");
}

function autoRespondHtml(lead: Lead): string {
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #0f172a; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p>Hi ${escapeHtml(lead.name)},</p>
  <p>Thanks for reaching out to TechSynergy. We&rsquo;ve received your inquiry and will respond within one business day.</p>
  <p style="color: #475569;">For reference, you asked about: <strong>${escapeHtml(lead.service)}</strong>.</p>
  <p>If your question is urgent, you can also reach us directly on <a href="https://www.linkedin.com/in/rajwaran/" style="color: #1160f7;">LinkedIn</a>.</p>
  <p>Talk soon,<br>The TechSynergy team</p>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 16px;">
  <p style="color: #94a3b8; font-size: 12px;">
    <a href="${SITE_URL}" style="color: #94a3b8;">techsynergy.ca</a> &middot; Markham, Ontario, Canada
  </p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
