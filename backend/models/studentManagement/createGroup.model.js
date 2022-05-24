const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    student1: { type: String, required: true },
    student2: { type: String, required: true },
    student3: { type: String, required: true },
    student4: { type: String, required: true },
    researchTopic: { type: String, required: true },
    topicEvaluationPanelID: { type: String, required: true },
    supervisorID: { type: String, required: true },
    cosupervisorID: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Groups = mongoose.model("groups", groupsSchema);

module.exports = Groups;
