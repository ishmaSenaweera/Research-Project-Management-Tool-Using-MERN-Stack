const router = require("express").Router();
const Groups = require("../../models/studentManagement/createGroup.model");

router.route("/groups").post((req,res)=>{

    const id = req.body.id;
    const student1 = req.body.student1;
    const student2 = req.body.student2;
    const student3 = req.body.student3;
    const student4 = req.body.student4;
    const researchTopic = req.body.researchTopic;
    const topicEvaluationPanelId = req.body.topicEvaluationPanelId;
    const supervisorID = req.body.supervisorID;
    const cosupervisorID = req.body.cosupervisorID;

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
router.route("/allgroups").get((req,res)=>{
    GrpReg.find().then((groups)=> {
        res.json(groups) //send response from json format to the frontend
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/get/:id").get(async(req,res)=> {
    let userid = req.params.id;

    const user = await Groups.findById(userid).then((grpRegs) => {
        res.status(200).send({status : "User Fetched",grpRegs})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with fetch user", error : err.message});
    })
})

module.exports = router;