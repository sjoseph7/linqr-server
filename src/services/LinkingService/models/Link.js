const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    groupId: { type: String, required: true },
    deviceId: { type: String, required: true },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
