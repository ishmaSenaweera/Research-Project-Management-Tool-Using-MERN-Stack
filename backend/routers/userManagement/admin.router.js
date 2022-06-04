const router = require("express").Router();
const Admin = require("../../models/userManagement/admin.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/functions.util.js");
const valid = require("../../utils/validation.util");
const { adminAccess } = require("../../middleware/accessChecker");

/* The above code is a route handler for the /register route. It is used to register a new admin. */
router.post("/register", async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await valid.adminRegisterSchema.validateAsync(req.body);

    /* Checking if the email is already in the database. */
    const user = await func.findUser({ email: validated.email });
    const existingAdmin = user.existingUser;

    /* Checking if the email is already in the database. */
    if (existingAdmin)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db
    const newAdmin = await new Admin({
      name: validated.name,
      dob: validated.dob,
      gender: validated.gender,
      mobile: validated.mobile,
      nic: validated.nic,
      email: validated.email,
      passwordHash: passwordHash,
    });

    /* Saving the new admin to the database. */
    const savedAdmin = await newAdmin.save();

    //email verification
    const token = await func.getVerifyToken(savedAdmin._id);

    /* Sending an verification email to the user. */
    await email.sendVeri(
      savedAdmin.email,
      savedAdmin.name,
      savedAdmin._id,
      token.token
    );

    /* Sending a response to the client. */
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

/* This is a route handler for the /info route. It is used to get the admin information. */
router.get("/info", adminAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.body;

    /* Finding the admin by the id. */
    const admin = await Admin.findById(id);
    /* Sending the admin object to the client. */
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the / route. It is used to get all the admins. */
router.get("/", adminAccess, async (req, res) => {
  try {
    /* Finding all the admins in the database. */
    const admin = await Admin.find();
    /* Sending the admin object to the client. */
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the /delete route. It is used to delete an admin. */
router.delete("/delete", adminAccess, async (req, res) => {
  try {
    /* Destructuring the id from the request body. */
    const { id } = req.body;
    /* Deleting the admin from the database. */
    const result = await Admin.findByIdAndDelete(id);

    /* Sending an email to the admin who deleted the admin. */
    email.sendSuccDelAd(result.email, result.name);
    res.send(true);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

/* The above code is a route that is used to update an admin. */
router.put("/update", adminAccess, async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await valid.adminUpdateSchema.validateAsync(req.body);

    /* Calling the function updateAdmin from functions.util.js and passing the validated id and validated
object. */
    const result = await func.updateAdmin(validated.id, validated);

    /* Sending an email to the admin who updated the admin. */
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
