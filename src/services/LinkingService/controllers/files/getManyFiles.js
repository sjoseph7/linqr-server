const File = require("../../models/File");

module.exports = async (req, res) => {
  const { collectionId } = req.params;

  try {
    const files = await File.find({ collectionId }).select("-slug -__v");
    if (!files) throw Error();

    return res.status(200).json({ success: true, files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      err: `unable to find files from collection '${collectionId}'`,
    });
  }
};
