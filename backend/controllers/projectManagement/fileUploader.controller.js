"use strict";
const SingleFile = require("../../models/projectManagement/singleTemplate.model");
const MultipleFile = require("../../models/projectManagement/multipleTemplates.model");

/** Uploading Files */

// Uploading a Single File
const singleFileUpload = async (req, res, next) => {
  try {
    const file = new SingleFile({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
      fileVisibility: req.body.fileVisibility,
      fileTopic: req.body.fileTopic,
      fileMessage: req.body.fileMessage,
    });
    await file.save();
    return res.status(201).send("File Uploaded Successfully!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Uploading Multiple Files
const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });

    const multipleFiles = new MultipleFile({
      title: req.body.title,
      files: filesArray,
      fileVisibility: req.body.fileVisibility,
      fileMessage: req.body.fileMessage,
    });

    await multipleFiles.save();

    return res.status(201).send("Files Uploaded Successfully!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

/** Getting Files */

// Getting All Single Files
const getAllSingleFiles = async (req, res, next) => {
  try {
    const singleFiles = await SingleFile.find();
    return res.status(200).send(singleFiles);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Getting All Multiple Files
const getAllMultipleFiles = async (req, res, next) => {
  try {
    const multipleFiles = await MultipleFile.find();
    return res.status(200).send(multipleFiles);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

/** Function to Format File Size Which Comes in Bytes */
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getAllSingleFiles,
  getAllMultipleFiles,
};
