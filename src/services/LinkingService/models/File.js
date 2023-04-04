const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    collectionId: { type: String, required: true },
    downloadCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const File = mongoose.model("File", FileSchema);
module.exports = File;
