const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  type: { type: String, required: true },
  mobile: { type: String, required: true },
  nic: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default:false }
}, {
  timestamps: true,
});

const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;
