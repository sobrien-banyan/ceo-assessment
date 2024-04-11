// server/api/send-email.post.ts
import { SES } from '@aws-sdk/client-ses';
const config = useRuntimeConfig();

const ses = new SES({ region: config.awsSesRegion })

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pdfBuffer = Buffer.from(body.pdfData.split("base64,")[1], 'base64');
  const params = {
    Source: config.senderEmail,
    Destination: {
      ToAddresses: [body.toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body.template,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'CEO Works Assessment',
      },
    },
    Attachments: [{
      Filename: 'CEOWorksAssessment.pdf',
      Data: pdfBuffer,
    }],
  };

  await ses.sendEmail(params);
  return { message: 'Email sent' };
});
