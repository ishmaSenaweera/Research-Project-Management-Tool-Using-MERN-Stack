const router = require("express").Router();
const Staff = require("../../models/login/staff.model");
const bcrypt = require("bcryptjs");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");
const crypto = require("crypto");
const func = require("../../utils/func.util.js");
const {
  staffRegisterSchema,
  staffUpdateSchema,
} = require("../../utils/valid.util");

//register staff

router.post("/register", async (req, res) => {
  try {
    // validation

    const validated = await staffRegisterSchema.validateAsync(req.body);

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

    const token = await new Token({
      userID: savedStaff._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

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

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Staff.findByIdAndDelete(id);
    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update staff

router.post("/update", async (req, res) => {
  try {
    const validated = await staffUpdateSchema.validateAsync(req.body);

    await Staff.findByIdAndUpdate(validated.id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      type: validated.type,
      mobile: validated.mobile,
      nic: validated.nic,
      email: validated.email,
    }).exec();

    res.send(true);
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

router.get("/info", async (req, res) => {
  try {
    const { id } = req.body;

    const staff = await Staff.findById(id);

    if (staff.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get all staff

router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();

    if (staff.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
