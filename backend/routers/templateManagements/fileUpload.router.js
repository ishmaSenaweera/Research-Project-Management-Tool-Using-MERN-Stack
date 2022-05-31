"use strict";
const express = require("express");
const { templates } = require("../../helpers/fileHelper");
const {
  singleFileUpload,
} = require("../../controllers/fileUploader.controller");
const templateRouter = express.Router();

templateRouter.post(
  "/singleFile",
  templates.single("file"),
  singleFileUpload
);

module.exports = templateRouter;
