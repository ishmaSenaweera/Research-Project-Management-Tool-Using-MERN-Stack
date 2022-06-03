const express = require("express");
const {
  saveResearchTopic,
  getAllResearchTopic,
  updateResearchTopic,
  deleteResearchTopic,
  getResearchTopic,
} = require("../../controllers/projectManagement/researchTopic.controller");
const researchTopicRouter = express.Router();

researchTopicRouter.post("/save", saveResearchTopic);
researchTopicRouter.get("/", getAllResearchTopic);
researchTopicRouter.put("/update/:id", updateResearchTopic);
researchTopicRouter.delete("/delete/:id", deleteResearchTopic);
researchTopicRouter.get("/details/:id", getResearchTopic);

module.exports = researchTopicRouter;
