const mongoose = require("mongoose");

const researchTopicSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true  },
    researchTopic: { type: String, required: true },
    status: { type: String, required: true },
    feedBack: { type: String },
  },
  {
    timestamps: true,
  }
);

// Exporting Research Topic Model
module.exports = mongoose.model("researchTopic", researchTopicSchema);
