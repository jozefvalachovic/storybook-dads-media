import { S3Client } from "@aws-sdk/client-s3";
export { GetObjectCommand } from "@aws-sdk/client-s3";
export { getSignedUrl as sdk_getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SESClient } from "@aws-sdk/client-ses";
export { SendEmailCommand } from "@aws-sdk/client-ses";

export * from "./s3";

export const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET as string,
  },
});
export const bucketName = process.env.AWS_S3_BUCKET_NAME as string;

export const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_SES_KEY_ID as string,
    secretAccessKey: process.env.AWS_SES_KEY_SECRET as string,
  },
});
