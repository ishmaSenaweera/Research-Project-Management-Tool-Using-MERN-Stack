const router = require("express").Router();
const Student = require("../../models/userManagement/student.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const { adminAccess } = require("../../middleware/accessChecker");

//anyone can access
//register
router.post("/register", async (req, res) => {
  try {
    // validation
    const validated = await valid.studentRegisterSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingStudent = user.existingUser;

    if (existingStudent)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db
    const newStudent = await new Student({
      name: validated.name,
      dob: validated.dob,
      gender: validated.gender,
      specialization: validated.specialization,
      batch: validated.batch,
      branch: validated.branch,
      mobile: validated.mobile,
      nic: validated.nic,
      email: validated.email,
      passwordHash: passwordHash,
    });

    const savedStudent = await newStudent.save();

    //email verification
    const token = await func.getVerifyToken(savedStudent._id);

    await email.sendVeri(
      savedStudent.email,
      savedStudent.name,
      savedStudent._id,
      token.token
    );

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

//only admin can access
//get student
router.get("/info", adminAccess, async (req, res) => {
  try {
    const { id } = req.body;

    const student = await Student.findById(id);
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get all students
router.get("/", adminAccess, async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//delete student
router.delete("/delete", adminAccess, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Student.findByIdAndDelete(id);

    email.sendSuccDelAd(result.email, result.name);
    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//update student
router.post("/update", adminAccess, async (req, res) => {
  try {
    const validated = await valid.studentUpdateSchema.validateAsync(req.body);

    const result = await func.updateStudent(validated.id, validated);

    email.sendSuccUpAd(validated.email, validated.name);
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

module.exports = router;
