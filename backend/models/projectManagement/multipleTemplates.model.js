const mongoose = require("mongoose");

const multipleFileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    files: [Object],
    fileVisibility: { type: String, required: true },    
    fileMessage: { type: String },
  },
  {
    timestamps: true,
  }
);

// Exporting Multiple Templates Model
module.exports = mongoose.model("multipleTemplates", multipleFileSchema);
