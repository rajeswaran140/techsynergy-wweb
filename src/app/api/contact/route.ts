import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/models/inquiries";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateRequest, contactFormSchema } from "@/lib/validation";

const ses = new SESClient({
  region: process.env.MY_AWS_REGION || "us-east-1",
});

const NOTIFY_EMAIL = process.env.ADMIN_EMAIL || "rajeswaran.t@techsynergy.ca";
const FROM_EMAIL = `TechSynergy <noreply@techsynergy.ca>`;

export async function POST(request: NextRequest) {
  try {
    // Check rate limit first
    const rateLimitResponse = await checkRateLimit(request, 'contact');
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    // Validate request with Zod
    const validation = validateRequest(contactFormSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email, phone, company, service, message } = validation.data;

    const inquiry = await createInquiry({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      service,
      message,
    });

    // Send email notification
    try {
      await ses.send(
        new SendEmailCommand({
          Source: FROM_EMAIL,
          Destination: { ToAddresses: [NOTIFY_EMAIL] },
          Message: {
            Subject: { Data: `New Inquiry: ${service} — ${name}` },
            Body: {
              Html: {
                Data: `
                  <h2>New Contact Form Submission</h2>
                  <table style="border-collapse:collapse;width:100%;max-width:600px">
                    <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${escapeHtml(name)}</td></tr>
                    <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                    ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${escapeHtml(phone)}</td></tr>` : ""}
                    ${company ? `<tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${escapeHtml(company)}</td></tr>` : ""}
                    <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${escapeHtml(service)}</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
                  </table>
                `,
              },
              Text: {
                Data: `New inquiry from ${name} (${email})\nService: ${service}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`,
              },
            },
          },
          ReplyToAddresses: [email],
        })
      );
    } catch (sesError) {
      console.error("SES email failed:", sesError);
      // Don't fail the request — inquiry is already saved
    }

    return NextResponse.json(
      { message: "Inquiry submitted successfully!", id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
