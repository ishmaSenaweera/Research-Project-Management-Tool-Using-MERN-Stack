const router = require("express").Router();
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register

router.post("/register", async (req, res) => {
  try {

    const {name} = req.body;
    const {dob} = Date.parse(req.body);
    const {gender} = req.body;
    const {mobile} = req.body;
    const {nic} = req.body;
    const {email} = req.body;
    const {password} = req.body;
    const {passwordVerify} = req.body;

    console.log({dob});

    // validation

    if (!name || !dob || !gender || !mobile || !nic || !email || !password || !passwordVerify)
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

    const existingStudent = await Admin.findOne({ email });
    if (existingStudent)
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

    // sign the token

    const token = jwt.sign(
      {
        admin: savedAdmin._id,
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
