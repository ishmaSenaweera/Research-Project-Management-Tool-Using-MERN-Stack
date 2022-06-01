const express = require("express");
const {
  saveResearchTopic, getAllResearchTopic, updateResearchTopic, deleteResearchTopic
} = require("../../controllers/projectManagement/researchTopic.controller");
const researchTopicRouter = express.Router();

researchTopicRouter.post("/save", saveResearchTopic);
researchTopicRouter.get("/", getAllResearchTopic);
researchTopicRouter.put("/update/:id", updateResearchTopic);
researchTopicRouter.delete("/delete/:id", deleteResearchTopic);

module.exports = researchTopicRouter;
