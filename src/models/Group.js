const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    // path: { type: String, required: true },
    // groupId: { type: String, required: true },
    // originalName: { type: String, required: true },
    // downloadCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
