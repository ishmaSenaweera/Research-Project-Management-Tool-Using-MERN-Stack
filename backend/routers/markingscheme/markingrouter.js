const express = require("express");
var router = express.Router();
var ObjectID = require("mongoose").Types.ObjectId;
var { scheme } = require("../../models/MarkingScheme/scheme");
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  scheme.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
      console.log(JSON.stringify(err, undefined, 2));
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id);
  }

  scheme.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
      console.log(JSON.stringify(err, undefined, 2));
    }
  });
});

router.post("/", (req, res) => {
  var schemeRecord = new scheme({
    name: req.body.name,
    lecturer_in_charge: req.body.lecturer_in_charge,
    module_name: req.body.module_name,
    creativity: req.body.creativity,
    concept: req.body.concept,
    quality: req.body.quality,
  });

  schemeRecord.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
      console.log(JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id);
  }

  var updateRecords = {
    id: req.body.id,
    name: req.body.name,
    lecturer_in_charge: req.body.lecturer_in_charge,
    module_name: req.body.module_name,
    creativity: req.body.creativity,
    concept: req.body.concept,
    quality: req.body.quality,
  };

  scheme.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecords },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send(err);
        console.log(JSON.stringify(err, undefined, 2));
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(req.params.id);
  }

  scheme.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
      console.log(JSON.stringify(err, undefined, 2));
    }
  });
});

router.post("/email", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  var mailOption = {
    from: "",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      console.log("Message sent: %s", info.response);
      res.send(info.response);
    }
  });
});

module.exports = router;
