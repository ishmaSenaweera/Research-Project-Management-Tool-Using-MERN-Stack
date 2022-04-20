const Student = require("../models/login/student.model");
const Admin = require("../models/login/admin.model");
const Staff = require("../models/login/staff.model");
const Token = require("../models/login/token.model");
const crypto = require("crypto");

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

// create verification token
async function getVerifyToken(id) {
  const result = await Token.findOne({ userID: id });

  if (result) await result.remove();

  const token = await new Token({
    userID: id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  return token;
}

//update admin details
async function updateAdmin(id, validated) {
  try {
    await Admin.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      mobile: validated.mobile,
      nic: validated.nic,
    }).exec();
    return true;
  } catch (error) {
    console.error(err);
    return false;
  }
}

//update staff details
async function updateStaff(id, validated) {
  try {
    await Staff.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      type: validated.type,
      mobile: validated.mobile,
      nic: validated.nic,
    }).exec();
    return true;
  } catch (error) {
    console.error(err);
    return false;
  }
}

//update student details
async function updateStudent(id, validated) {
  try {
    await Student.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      specialization: validated.specialization,
      batch: validated.batch,
      branch: validated.branch,
      mobile: validated.mobile,
      nic: validated.nic,
    }).exec();
    return true;
  } catch (error) {
    console.error(err);
    return false;
  }
}

//remove cookie from the browser session
async function removeCookie(res) {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

module.exports = {
  findUserById,
  findUser,
  getVerifyToken,
  updateAdmin,
  updateStaff,
  updateStudent,
  removeCookie,
};
