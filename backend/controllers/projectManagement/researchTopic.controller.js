const ResearchTopic = require("../../models/projectManagement/researchTopic.model");
const Groups = require("../../models/studentManagement/createGroup.model");

// Save Research Topic
const saveResearchTopic = async (req, res) => {
  try {
    const newResearchTopic = new ResearchTopic(req.body);
    const availability = await ResearchTopic.findOne({
      groupId: req.body.groupId,
    });

    if (availability) {
      return res.status(400).send("This Group Has Already Registered!");
    } else {
      newResearchTopic.save((err) => {
        if (err) {
          return res.status(400).send("Couldn't Save the Research Topic!");
        }
        return res.status(200).send("Research Topic Saved Successfully!");
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Get All Research Topics with Relevant Groups
const getAllResearchTopic = async (req, res) => {
  try {
    ResearchTopic.find({})
      .populate("groupId")
      .exec((err, data) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        return res.status(200).json({
          success: true,
          details: data,
        });
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Get Research Topic of a Group
const getResearchTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ResearchTopic.findById(id);
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Update Research Topic of the Relevant Group
const updateResearchTopic = async (req, res) => {
  try {
    let newData = {
      researchTopic: req.body.researchTopic,
      status: req.body.status,
      feedBack: req.body.feedBack,
    };
    ResearchTopic.findByIdAndUpdate(
      req.params.id,
      {
        $set: newData,
      },
      (err, data) => {
        if (err) {
          return res.status(400).send(err.message);
        }
        return res.status(200).send("Updated!");
      }
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Delete Research Topic of the Relevant Group
const deleteResearchTopic = async (req, res) => {
  try {
    ResearchTopic.findByIdAndDelete(req.params.id).exec((err, data) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      return res.status(200).send("Deleted!", data);
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  saveResearchTopic,
  getAllResearchTopic,
  updateResearchTopic,
  deleteResearchTopic,
};
