const router = require("express").Router();
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    var type = null;

    if (!token) return res.json(false);

    const state = jwt.verify(token, process.env.KEY);

    var existingUser = await Student.findById(state.user);
    type = "student";

    if (existingUser === null) {
      existingUser = await Student.findById(state.user);
      type = "staff";
    }

    if (existingUser === null) {
      existingUser = await Admin.findById(state.user);
      type = "admin";
    }

    if (existingUser === null) {
      type = null;
      return res.status(404).json({ errorMessage: "User not found" });
    }

    res.send(type);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;