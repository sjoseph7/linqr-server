const File = require("../../models/File");
const deleteFileLocally = require("./utils/deleteFileLocally");

module.exports = async (req, res) => {
  const { groupId, fileId } = req.params;

  try {
    const file = await File.findOne({ _id: fileId, groupId }).catch((_) => {});
    if (!file)
      return res.status(404).json({
        success: false,
        err: `unable to find file with id '${fileId}'`,
      });

    // Ensure the file is deleted _before_ deleting the file's record
    const success = deleteFileLocally(file.path);
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
