// server/api/send-email.post.ts
import { SES } from '@aws-sdk/client-ses';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const config = useRuntimeConfig();

const ses = new SES({ region: config.awsSesRegion });
const s3 = new S3Client({ region: config.awsSesRegion });

const uploadFileToS3 = async (pdfData: string, username: string) => {
  console.log('Uploading file to S3:', config.bucketName);
  const base64Data = Buffer.from(pdfData.replace(/^data:application\/\w+;base64,/, ""), "base64");

  const params = {
    Bucket: config.bucketName,
    Key: `CEOWorksAssessment-${username}.pdf`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'application/pdf'
  };

  try {
    const response = await s3.send(new PutObjectCommand(params));

    console.log('File uploaded to S3:', response);
    return params.Key;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
  }
};

const createPresignedUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: config.bucketName,
    Key: key,
  });

  try {
    return await getSignedUrl(s3, command, { expiresIn: 604800 });
  } catch (error) {
    console.error('Error creating presigned URL:', error);
  }
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pdfKey = await uploadFileToS3(body.pdfBuffer, body.username);
  const pdfUrl = pdfKey ? await createPresignedUrl(pdfKey) : null;

  if (!pdfUrl) {
    return { message: 'Error uploading file to S3' };
  }
  
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
                <p>Thank you for completing the assessment!</p>
                <p>View and download your personalized assessment report <a href="${pdfUrl}">here</a>.</p>
              </body>
            </html>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'CEO Works Assessment Results',
      },
    }
  };

  await ses.sendEmail(params);
  return { message: 'Email sent' };
});
