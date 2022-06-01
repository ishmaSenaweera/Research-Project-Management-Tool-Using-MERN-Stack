"use strict";
const express = require("express");
const { templates } = require("../../helpers/projectManagement/fileHelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getAllSingleFiles,
  getAllMultipleFiles
} = require("../../controllers/projectManagement/fileUploader.controller");
const templateRouter = express.Router();

templateRouter.post("/singleFile", templates.single("file"), singleFileUpload);
templateRouter.post("/multipleFiles", templates.array("files"),  multipleFileUpload);
templateRouter.get("/getAllSingleFiles", getAllSingleFiles);
templateRouter.get("/getAllMultipleFiles", getAllMultipleFiles);

module.exports = templateRouter;
