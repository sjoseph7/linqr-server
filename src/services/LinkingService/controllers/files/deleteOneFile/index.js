const File = require("../../../models/File");
const deleteFile = require("./utils/deleteFile");

module.exports = async (req, res) => {
  const { collectionId, fileId } = req.params;

  try {
    const file = await File.findOne({ _id: fileId, collectionId }).catch();
    if (!file)
      return res.status(404).json({
        success: false,
        err: `unable to find file with id '${fileId}'`,
      });

    // Ensure the file is deleted _before_ deleting the file's record
    const success = deleteFile(file.slug);
    if (!success) throw Error();

    await File.deleteOne({ _id: fileId });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      err: `unable to delete file with id '${fileId}'`,
    });
  }
};
