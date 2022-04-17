const Student = require("../models/login/student.model");
const Admin = require("../models/login/admin.model");
const Staff = require("../models/login/staff.model");

// check user by id

async function findUserById(id) {
  var existingUser = await Student.findById(id);
  type = "Student";

  if (existingUser === null) {
    existingUser = await Staff.findById(id);
    type = "Staff";
  }

  if (existingUser === null) {
    existingUser = await Admin.findById(id);
    type = "Admin";
  }

  if (existingUser === null) {
    type = null;
  }

  return { type, existingUser };
}

// check user by any

async function findUser(input) {
  var existingUser = await Student.findOne(input);
  type = "Student";

  if (existingUser === null) {
    existingUser = await Staff.findOne(input);
    type = "Staff";
  }

  if (existingUser === null) {
    existingUser = await Admin.findOne(input);
    type = "Admin";
  }

  if (existingUser === null) {
    type = null;
  }

  return { type, existingUser };
}

module.exports = {
  findUserById,
  findUser,
};
