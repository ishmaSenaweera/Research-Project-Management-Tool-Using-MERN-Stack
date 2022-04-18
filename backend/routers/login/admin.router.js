const router = require("express").Router();
const Admin = require("../../models/login/admin.model");
const bcrypt = require("bcryptjs");
const emailUtil = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const {
  adminRegisterSchema,
  adminUpdateSchema,
} = require("../../utils/valid.util");

//register admin

router.post("/register", async (req, res) => {
  try {
    // validation

    const validated = await adminRegisterSchema.validateAsync(req.body);

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

//delete admin

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Admin.findByIdAndDelete(id);

    res.send(true);

    const message = `Dear ${result.name},\nYour account has been successfully deleted.`;
    await emailUtil(result.email, "Successfully Deleted", message);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//update admin

router.post("/update", async (req, res) => {
  try {
    const validated = await adminUpdateSchema.validateAsync(req.body);

    await Admin.findByIdAndUpdate(validated.id, {
      name: validated.name,
      dob: validated.DoB,
      gender: validated.gender,
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

//get admin

router.get("/info", async (req, res) => {
  try {
    const { id } = req.body;

    const admin = await Admin.findById(id);
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//get all admin

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
