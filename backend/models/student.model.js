const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  specialization: { type: String, required: true },
  batch: { type: String, required: true },
  branch: { type: String, required: true },
  mobile: { type: Number, required: true },
  nic: { type: Number, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true,
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
