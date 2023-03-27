const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3Client = new S3Client();

module.exports = async function deleteFile(key) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    const result = await s3Client.send(new DeleteObjectCommand(params));
    return result.$metadata?.httpStatusCode === 204;
  } catch (err) {
    console.error(err);
    return false;
  }
};
