import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the model + email + rate-limit modules so we can assert side effects
// without hitting AWS or Redis. These mocks must be declared before importing
// the route handler so the import sees the mocked versions.
vi.mock("@/lib/models/inquiries", () => ({
  createInquiry: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendEmail: vi.fn(),
  FROM_EMAIL: "test-from@example.com",
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn(),
}));

import { POST } from "./route";
import { createInquiry } from "@/lib/models/inquiries";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

type MockedFn = ReturnType<typeof vi.fn>;
const createInquiryMock = createInquiry as unknown as MockedFn;
const sendEmailMock = sendEmail as unknown as MockedFn;
const checkRateLimitMock = checkRateLimit as unknown as MockedFn;

const VALID_BODY = {
  name: "Test User",
  email: "test@example.com",
  phone: "+1 555 0100",
  company: "Acme Inc.",
  service: "AI & MCP Integration",
  message: "We need help building a Claude MCP server for our internal API.",
};

/** Build a minimal Request that the route handler will accept. */
function makeRequest(body: unknown, opts: { contentType?: string } = {}) {
  const init: RequestInit = {
    method: "POST",
    headers: { "content-type": opts.contentType ?? "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
  return new Request("https://techsynergy.ca/api/contact", init) as unknown as Parameters<typeof POST>[0];
}

beforeEach(() => {
  vi.clearAllMocks();
  // Default mocks: rate-limit allows, DB succeeds, email succeeds.
  checkRateLimitMock.mockResolvedValue(null);
  createInquiryMock.mockResolvedValue({
    id: "test-inquiry-id",
    status: "new",
    createdAt: new Date().toISOString(),
    ...VALID_BODY,
  });
  sendEmailMock.mockResolvedValue(undefined);
});

describe("POST /api/contact", () => {
  it("returns 200 + saves inquiry + sends both emails for valid input", async () => {
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({ ok: true, id: "test-inquiry-id" });

    expect(createInquiryMock).toHaveBeenCalledTimes(1);
    expect(createInquiryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test User",
        email: "test@example.com",
        service: "AI & MCP Integration",
      })
    );

    // Two emails: notify team + auto-respond visitor
    expect(sendEmailMock).toHaveBeenCalledTimes(2);

    const calls = sendEmailMock.mock.calls.map((c) => c[0]);
    const teamCall = calls.find((c) => c.to === "rajeswaran.t@techsynergy.ca");
    const visitorCall = calls.find((c) => c.to === "test@example.com");

    expect(teamCall).toBeDefined();
    expect(teamCall.subject).toMatch(/New AI & MCP Integration inquiry/);
    expect(teamCall.replyTo).toBe("test@example.com");

    expect(visitorCall).toBeDefined();
    expect(visitorCall.subject).toMatch(/Thanks for reaching out/);
  });

  it("returns 400 on invalid email", async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(createInquiryMock).not.toHaveBeenCalled();
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("returns 400 on too-short message", async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, message: "hi" }));
    expect(res.status).toBe(400);
    expect(createInquiryMock).not.toHaveBeenCalled();
  });

  it("returns 400 on missing required field", async () => {
    const incomplete = { ...VALID_BODY };
    delete (incomplete as Record<string, unknown>).service;
    const res = await POST(makeRequest(incomplete));
    expect(res.status).toBe(400);
    expect(createInquiryMock).not.toHaveBeenCalled();
  });

  it("returns 400 on invalid JSON body", async () => {
    const res = await POST(makeRequest("{not-json", { contentType: "application/json" }));
    expect(res.status).toBe(400);
    expect(createInquiryMock).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without saving or emailing", async () => {
    const res = await POST(
      makeRequest({ ...VALID_BODY, _honey: "i-am-a-bot" })
    );
    expect(res.status).toBe(200);
    expect(createInquiryMock).not.toHaveBeenCalled();
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("ignores blank honeypot (real users don't fill it)", async () => {
    const res = await POST(
      makeRequest({ ...VALID_BODY, _honey: "" })
    );
    expect(res.status).toBe(200);
    // Should proceed through the full pipeline
    expect(createInquiryMock).toHaveBeenCalledTimes(1);
  });

  it("returns 500 when DynamoDB save fails", async () => {
    createInquiryMock.mockRejectedValueOnce(new Error("DynamoDB unavailable"));
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(500);
    // No emails sent if persistence failed
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("still returns 200 when SES fails — record was already saved", async () => {
    sendEmailMock.mockRejectedValue(new Error("SES throttled"));
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    // Both email attempts still made
    expect(sendEmailMock).toHaveBeenCalledTimes(2);
    expect(createInquiryMock).toHaveBeenCalledTimes(1);
  });

  it("respects rate-limit response when checkRateLimit returns one", async () => {
    const tooMany = new Response("Too many requests", { status: 429 });
    checkRateLimitMock.mockResolvedValueOnce(tooMany);
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(429);
    expect(createInquiryMock).not.toHaveBeenCalled();
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("trims and stores name/email correctly via Zod schema", async () => {
    await POST(
      makeRequest({
        ...VALID_BODY,
        name: "  Test User  ",
      })
    );
    expect(createInquiryMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Test User" })
    );
  });

  it("normalizes empty optional phone/company to undefined for DynamoDB", async () => {
    await POST(
      makeRequest({
        ...VALID_BODY,
        phone: "",
        company: "",
      })
    );
    const payload = createInquiryMock.mock.calls[0][0];
    expect(payload.phone).toBeUndefined();
    expect(payload.company).toBeUndefined();
  });
});
