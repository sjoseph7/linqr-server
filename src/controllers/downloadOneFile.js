const File = require("../models/File");

module.exports = async (req, res) => {
  const { groupId, fileId } = req.params;

  try {
    const file = await File.findOneAndUpdate(
      { _id: fileId, groupId },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!file) throw Error();

    return res.status(200).download(file.path, file.name);
  } catch (err) {
    return res.status(404).json({
      success: false,
      err: `unable to find file with id '${fileId}'`,
    });
  }
};
