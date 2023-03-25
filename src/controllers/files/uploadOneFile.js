const multer = require("multer");
const File = require("../../models/File");

const upload = multer({ dest: "uploads" });

module.exports = [
  upload.single("file"),
  async (req, res) => {
    const { id: groupId } = req.params;
    const { path, originalname: name } = req.file;
    const fileData = { path, name, groupId };

    try {
      const file = await File.create(fileData);
      const returnData = { ...fileData, _id: file._id, path: undefined };
      return res.status(201).json({ success: true, file: returnData });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, err: "unable to upload file" });
    }
  },
];
