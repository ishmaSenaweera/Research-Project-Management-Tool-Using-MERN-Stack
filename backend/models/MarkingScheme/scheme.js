const mongoose = require("mongoose");

var scheme = mongoose.model("scheme", {
  id: { type: String },
  name: { type: String, require: true },
  lecturer_in_charge: { type: String, require: true },
  module_name: { type: String, require: true },
  creativity: { type: Number, require: true },
  concept: { type: Number, require: true },
  quality: { type: Number, require: true },
});

module.exports = { scheme };
