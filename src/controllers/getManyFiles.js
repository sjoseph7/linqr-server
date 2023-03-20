const File = require("../models/File");

module.exports = async (req, res) => {
  console.debug("getManyFiles");
  const { groupId } = req.params;

  try {
    const files = await File.find({ groupId }).select("-path");
    console.debug("getManyFiles1");
    if (!files) throw Error();

    console.debug("getManyFiles2");
    return res.status(200).json({ success: true, files });
  } catch (err) {
    console.error(err);
    console.debug("getManyFiles3");
    return res.status(500).json({
      success: false,
      err: `unable to find files from group '${groupId}'`,
    });
  }
};
