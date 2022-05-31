"use strict";
const multer = require("multer");
const path = require("path");

const templateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "templates");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
});

const templateFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  const allowed = [".pdf", ".docx"];
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only .pdf or .docx formats are allowed!"));
  }
};

const templates = multer({
  storage: templateStorage,
  fileFilter: templateFilter,
});
module.exports = { templates };
