"use strict";
const express = require("express");
const { templates } = require("../../helpers/fileHelper");
const {
  singleFileUpload,
  multipleFileUpload,
} = require("../../controllers/fileUploader.controller");
const templateRouter = express.Router();

templateRouter.post("/singleFile", templates.single("file"), singleFileUpload);
templateRouter.post("/multipleFiles", templates.array("files"),  multipleFileUpload);

module.exports = templateRouter;
