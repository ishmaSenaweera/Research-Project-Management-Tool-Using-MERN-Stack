const router = require("express").Router();
const Student = require("../../models/login/student.model");
const bcrypt = require("bcryptjs");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");
const crypto = require("crypto");
const func = require("../../utils/func.util.js");
const {
  studentSchemaRegister,
  studentSchemaUpdate,
} = require("../../utils/valid.util");

//register

router.post("/register", async (req, res) => {
  try {
    // validation

    const result = await studentSchemaRegister.validateAsync(req.body);

    const user = await func.findUser({ email: result.email });
    const existingStudent = user.existingUser;

    if (existingStudent)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(result.password, salt);

    // save a new user account to the db

    const newStudent = await new Student({
      name: result.name,
      dob: result.dob,
      gender: result.gender,
      specialization: result.specialization,
      batch: result.batch,
      branch: result.branch,
      mobile: result.mobile,
      nic: result.nic,
      email: result.email,
      passwordHash: passwordHash,
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
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errormessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
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

    const result = await studentSchemaUpdate.validateAsync(req.body);

    await Student.findByIdAndUpdate(id, {
      name: result.name,
      dob: result.DoB,
      gender: result.gender,
      specialization: result.specialization,
      batch: result.batch,
      branch: result.branch,
      mobile: result.mobile,
      nic: result.nic,
      email: result.email,
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
