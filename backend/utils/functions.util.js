const Student = require("../models/userManagement/student.model");
const Admin = require("../models/userManagement/admin.model");
const Staff = require("../models/userManagement/staff.model");
const Token = require("../models/userManagement/token.model");
const crypto = require("crypto");

/**
 * It finds a user by id, and returns the type of user and the user object.
 * @param id - The id of the user to be found
 * @returns An object with two properties: type and existingUser.
 */
async function findUserById(id) {
  try {
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
  } catch (error) {
    throw new TypeError();
  }
}

/**
 * It takes an input, and searches for a user in the Student, Staff, and Admin collections. If it finds
 * a user, it returns the type of user and the user object. If it doesn't find a user, it returns null
 * @param input - {email: "email@email.com"}
 * @returns An object with two properties: type and existingUser.
 */
async function findUser(input) {
  try {
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
  } catch (error) {
    throw new TypeError();
  }
}

/**
 * It finds a token in the database with the userID of the user that is trying to verify their email,
 * if it finds one it removes it, then it creates a new token and saves it to the database.
 * @param id - The user's id
 * @returns The token is being returned.
 */
async function getVerifyToken(id) {
  try {
    /* Finding a token in the database with the userID of the user that is trying to verify their email. */
    const result = await Token.findOne({ userID: id });

    /* Checking if the result is not null, if it is not null it is removing the result. */
    if (result) await result.remove();

    /* Creating a new token and saving it to the database. */
    const token = await new Token({
      userID: id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    return token;
  } catch (error) {
    throw new TypeError();
  }
}

/**
 * It updates the admin's details in the database.
 * @param id - the id of the admin to be updated
 * @param validated - {
 * @returns A promise.
 */
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

/**
 * It updates the staff details in the database.
 * @param id - the id of the staff member to be updated
 * @param validated - {
 * @returns A promise.
 */
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

/**
 * It updates a student's details in the database
 * @param id - The id of the student to be updated.
 * @param validated - {
 * @returns A boolean value.
 */
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

/**
 * It removes the cookie from the client's browser.
 * @param res - the response object
 */
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
    res.status(500).send();
    throw new TypeError();
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
