const ResearchTopic = require("../../models/projectManagement/researchTopic.model");

// Save Research Topic
const saveResearchTopic = async (req, res) => {
  try {
    let newResearchTopic = new ResearchTopic(req.body);
    newResearchTopic.save((err) => {
      if (err) {
        return res.status(400).send("Couldn't Save the Research Topic!");
      }
      return res.status(200).send("Research Topic Saved Successfully!");
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { saveResearchTopic };
