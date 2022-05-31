"use strict";
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "templates");
  },
  fileName: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF/MSWord File!!"), false);
  }
  cb(new Error("Something is wrong!"));
};

const templates = multer({ storage: storage, fileFilter: fileFilter });
module.exports = { templates };
