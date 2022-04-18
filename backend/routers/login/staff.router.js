const router = require("express").Router();
const Staff = require("../../models/login/staff.model");
const bcrypt = require("bcryptjs");
const emailUtil = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const { staffAccess, adminAccess } = require("../../middleware/accessChecker");

//register staff

router.post("/register", adminAccess, async (req, res) => {
  try {
    // validation

    const validated = await valid.staffRegisterSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingStaff = user.existingUser;

    if (existingStaff)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newStaff = await new Staff({
      name: validated.name,
      dob: validated.dob,
      gender: validated.gender,
      type: validated.type,
      mobile: validated.mobile,
      nic: validated.nic,
      email: validated.email,
      passwordHash: passwordHash,
    });

    const savedStaff = await newStaff.save();

    //email verification

    const token = await func.getVerifyToken(savedStaff._id);

    const url = `Dear ${savedStaff.name},\nVerify your email address \n${process.env.BASE_URL}login/verify/${savedStaff._id}/${token.token}`;
    await emailUtil(savedStaff.email, "Email Verification", url);

    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errormessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//delete staff

router.delete("/delete", staffAccess, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Staff.findByIdAndDelete(id);

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been successfully deleted.`;
    await emailUtil(result.email, "Successfully Deleted", message);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update staff

router.post("/update", staffAccess, async (req, res) => {
  try {
    const validated = await valid.staffUpdateSchema.validateAsync(req.body);

    await Staff.findByIdAndUpdate(validated.id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      type: validated.type,
      mobile: validated.mobile,
      nic: validated.nic,
    }).exec();
    res.send(true);

    const message = `Dear ${validated.name},\nYour account has been successfully updated.`;
    await emailUtil(validated.email, "Successfully Updated", message);
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

//get staff

router.get("/info", staffAccess, async (req, res) => {
  try {
    const { id } = req.body;

    const staff = await Staff.findById(id);
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get all staff

router.get("/", adminAccess, async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
