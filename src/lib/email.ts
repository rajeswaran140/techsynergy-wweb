import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Thin wrapper over the AWS SES SendEmail API.
 *
 * Region defaults to ca-central-1 (matches the Amplify app's region so SES
 * calls stay in-country). Override per-environment via MY_AWS_REGION or
 * AWS_REGION env vars.
 *
 * Sender address defaults to CONTACT_EMAIL but should be overridden via
 * SES_FROM_ADDRESS once a dedicated no-reply address is verified in SES
 * (so the visible "from" stays user-friendly even if the reply target
 * differs).
 *
 * NOTE: a fresh SES account starts in *sandbox* mode — outbound mail can
 * only be sent to verified addresses. Notify-the-team emails to CONTACT_EMAIL
 * work immediately; auto-respond emails to arbitrary visitor addresses
 * require requesting SES production access from the AWS console. The route
 * handler treats SES failures as non-fatal so a sandbox limit doesn't
 * lose the lead.
 */

const ses = new SESClient({
  region:
    process.env.MY_AWS_REGION ||
    process.env.AWS_REGION ||
    "ca-central-1",
});

export const FROM_EMAIL = process.env.SES_FROM_ADDRESS || CONTACT_EMAIL;

export type SendEmailArgs = {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** If set, replies go to this address instead of FROM_EMAIL. */
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendEmailArgs): Promise<void> {
  await ses.send(
    new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Charset: "UTF-8", Data: subject },
        Body: {
          Text: { Charset: "UTF-8", Data: text },
          Html: { Charset: "UTF-8", Data: html },
        },
      },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
    })
  );
}
