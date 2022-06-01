const mongoose = require("mongoose");

const singleFileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("singleTemplate", singleFileSchema);
