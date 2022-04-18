const router = require("express").Router();
const Staff = require("../../models/login/staff.model");
const bcrypt = require("bcryptjs");
const email = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");
const { staffAccess, adminAccess } = require("../../middleware/accessChecker");

//register staff

router.post("/register", adminAccess, async (req, res) => {
  try {
    // validation

    const validated = await valid.staffRegisterSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingStaff = user.existingUser;

    if (existingStaff)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db

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

    const savedStaff = await newStaff.save();

    //email verification

    const token = await func.getVerifyToken(savedStaff._id);

    await email.sendVeri(
      savedStaff.email,
      savedStaff.name,
      savedStaff._id,
      token.token
    );

    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errormessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//only loggedin staff can access
//delete loggedin staff account

router.delete("/account/delete", staffAccess, async (req, res) => {
  try {
    const result = await Staff.findByIdAndDelete(req.body.user._id);

    res.send(true);

    await email.sendsuccDel(result.email, result.name);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only loggedin staff can access
//update loggedin staff account

router.post("/account/update", staffAccess, async (req, res) => {
  try {
    const validated = await valid.staffUpdateSchema.validateAsync(req.body);

    const result = await update(req.body.user._id, validated);
    res.send(result);

    await email.sendsuccUp(validated.email, validated.name);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errormessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//only loggedin staff can access
//get loggedin staff account

router.get("/account", staffAccess, async (req, res) => {
  try {
    const staff = req.body.user;
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get staff

router.get("/info", adminAccess, async (req, res) => {
  try {
    const staff = req.body.user;
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//get all staff

router.get("/", adminAccess, async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//delete staff account

router.delete("/delete", adminAccess, async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Staff.findByIdAndDelete(id);

    res.send(true);

    await email.sendsuccDelAd(result.email, result.name);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//only admin can access
//update staff account

router.post("/update", adminAccess, async (req, res) => {
  try {
    const validated = await valid.staffUpdateSchema.validateAsync(req.body);

    const result = await update(validated.id, validated);
    res.send(result);

    await email.sendsuccUpAd(validated.email, validated.name);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errormessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

//update staff details
async function update(id, validated) {
  try {
    await Staff.findByIdAndUpdate(id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
      type: validated.type,
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
