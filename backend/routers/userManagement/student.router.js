const router = require("express").Router();
const Student = require("../../models/userManagement/student.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/functions.util.js");
const valid = require("../../utils/validation.util");
const { adminAccess } = require("../../middleware/accessChecker");

//anyone can access
//register
/* The above code is a POST request to the /register route. It is used to register a new student. */
router.post("/register", async (req, res) => {
  try {
    // validation
    /* Validating the request body using the Joi schema. */
    const validated = await valid.studentRegisterSchema.validateAsync(req.body);

    /* This is a function that checks if the email is already registered. */
    const user = await func.findUser({ email: validated.email });
    const existingStudent = user.existingUser;

    /* This is a function that checks if the email is already registered. */
    if (existingStudent)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    /* This is a function that hashes the password. */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db
    /* This is creating a new student object. */
    const newStudent = await new Student({
      name: validated.name,
      sid: validated.sid,
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

    /* This is saving the new student object to the database. */
    const savedStudent = await newStudent.save();

    //email verification
    /* This is a function that generates a token for the student. */
    const token = await func.getVerifyToken(savedStudent._id);

    /* This is a function that sends a verification email to the student. */
    await email.sendVeri(
      savedStudent.email,
      savedStudent.name,
      savedStudent._id,
      token.token
    );

    /* This is sending a response to the client. */
    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//only admin can access
//get student
/* This is a GET request to the /info route. It is used to get the details of a student. */
router.get("/info", adminAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.body;

    /* This is a function that finds a student by the id. */
    const student = await Student.findById(id);
    /* Sending the student object to the client. */
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get all students
/* This is a GET request to the / route. It is used to get all the students. */
router.get("/", adminAccess, async (req, res) => {
  try {
    /* This is a function that finds all the students in the database. */
    const student = await Student.find();
    /* Sending the student object to the client. */
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//delete student
/* This is a DELETE request to the /delete route. It is used to delete a student. */
router.delete("/delete", adminAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.body;
    /* This is a function that deletes a student from the database. */
    const result = await Student.findByIdAndDelete(id);

    /* This is a function that sends an email to the student when the admin deletes the student. */
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
/* This is a PUT request to the /update route. It is used to update a student. */
router.put("/update", adminAccess, async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await valid.studentUpdateSchema.validateAsync(req.body);

    /* This is a function that updates a student in the database. */
    const result = await func.updateStudent(validated.id, validated);

    /* This is a function that sends an email to the student when the admin updates the student. */
    email.sendSuccUpAd(validated.email, validated.name);
    /* Sending the result to the client. */
    res.send(result);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
