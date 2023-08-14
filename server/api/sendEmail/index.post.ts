// server/api/send-email.post.ts
import { SES } from '@aws-sdk/client-ses';
const config = useRuntimeConfig();

const ses = new SES({ region: config.awsSesRegion })

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = {
    Source: config.senderEmail,
    Destination: {
      ToAddresses: ['ecosean1@gmail.com'],
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
        Data: 'hello world',
      },
    },
  };

  await ses.sendEmail(params);
  return { message: 'Email sent' };
});
