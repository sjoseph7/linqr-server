const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const File = require("../../models/File");

const s3Client = new S3Client();

module.exports = async (req, res) => {
  const { collectionId, fileId } = req.params;
  let file;

  try {
    file = await File.findOneAndUpdate(
      { _id: fileId, collectionId },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!file) throw Error();
  } catch (err) {
    return res.status(404).json({
      success: false,
      err: `unable to find file with id '${fileId}'`,
    });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.slug,
  };

  try {
    // Help from -> https://stackoverflow.com/a/69831857
    res.attachment(file.slug);
    var fileStream = await s3Client.send(new GetObjectCommand(params));
    fileStream.Body.pipe(res);
    return;
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, err: "unable to download file" });
  }
};
