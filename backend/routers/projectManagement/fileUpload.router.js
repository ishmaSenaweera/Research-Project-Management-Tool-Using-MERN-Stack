"use strict";
const express = require("express");
const { templates } = require("../../helpers/projectManagement/fileHelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getAllSingleFiles,
  getAllMultipleFiles,
  deleteSingleFile,
  deleteMultipleFiles
} = require("../../controllers/projectManagement/fileUploader.controller");
const templateRouter = express.Router();

templateRouter.post("/singleFile", templates.single("file"), singleFileUpload);
templateRouter.post("/multipleFiles", templates.array("files"),  multipleFileUpload);
templateRouter.get("/getAllSingleFiles", getAllSingleFiles);
templateRouter.get("/getAllMultipleFiles", getAllMultipleFiles);
templateRouter.delete("/singleFile/delete/:id", deleteSingleFile);
templateRouter.delete("/multipleFiles/delete/:id", deleteMultipleFiles);

module.exports = templateRouter;
