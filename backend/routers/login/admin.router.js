const router = require("express").Router();
const Admin = require("../../models/login/admin.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const { adminAccess } = require("../../middleware/accessChecker");

//register admin
router.post("/register", adminAccess, async (req, res) => {
  try {
    // validation
    const validated = await valid.adminRegisterSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingAdmin = user.existingUser;

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

    const savedAdmin = await newAdmin.save();

    //email verification
    const token = await func.getVerifyToken(savedAdmin._id);

    await email.sendVeri(
      savedAdmin.email,
      savedAdmin.name,
      savedAdmin._id,
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
//get admin
router.get("/info", adminAccess, async (req, res) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id);
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get all admin
router.get("/", adminAccess, async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//delete admin
router.delete("/delete", adminAccess, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Admin.findByIdAndDelete(id);

    res.send(true);

    await email.sendSuccDelAd(result.email, result.name);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//update admin
router.post("/update", adminAccess, async (req, res) => {
  try {
    const validated = await valid.adminUpdateSchema.validateAsync(req.body);

    const result = await func.updateAdmin(validated.id, validated);
    res.send(result);

    await email.sendSuccUpAd(validated.email, validated.name);
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
