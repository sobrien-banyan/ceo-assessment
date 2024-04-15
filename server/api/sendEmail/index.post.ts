// server/api/send-email.post.ts
import { SES } from '@aws-sdk/client-ses';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const config = useRuntimeConfig();

const ses = new SES({ region: config.awsSesRegion });
const s3 = new S3Client({ region: config.awsSesRegion });

const uploadFileToS3 = async (pdfData: string, username: string) => {
  const params = {
    Bucket: 'ceo-works-pdf',
    Key: `CEOWorksAssessment${username}.pdf`,
    Body: Buffer.from(pdfData, 'base64'),
    ContentType: 'application/pdf'
  };

  await s3.send(new PutObjectCommand(params));

  return params.Key;
};

const createPresignedUrl = (key: string) => {
  const command = new GetObjectCommand({
    Bucket: config.bucketName,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 * 60 });
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pdfKey = await uploadFileToS3(body.pdfBuffer, body.username);
  const pdfUrl = createPresignedUrl(pdfKey);

  const params = {
    Source: config.senderEmail,
    Destination: {
      ToAddresses: [body.toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <html>
              <body>
                <p>Hi ${body.username},</p>
                <p>Please find the attached CEO Works Assessment PDF.</p>
                <p>Download the PDF <a href="${pdfUrl}">here</a>.</p>
              </body>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'CEO Works Assessment',
      },
    }
  };

  await ses.sendEmail(params);
  return { message: 'Email sent' };
});
