const jwt = require("jsonwebtoken");
const func = require("../utils/func.util");

async function studentAccess(req, res, next) {
  try {
    const result = await checkToken(req);

    if (!result || result.type !== "Student")
      return res.status(401).json({ errorMessage: "Unauthorized" });

    req.body.user = result.existingUser;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

async function adminAccess(req, res, next) {
  try {
    const result = await checkToken(req);

    if (!result || result.type !== "Admin")
      return res.status(401).json({ errorMessage: "Unauthorized" });

    req.body.user = result.existingUser;

    next();
  } catch (err) {
    next(err);
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

async function staffAccess(req, res, next) {
  try {
    const result = await checkToken(req);

    if (!result || result.type !== "Staff")
      return res.status(401).json({ errorMessage: "Unauthorized" });

    req.body.user = result.existingUser;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

async function checkToken(req) {
  try {
    const token = req.cookies.token;
    if (!token) return null;

    const verified = jwt.verify(token, process.env.KEY);
    const result = await func.findUserById(verified.user);

    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { adminAccess, studentAccess, staffAccess };
