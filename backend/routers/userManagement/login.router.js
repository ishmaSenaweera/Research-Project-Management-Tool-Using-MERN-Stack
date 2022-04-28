const router = require("express").Router();
const Student = require("../../models/userManagement/student.model");
const Admin = require("../../models/userManagement/admin.model");
const Staff = require("../../models/userManagement/staff.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../models/userManagement/token.model");
const email = require("../../utils/email.util");
const func = require("../../utils/func.util.js");
const valid = require("../../utils/valid.util");

// log in
router.post("/login", async (req, res) => {
  try {
    // validate
    const validated = await valid.loginSchema.validateAsync(req.body);

    const user = await func.findUser({ email: validated.email });
    const existingUser = user.existingUser;

    if (user.type === null) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    //email verification if user not verified
    if (existingUser.verified === false) {
      const verifyToken = await func.getVerifyToken(existingUser._id);

      await email.sendVeri(
        existingUser.email,
        existingUser.name,
        existingUser._id,
        verifyToken.token
      );

      return res.status(401).json({
        errorMessage:
          "Unverified email. Verification Email sent to your email.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      validated.password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }
    // sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.KEY
    );

    // send the token in a HTTP-only cookie
    var expiryTime = new Date(Number(new Date()) + 6 * 60 * 60 * 1000); //after 6 hours cookie will be expire
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: expiryTime,
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
router.get("/logout", async (req, res) => {
  await func.removeCookie(res);
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
      return res.status(401).json({ errorMessage: "User not found" });
    }

    const existingUser = user.existingUser;

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
    await email.sendSuccVeri(existingUser.email, existingUser.name);

    res.status(200).send({ Message: "Successfully verified your email" });
  } catch (error) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
