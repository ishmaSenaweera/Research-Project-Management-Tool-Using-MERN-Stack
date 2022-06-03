const mongoose = require("mongoose");

const singleFileSchema = new mongoose.Schema(
  {    
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
    fileVisibility: { type: String, required: true },
    fileTopic: { type: String, required: true },
    fileMessage: { type: String },
  },
  {
    timestamps: true,
  }
);

// Exporting Single Template Model
module.exports = mongoose.model("singleTemplate", singleFileSchema);
