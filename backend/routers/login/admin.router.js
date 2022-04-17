const router = require("express").Router();
const Admin = require("../../models/login/admin.model");
const bcrypt = require("bcryptjs");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");
const crypto = require("crypto");
const func = require("../../utils/func.util.js");

//register admin

router.post("/register", async (req, res) => {
  try {
    const { name } = req.body;
    const { dob } = req.body;
    const { gender } = req.body;
    const { mobile } = req.body;
    const { nic } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { passwordVerify } = req.body;

    // validation

    if (
      !name ||
      !dob ||
      !gender ||
      !mobile ||
      !nic ||
      !email ||
      !password ||
      !passwordVerify
    )
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const user = await func.findUser({ email });
    const existingAdmin = user.existingUser;
    if (existingAdmin)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newAdmin = new Admin({
      name,
      dob,
      gender,
      mobile,
      nic,
      email,
      passwordHash,
    });

    const savedAdmin = await newAdmin.save();

    //email verification

    const token = await new Token({
      userID: savedAdmin._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `Dear ${savedAdmin.name},\nVerify your email address \n${process.env.BASE_URL}login/verify/${savedAdmin._id}/${token.token}`;
    await emailUtil(savedAdmin.email, "Email Verification", url);

    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//delete admin

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Admin.findByIdAndDelete(id);
    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update admin

router.post("/update", async (req, res) => {
  try {
    const { id } = req.body;

    await Admin.findByIdAndUpdate(id, {
      name: req.body.name,
      dob: req.body.DoB,
      gender: req.body.gender,
      mobile: req.body.mobile,
      nic: req.body.nic,
      email: req.body.email,
    }).exec();

    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//get admin

router.get("/info", async (req, res) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id);
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get all admin

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
