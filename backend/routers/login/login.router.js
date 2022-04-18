const router = require("express").Router();
const Student = require("../../models/login/student.model");
const Admin = require("../../models/login/admin.model");
const Staff = require("../../models/login/staff.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const { loginSchema } = require("../../utils/valid.util");

// log in

router.post("/login", async (req, res) => {
  try {
    // validate
    const validated = await loginSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingUser = user.existingUser;

    if (user.type === null) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    if (existingUser.verified === false) {
      return res
        .status(401)
        .json({ errorMessage: "Unverified email. Please verify your email" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.KEY
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send(type);
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

//log out

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

//check loggedin

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    const state = jwt.verify(token, process.env.KEY);

    const type = await func.findUserById(state.user);

    if (type.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    res.send(type.type);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//verify email

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await func.findUserById(req.params.id);

    if (user.type === null) {
      res.status(401).json({ errorMessage: "User not found" });
    }

    const existingUser = user.existingUser;

    console.log(user.type);

    if (!existingUser)
      return res.status(400).json({ errorMessage: "Invalid Link" });

    const token = await Token.findOne({
      userID: existingUser._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json({ errorMessage: "Invalid Link" });

    if (user.type === "Admin") {
      await Admin.findByIdAndUpdate(existingUser._id, {
        verified: true,
      }).exec();
    } else if (user.type === "Staff") {
      await Staff.findByIdAndUpdate(existingUser._id, {
        verified: true,
      }).exec();
    } else if (user.type === "Student") {
      await Student.findByIdAndUpdate(existingUser._id, {
        verified: true,
      }).exec();
    }

    await token.remove();

    const message = `Dear ${existingUser.name},\nCongratulations, your account has been successfully activated.`;
    await emailUtil(existingUser.email, "Successfully Verified", message);

    res.status(200).send({ Message: "Successfully verified your email" });
  } catch (error) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;