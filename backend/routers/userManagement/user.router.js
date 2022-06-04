const router = require("express").Router();
const Admin = require("../../models/userManagement/admin.model");
const Staff = require("../../models/userManagement/staff.model");
const Student = require("../../models/userManagement/student.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/functions.util.js");
const valid = require("../../utils/validation.util");
const { userAccess } = require("../../middleware/accessChecker");

//loggedin user can access
//delete loggedin account
/* Deleting the user account. */
router.delete("/delete", userAccess, async (req, res) => {
  try {
    let result = false;
    /* Getting the type of the user. */
    const type = req.body.type;

    /* Deleting the user account. */
    if (type === "Admin") {
      result = await Admin.findByIdAndDelete(req.body.user._id);
    } else if (type === "Staff") {
      result = await Staff.findByIdAndDelete(req.body.user._id);
    } else if (type === "Student") {
      result = await Student.findByIdAndDelete(req.body.user._id);
    }

    /* Sending an email to the user who deleted their account. */
    email.sendSuccDel(result.email, result.name);
    /* Removing the cookie from the browser. */
    await func.removeCookie(res);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//loggedin user can access
//update loggedin account
/* This is a route handler for the update route. It is updating the user account. */
router.put("/update", userAccess, async (req, res) => {
  try {
    let validated = null;
    let result = false;
    /* Getting the type of the user. */
    const type = req.body.type;

    /* Checking the type of the user and updating the user account. */
    if (type === "Admin") {
      validated = await valid.adminUpdateSchema.validateAsync(req.body);
      result = await func.updateAdmin(req.body.user._id, validated);
    } else if (type === "Staff") {
      validated = await valid.staffUpdateSchema.validateAsync(req.body);
      result = await func.updateStaff(req.body.user._id, validated);
    } else if (type === "Student") {
      validated = await valid.studentUpdateSchema.validateAsync(req.body);
      result = await func.updateStudent(req.body.user._id, validated);
    }

    /* Sending an email to the user who updated their account. */
    email.sendSuccUp(validated.email, validated.name);
    /* Sending the result to the client. */
    res.send(result);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//loggedin user can access
//update loggedin password
/* This is a route handler for the update route. It is updating the user account. */
router.put("/changepassword", userAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await valid.changePasswordSchema.validateAsync(req.body);

    /* Comparing the password entered by the user with the password stored in the database. */
    const isPasswordCorrect = await bcrypt.compare(
      validated.password,
      validated.user.passwordHash
    );

    /* Checking if the password entered by the user is correct or not. */
    if (!isPasswordCorrect)
      return res.status(401).json({ errorMessage: "Wrong Current Password." });

    // hash the password
    /* Hashing the password. */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.newPassword, salt);

    /* Checking the type of the user and updating the password of the user. */
    if (validated.type === "Admin") {
      await Admin.findByIdAndUpdate(validated.user._id, {
        passwordHash: passwordHash,
      }).exec();
    } else if (validated.type === "Staff") {
      await Staff.findByIdAndUpdate(validated.user._id, {
        passwordHash: passwordHash,
      }).exec();
    } else if (validated.type === "Student") {
      await Student.findByIdAndUpdate(validated.user._id, {
        passwordHash: passwordHash,
      }).exec();
    }

    /* Sending an email to the user who changed their password. */
    email.sendSuccChPas(validated.user.email, validated.user.name);
    /* Removing the cookie from the browser. */
    await func.removeCookie(res);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//loggedin user can access
//get loggedin account
/* Getting the loggedin user account. */
router.get("/", userAccess, async (req, res) => {
  try {
    /* Getting the user from the request body. */
    const user = req.body.user;
    /* Sending the user object to the client. */
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
