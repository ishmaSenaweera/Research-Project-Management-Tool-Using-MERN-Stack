const router = require("express").Router();
const Staff = require("../../models/userManagement/staff.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/functions.util.js");
const valid = require("../../utils/validation.util");
const { adminAccess } = require("../../middleware/accessChecker");

/* The above code is a route handler for a POST request to the /register endpoint. It is used to
register a new staff member. */
router.post("/register", adminAccess, async (req, res) => {
  try {
    /* Validating the request body against the schema defined in the `validation.util.js` file. */
    const validated = await valid.staffRegisterSchema.validateAsync(req.body);

    /* This is a function that is defined in the `functions.util.js` file. It is used to check if a user
with the given email already exists in the database. */
    const user = await func.findUser({ email: validated.email });
    const existingStaff = user.existingUser;

    /* This is a check to see if a user with the given email already exists in the database. If a user with
the given email already exists, the user is informed that an account with the given email already
exists. */
    if (existingStaff)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    /* This is a function that is used to hash the password that is given by the user. */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    /* This is creating a new staff member. */
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

    /* Saving the new staff member to the database. */
    const savedStaff = await newStaff.save();

    //email verification
    /* It is used to generate a token for the user. */
    const token = await func.getVerifyToken(savedStaff._id);

    /* This is a function that is defined in the `email.util.js` file. It is used to send a verification
email to the user. */
    await email.sendVeri(
      savedStaff.email,
      savedStaff.name,
      savedStaff._id,
      token.token
    );

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//only admin can access
//get staff
/* This is a route handler for a GET request to the /info endpoint. It is used to get the information
of the staff member. */
router.get("/info", adminAccess, async (req, res) => {
  try {
    /* Getting the user from the request body. */
    const staff = req.body.user;
    /* Sending the staff member's information to the client. */
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get all staff
/* This is a route handler for a GET request to the / endpoint. It is used to get all the staff
members. */
router.get("/", adminAccess, async (req, res) => {
  try {
    /* Getting all the staff members from the database. */
    const staff = await Staff.find();
    /* Sending the staff member's information to the client. */
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//delete staff account
/* A route handler for a DELETE request to the /delete endpoint. It is used to delete a staff member. */
router.delete("/delete", adminAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.body;
    /* Deleting the staff member with the given id. */
    const result = await Staff.findByIdAndDelete(id);

    /* Sending an email to the user. */
    email.sendSuccDelAd(result.email, result.name);
    /* Sending a response to the client. */
    res.json(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//update staff account
/* A route handler for a PUT request to the /update endpoint. It is used to update a staff member. */
router.put("/update", adminAccess, async (req, res) => {
  try {
    /* Validating the request body against the schema defined in the `validation.util.js` file. */
    const validated = await valid.staffUpdateSchema.validateAsync(req.body);

    /* Calling the `updateStaff` function that is defined in the `functions.util.js` file. */
    const result = await func.updateStaff(validated.id, validated);

    /* Sending an email to the user. */
    email.sendSuccUpAd(validated.email, validated.name);
    /* Sending the result to the client. */
    res.send(result);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
