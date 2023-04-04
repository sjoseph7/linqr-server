const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    collectionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
