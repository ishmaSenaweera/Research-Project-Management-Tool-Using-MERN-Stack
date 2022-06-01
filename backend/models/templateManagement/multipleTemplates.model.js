const mongoose = require("mongoose");

const multipleFileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    files: [Object],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("multipleTemplates", multipleFileSchema);
