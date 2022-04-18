const router = require("express").Router();
const Admin = require("../../models/login/admin.model");
const bcrypt = require("bcryptjs");
const emailUtil = require("../../utils/email.util");
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

    const url = `Dear ${savedAdmin.name},\nVerify your email address \n${process.env.BASE_URL}login/verify/${savedAdmin._id}/${token.token}`;
    await emailUtil(savedAdmin.email, "Email Verification", url);

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

//only loggedin admin can access
//delete loggedin admin account

router.delete("/account/delete", adminAccess, async (req, res) => {
  try {
    const { _id } = req.body.user._id;
    const result = await Admin.findByIdAndDelete(_id);

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been successfully deleted.`;
    await emailUtil(result.email, "Successfully Deleted", message);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only loggedin admin can access
//update loggedin admin account

router.post("/account/update", adminAccess, async (req, res) => {
  try {
    const validated = await valid.adminUpdateSchema.validateAsync(req.body);

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

//only loggedin admin can access
//get loggedin admin account

router.get("/account", adminAccess, async (req, res) => {
  try {
    const admin = req.body.user;
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
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

    const message = `Dear ${result.name},\nYour account has been deleted by admin.`;
    await emailUtil(result.email, "Successfully Deleted By Admin", message);
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

//update admin details
async function update(id, validated) {
  try {
    await Admin.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
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
