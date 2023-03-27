const multer = require("multer");
const File = require("../../models/File");
const { uploadManyToS3 } = require("./utils/uploadManyToS3");

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = [
  upload.array("files"),
  async (req, res) => {
    const { groupId } = req.params;
    let results;

    // Attempt to upload files to AWS S3
    try {
      const files = req.files;
      if (!files || files.length === 0)
        return res
          .status(400)
          .json({ success: false, err: "no file(s) provided" });
      results = await uploadManyToS3(files, groupId);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        err: "unable to upload files",
      });
    }

    const fileStatuses = await Promise.all(
      results.map(async (result) => {
        // Validate
        if (result.$metadata?.httpStatusCode !== 200 || !result.file)
          throw Error("file was not uploaded");

        const slug = result.Key;
        const name = result.file.originalname;
        const fileData = { name, groupId, slug };

        try {
          const file = await File.create(fileData);
          const returnData = { ...fileData, _id: file._id, slug: undefined };
          return { success: true, file: returnData };
        } catch (err) {
          console.error(err);
          return {
            success: false,
            file: { name, groupId },
            err: "unable to upload file",
          };
        }
      })
    );

    // Format response
    const success = fileStatuses.every((fileStatus) => fileStatus.success);
    const partialSuccess = fileStatuses.some(
      (fileStatus) => fileStatus.success
    );
    const files = fileStatuses.map((fileStatus) => {
      const { err, file } = fileStatus;
      if (err) return { err, ...file };
      return file;
    });
    const errs = fileStatuses.map(({ err }) => err || "");

    return res
      .status(success ? 201 : partialSuccess ? 207 /* Multi-Status */ : 400)
      .json({ success, files, errs });
  },
];
