const { userAccess } = require("../../middleware/accessChecker");
const Groups = require("../../models/groupManagement/createGroup.model");

const router = require("express").Router();

//register staff
router.get("/find-group", userAccess, async (req, res) => {
  try {
    const id = req.body.user._id;

    for (let i = 1; i < 5; i++) {
      const sid = "student" + [i];

      const result = await Groups.findOne({ [sid]: id });

      if (result) return res.status(200).json(result);
    }

    res.status(400).send({ Message: "Group not found" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
