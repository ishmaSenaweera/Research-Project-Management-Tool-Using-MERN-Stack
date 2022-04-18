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

//only loggedin student can access
//delete loggedin student account

router.delete("/account/delete", studentAccess, async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.body.user._id);

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been successfully deleted.`;
    await emailUtil(result.email, "Successfully Deleted", message);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only loggedin student can access
//update loggedin student account

router.post("/account/update", studentAccess, async (req, res) => {
  try {
    const validated = await valid.studentUpdateSchema.validateAsync(req.body);

    const result = await update(req.body.user._id, validated);
    res.send(result);

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

//only loggedin student can access
//get loggedin student account

router.get("/account", studentAccess, async (req, res) => {
  try {
    const student = req.body.user;
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
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

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been deleted by admin.`;
    await emailUtil(result.email, "Successfully Deleted By Admin", message);
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

    const result = await update(validated.id, validated);
    res.send(result);

    const message = `Dear ${validated.name},\nYour account has been updated by admin.`;
    await emailUtil(validated.email, "Successfully Updated By Admin", message);
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

//update student details
async function update(id, validated) {
  try {
    await Student.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      specialization: validated.specialization,
      batch: validated.batch,
      branch: validated.branch,
      mobile: validated.mobile,
      nic: validated.nic,
    }).exec();
    return true;
  } catch (error) {
    console.error(err);
    return false;
  }
}

module.exports = router;
