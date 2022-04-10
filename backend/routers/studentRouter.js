const router = require("express").Router();
const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminAccess = require("../middleware/adminAccess");

//register

router.post("/register", async (req, res) => {
  try {

    const {name} = req.body;
    const {DoB} = Date.parse(req.body);
    const {gender} = req.body;
    const {specialization} = req.body;
    const {branch} = req.body;
    const {mobile} = req.body;
    const {email} = req.body;
    const {password} = req.body;
    const {passwordVerify} = req.body;

    // validation

    if (!email || !password || !passwordVerify)
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

    const existingStudent = await Student.findOne({ email });
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
      DoB,
      gender,
      specialization,
      branch,
      mobile,
      email,
      passwordHash,
    });

    const savedStudent = await newStudent.save();

    // sign the token

    const token = jwt.sign(
      {
        student: savedStudent._id,
      },
      process.env.KEY
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
