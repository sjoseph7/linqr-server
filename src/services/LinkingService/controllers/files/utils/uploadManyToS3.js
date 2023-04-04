const ezKey = require("../../../../../utils/ezKey");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { AWS_BUCKET_NAME } = process.env;

// Help from -> https://www.youtube.com/watch?v=jwp4U6v-3h4
exports.uploadManyToS3 = async function (files, collectionId) {
  const s3Client = new S3Client();

  const Bucket = AWS_BUCKET_NAME;
  const params = files.map((file) => ({
    Bucket,
    Key: `${collectionId}/${ezKey()}-${file.originalname}`,
    Body: file.buffer,
  }));

  return (
    await Promise.all(
      params.map((param) => s3Client.send(new PutObjectCommand(param)))
    )
  ).map((result, index) => ({
    ...result,
    Key: params[index].Key,
    file: files[index],
  }));
};
