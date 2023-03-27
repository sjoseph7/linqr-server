const File = require("../../models/File");

module.exports = async (req, res) => {
  const { groupId } = req.params;

  try {
    const files = await File.find({ groupId }).select("-slug -__v");
    if (!files) throw Error();

    return res.status(200).json({ success: true, files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      err: `unable to find files from group '${groupId}'`,
    });
  }
};
