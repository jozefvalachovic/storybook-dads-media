import { s3Client, bucketName as Bucket, sdk_getSignedUrl, GetObjectCommand } from ".";

export const getSignedUrl = async (Key: string, expiresIn = 60 * 60 * 1) => {
  const params = {
    Bucket,
    Key,
    ResponseContentDisposition: "attachment",
  };
  const command = new GetObjectCommand(params);

  try {
    const signedUrl = await sdk_getSignedUrl(s3Client, command, {
      expiresIn,
    });

    return signedUrl;
  } catch (error) {
    console.error(error);

    return null;
  }
};
