const router = require("express").Router();
const Student = require("../../models/login/student.model");
const bcrypt = require("bcryptjs");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");
const crypto = require("crypto");
const func = require("../../utils/func.util.js");

//register

router.post("/register", async (req, res) => {
  try {
    const { name } = req.body;
    const { dob } = req.body;
    const { gender } = req.body;
    const { specialization } = req.body;
    const { batch } = req.body;
    const { branch } = req.body;
    const { mobile } = req.body;
    const { nic } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { passwordVerify } = req.body;

    // validation

    if (
      !name ||
      !DoB ||
      !gender ||
      !specialization ||
      !batch ||
      !branch ||
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
    const existingStudent = user.existingUser;
    if (existingStudent)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newStudent = new Student({
      name,
      dob,
      gender,
      specialization,
      batch,
      branch,
      mobile,
      nic,
      email,
      passwordHash,
    });

    const savedStudent = await newStudent.save();

    //email verification

    const token = await new Token({
      userID: savedStudent._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `Dear ${savedStudent.name},\nVerify your email address \n${process.env.BASE_URL}login/verify/${savedStudent._id}/${token.token}`;
    await emailUtil(savedStudent.email, "Email Verification", url);

    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//delete student

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Student.findByIdAndDelete(id);
    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update student

router.post("/update", async (req, res) => {
  try {
    const { id } = req.body;

    await Student.findByIdAndUpdate(id, {
      name: req.body.name,
      dob: req.body.DoB,
      gender: req.body.gender,
      specialization: req.body.specialization,
      batch: req.body.batch,
      branch: req.body.branch,
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

//get student

router.get("/info", async (req, res) => {
  try {
    const { id } = req.body;

    const student = await Student.findById(id);

    if (student.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get all students

router.get("/", async (req, res) => {
  try {
    const student = await Student.find();

    if (student.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
