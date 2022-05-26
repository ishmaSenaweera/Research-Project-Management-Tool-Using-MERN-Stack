const router = require("express").Router();
const Groups = require("../../models/studentManagement/createGroup.model");
const Student = require("../../models/userManagement/student.model");

router.route("/").post(async (req,res)=>{
    const student1 = req.body.student1;
    const student2 = req.body.student2;
    const student3 = req.body.student3;
    const student4 = req.body.student4;
    const researchTopic = req.body.researchTopic;

    let students = [student1,student2,student3,student4];

    //check students have duplicates/////////////////////
    let checkDuplicates = students.filter((item,index)=>{
        return students.indexOf(item) != index;
    });
    if(checkDuplicates.length > 0){
        res.status(400).json({
            message: "Duplicate student"
        });
    }
    //////////////////////////////////////////////////////////


    for(let i=0;i<students.length;i++){
        const s = await Student.findOne({sid:students[i]})
        if(!s){
            return res.status(400).json({msg:"student not found"})
        }
    }
    if(!researchTopic){
        return res.status(400).json({msg:"research topic not found"})
    }
    let code = Math.random().toString(36).substring(2,8);
    const gid = "GROUP-" + code.toLocaleUpperCase();

    const gr = await Groups.findOne({gid:gid});
    if(gr){
        return res.status(400).json({msg:"group already exists"})
    }
    //get object id of students
    for(let i=0;i<students.length;i++){
        const s = await Student.findOne({sid:students[i]})
        //get object id of student
        students[i] = s._id.toString();
    }
    const inserted = await Groups.create({
        gid:gid,
        student1:students[0],
        student2:students[1],
        student3:students[2],
        student4:students[3],
        researchTopic:researchTopic
    });
    await inserted.save();
    if(inserted){
        return res.status(200).json({msg:"group added"});
    }
    else{
        return res.status(400).json({msg:"group not added"});
    }

    /* const user = await Groups.findById(userid).then((grpRegs) => {
        res.status(200).send({status : "User Fetched",grpRegs})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with fetch user", error : err.message});
}) */


})

//get all methods
router.route("/").get(async (req,res)=>{
    const allgroups = await Groups.find();
    if(allgroups){
        return res.status(200).json({msg:"all groups fetched",allgroups});
    }
    else{
        return res.status(400).json({msg:"no groups found"});
    }
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

setTimeout(()=>{
    
},1000)