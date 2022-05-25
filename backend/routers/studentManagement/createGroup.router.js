const router = require("express").Router();
const Groups = require("../../models/studentManagement/createGroup.model");

router.route("/groups").post((req,res)=>{

    const id = req.body.id;
    const student1 = req.body.id;
    const student2 = req.body.id;
    const student3 = req.body.id;
    const student4 = req.body.id;
    const researchTopic = req.body.id;
    const topicEvaluationPanelId = req.body.id;
    const supervisorID = req.body.id;
    const cosupervisorID = req.body.id;

    const newGroup = new Groups({
        id,
        student1,
        student2,
        student3,
        student4,
        researchTopic,
        topicEvaluationPanelId,
        supervisorID,
        cosupervisorID
    
    })

    //Pass object to mongoDB
    newGroup.save().then(()=>{
        res.json("Studnet Group Added Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})

//get all methods
router.route("/").get((req,res)=>{
    GrpReg.find().then((groups)=> {
        res.json(groups) //send response from json format to the frontend
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;