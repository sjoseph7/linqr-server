const Group = require("../../models/Group");

module.exports = async (req, res) => {
  const { redirect } = req.body;
  try {
    const group = await Group.create({ redirect });
    if (!files) throw Error();
    return res.status(200).json({ success: true, group });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, err: `unable to find create from group` });
  }
};
