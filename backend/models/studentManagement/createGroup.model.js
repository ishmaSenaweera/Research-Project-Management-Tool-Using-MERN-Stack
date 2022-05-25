const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema(
  {
    gid: { type: String, required: true },
    student1: { type: mongoose.Schema.Types.ObjectId,ref: 'Student', required: true },
    student2: { type: mongoose.Schema.Types.ObjectId,ref: 'Student', required: true },
    student3: { type: mongoose.Schema.Types.ObjectId,ref: 'Student', required: true },
    student4: { type: mongoose.Schema.Types.ObjectId,ref: 'Student', required: true },
    researchTopic: { type: String, required: true },
    topicEvaluationPanelID: { type: mongoose.Schema.Types.ObjectId },
    supervisorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    cosupervisorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  },
  {
    timestamps: true,
  }
);

const Groups = mongoose.model("groups", groupsSchema);

module.exports = Groups;
