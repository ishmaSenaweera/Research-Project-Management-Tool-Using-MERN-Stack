const router = require("express").Router();
const Admin = require("../../models/userManagement/admin.model");
const Staff = require("../../models/userManagement/staff.model");
const Student = require("../../models/userManagement/student.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const { userAccess } = require("../../middleware/accessChecker");

//loggedin user can access
//delete loggedin account
router.delete("/delete", userAccess, async (req, res) => {
  try {
    let result = false;
    const type = req.body.type;

    if (type === "Admin") {
      result = await Admin.findByIdAndDelete(req.body.user._id);
    } else if (type === "Staff") {
      result = await Staff.findByIdAndDelete(req.body.user._id);
    } else if (type === "Student") {
      result = await Student.findByIdAndDelete(req.body.user._id);
    }
    console.log(result);
    email.sendSuccDel(result.email, result.name);
    await func.removeCookie(res);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//loggedin user can access
//update loggedin account
router.post("/update", userAccess, async (req, res) => {
  try {
    let validated = null;
    let result = false;
    const type = req.body.type;

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

    email.sendSuccUp(validated.email, validated.name);
    res.send(result);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errormessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//loggedin user can access
//update loggedin password
router.post("/changepassword", userAccess, async (req, res) => {
  try {
    const validated = await valid.changePasswordSchema.validateAsync(req.body);

    // hash the password
    const isPasswordCorrect = await bcrypt.compare(
      validated.password,
      validated.user.passwordHash
    );
    if (!isPasswordCorrect)
      return res.status(401).json({ errorMessage: "Wrong Current Password." });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.newPassword, salt);

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

    email.sendSuccChPas(validated.user.email, validated.user.name);
    await func.removeCookie(res);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errormessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//loggedin user can access
//get loggedin account
router.get("/", userAccess, async (req, res) => {
  try {
    const admin = req.body.user;
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
