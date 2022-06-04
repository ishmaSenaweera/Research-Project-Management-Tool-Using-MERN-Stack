const router = require("express").Router();
const Student = require("../../models/userManagement/student.model");
const Admin = require("../../models/userManagement/admin.model");
const Staff = require("../../models/userManagement/staff.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../models/userManagement/token.model");
const email = require("../../utils/email.util");
const func = require("../../utils/functions.util.js");
const valid = require("../../utils/validation.util");

/* The above code is a login route. It is checking if the user is verified or not. If the user is not
verified, it is sending a verification email to the user. */
router.post("/login", async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await valid.loginSchema.validateAsync(req.body);

    /* Finding the user by email. */
    const user = await func.findUser({ email: validated.email });
    const existingUser = user.existingUser;

    if (user.type === null) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    /* This is checking if the user is verified or not. If the user is not verified, it is sending a
verification email to the user. */
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

    /* Comparing the password entered by the user with the password stored in the database. */
    const passwordCorrect = await bcrypt.compare(
      validated.password,
      existingUser.passwordHash
    );

    /* This is checking if the password entered by the user is correct or not. If the password is not
correct, it is sending an error message to the user. */
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }
    /* This is creating a token for the user. */
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
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a logout route. It is removing the cookie from the browser. */
router.get("/logout", async (req, res) => {
  /* Removing the cookie from the browser. */
  await func.removeCookie(res);
});

//check loggedin
/* This is checking if the user is logged in or not. If the user is logged in, it is sending the type
of the user to the frontend. */
router.get("/loggedIn", async (req, res) => {
  try {
    /* Getting the token from the cookie. */
    const token = req.cookies.token;

    /* This is checking if the token is present in the cookie or not. If the token is not present in the
cookie, it is sending false to the frontend. */
    if (!token) return res.json(false);

    /* Verifying the token. */
    const state = jwt.verify(token, process.env.KEY);

    /* Finding the user by id. */
    const type = await func.findUserById(state.user);

    /* Sending the type of the user to the frontend. */
    res.send(type.type);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route for verifying the email. It is checking if the user is present in the database or
not. If the user is not present in the database, it is sending an error message to the user. If the
user is present in the database, it is checking if the token is present in the database or not. If
the token is not present in the database, it is sending an error message to the user. If the token
is present in the database, it is updating the verified field of the user to true. It is also
removing the token from the database. It is also sending a success email to the user. */
router.get("/verify/:id/:token", async (req, res) => {
  try {
    /* Removing the cookie from the browser. */
    await func.removeCookie(res);
    /* Finding the user by id. */
    const user = await func.findUserById(req.params.id);

    /* Checking if the user is present in the database or not. If the user is not present in the database,
it is sending an error message to the user. */
    if (user.type === null) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    /* Getting the user from the database. */
    const existingUser = user.existingUser;

    /* Checking if the user is present in the database or not. If the user is not present in the database,
it is sending an error message to the user. */
    if (!existingUser)
      return res.status(400).json({ errorMessage: "Invalid1 Link" });

    /* Finding the token in the database. */
    const token = await Token.findOne({
      userID: existingUser._id,
      token: req.params.token,
    });

    /* Checking if the token is present in the database or not. If the token is not present in the
database, it is sending an error message to the user. */
    if (!token) return res.status(400).json({ errorMessage: "Invalid2 Link" });

    /* This is updating the verified field of the user to true. */
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

    /* Removing the token from the database. */
    await token.remove();
    /* Sending a success email to the user. */
    email.sendSuccVeri(existingUser.email, existingUser.name);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
