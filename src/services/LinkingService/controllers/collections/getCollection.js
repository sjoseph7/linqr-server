const Collection = require("../../models/Collection");

module.exports = async (req, res) => {
  const { collectionId } = req.params;

  try {
    const collection = await Collection.findOne({ slug: collectionId }).select(
      "-slug -__v"
    );
    if (!collection)
      return res.status(400).json({
        success: false,
        err: `unable to find collection '${collectionId}'`,
      });

    return res.status(200).json({ success: true, collection });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, err: `something went wrong` });
  }
};
