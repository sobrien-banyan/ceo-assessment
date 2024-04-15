// server/api/send-email.post.ts
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
const config = useRuntimeConfig();

const ses = new SESClient({ region: config.awsSesRegion })

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { toAddress, pdfBuffer, username } = body;
  const subject = 'Your CEO Works Assessment Results';
  const filename = 'CEOWorksAssessment.pdf';
  const date = new Date();
  const year = date.getFullYear();
  const htmlBody = `
      <p>Hi ${username},</p>
      <p>Please find attached your CEO Works Assessment results.</p>
      <p>Best regards,</p>
      <p>The CEO Works Team</p>
      PRIVACY POLICY | &copy; ${year} Center for Employment Opportunities. All rights reserved.
  `;

  const boundary = "----=_Part_" + Date.now().toString();
  const rawMessage = [
    "From: " + config.senderEmail,
    "To: " + toAddress,
    "Subject: " + subject,
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=\"" + boundary + "\"",
    "",
    "--" + boundary,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    htmlBody,
    "",
    "--" + boundary,
    "Content-Type: application/pdf",
    "Content-Disposition: attachment; filename=\"" + filename + "\"",
    "Content-Transfer-Encoding: base64",
    "",
    pdfBuffer.toString('base64'),
    "",
    "--" + boundary + "--"
  ].join("\n");

  const params = {
    RawMessage: { Data: new TextEncoder().encode(rawMessage) },
    Source: config.senderEmail,
    Destinations: [toAddress]
  };

  const command = new SendRawEmailCommand(params);

  try {
    await ses.send(command);
    return { status: 200, body: 'Email sent successfully' };
  } catch (error) {
    return { status: 500, body: error };
  }
});
