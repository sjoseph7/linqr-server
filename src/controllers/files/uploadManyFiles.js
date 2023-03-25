const multer = require("multer");
const File = require("../../models/File");

const upload = multer({ dest: "uploads" });

module.exports = [
  upload.array("files"),
  async (req, res) => {
    const { id: groupId } = req.params;

    // Attempt to upload files
    const fileStatuses = await Promise.all(
      (req.files || []).map(async (file) => {
        const { path, originalname: name } = file;
        const fileData = { path, name, groupId };

        try {
          const file = await File.create(fileData);
          const returnData = { ...fileData, _id: file._id, path: undefined };
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
