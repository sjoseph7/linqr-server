const ezKey = require("../../../../utils/ezKey");
const Collection = require("../../models/Collection");
const generateUniqueName = require("../../../../utils/generateUniqueName");

module.exports = async (req, res) => {
  const name = generateUniqueName();

  try {
    const collection = await Collection.create({ name, slug: ezKey() });
    if (!collection) throw Error();

    return res.status(201).json({ success: true, collection });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, err: `unable to create collection` });
  }
};
