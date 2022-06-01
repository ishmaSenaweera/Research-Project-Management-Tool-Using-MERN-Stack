const express = require("express");
const {
  saveResearchTopic,
} = require("../../controllers/projectManagement/researchTopic.controller");
const researchTopicRouter = express.Router();

researchTopicRouter.post("/save", saveResearchTopic);

module.exports = researchTopicRouter;
