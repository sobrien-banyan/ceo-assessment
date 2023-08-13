// server/api/send-email.post.ts
import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: process.env.AWS_SES_REGION })

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = {
    Source: process.env.SENDER_EMAIL_ADDRESS,
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
