const router = require("express").Router();
const Student = require("../../models/login/student.model");
const Admin = require("../../models/login/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../models/login/token.model");
const emailUtil = require("../../utils/email.util");

// log in

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    var type = "";

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    var existingUser = await Student.findOne({ email });
    type = "student";

    if (existingUser === null) {
      existingUser = await Student.findOne({ email });
      type = "staff";
    }

    if (existingUser === null) {
      existingUser = await Admin.findOne({ email });
      type = "admin";
    }

    if (existingUser === null) {
      type = null;
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
    console.error(err);
    res.status(500).send();
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

    const type = await checkUser(state.user);

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
    const user = await checkUser(req.params.id);

    const existingUser = user.existingUser;

    if (!existingUser)
      return res.status(400).json({ errorMessage: "Invalid Link" });

    const token = await Token.findOne({
      userID: existingUser._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json({ errorMessage: "Invalid Link" });

    await Student.findByIdAndUpdate(existingUser._id, {
      verified: true,
    }).exec();
    await token.remove();

    const message = `Dear ${existingUser.name},\nCongratulations, your account has been successfully activated.`;
    await emailUtil(existingUser.email, "Successfully Verified", message);

    res.status(200).send({ Message: "Successfully verified your email" });
  } catch (error) {
    console.error(err);
    res.status(500).send();
  }
});

// check user by id

async function checkUser(id) {
  var existingUser = await Student.findById(id);
  type = "student";

  if (existingUser === null) {
    existingUser = await Student.findById(id);
    type = "staff";
  }

  if (existingUser === null) {
    existingUser = await Admin.findById(id);
    type = "admin";
  }

  if (existingUser === null) {
    type = null;
    return res.status(404).json({ errorMessage: "User not found" });
  }

  return { type, existingUser };
}

module.exports = router;
