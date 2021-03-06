const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    nic: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
