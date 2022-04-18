const router = require("express").Router();
const Student = require("../../models/login/student.model");
const bcrypt = require("bcryptjs");
const emailUtil = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const {
  studentAccess,
  adminAccess,
} = require("../../middleware/accessChecker");

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

router.delete("/delete", studentAccess, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Student.findByIdAndDelete(id);

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been successfully deleted.`;
    await emailUtil(result.email, "Successfully Deleted", message);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update student

router.post("/update", studentAccess, async (req, res) => {
  try {
    const validated = await valid.studentUpdateSchema.validateAsync(req.body);

    await Student.findByIdAndUpdate(validated.id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      specialization: validated.specialization,
      batch: validated.batch,
      branch: validated.branch,
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

//get student

router.get("/info", studentAccess, async (req, res) => {
  try {
    const { id } = req.body;

    const student = await Student.findById(id);
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

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

module.exports = router;
