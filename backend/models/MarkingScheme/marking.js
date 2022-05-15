const mongoose = require("mongoose");

var marking = mongoose.model("marking", {
  markingref: { type: String },
  modname: { type: String },
  lecname: { type: String },
  conceptmarks: { type: Number },
  qualitymarks: { type: Number },
  creativemarks: { type: Number },
});

module.exports = { marking };
