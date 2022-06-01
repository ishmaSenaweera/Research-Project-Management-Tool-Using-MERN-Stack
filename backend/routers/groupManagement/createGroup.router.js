const router = require("express").Router();
const Groups = require("../../models/groupManagement/createGroup.model");
const Student = require("../../models/userManagement/student.model");

router.route("/").post(async (req,res)=>{
    const student1 = req.body.student1;
    const student2 = req.body.student2;
    const student3 = req.body.student3;
    const student4 = req.body.student4;

    let students = [student1,student2,student3,student4];

    //check students have duplicates/////////////////////
    let checkDuplicates = students.filter((item,index)=>{
        return students.indexOf(item) != index;
    });
    if(checkDuplicates.length > 0){
        res.status(400).json({
            message: "Duplicate student"
        });
        return;
    }
    //////////////////////////////////////////////////////////


    for(let i=0;i<students.length;i++){
        const s = await Student.findOne({sid:students[i]})
        if(!s){
            res.status(400).json({msg:"student not found"})
            return;
        }
    }
    // if(!researchTopic){
    //     return res.status(400).json({msg:"research topic not found"})
    // }
    
    let code = Math.random().toString(36).substring(2,8);
    const gid = "G -" + code.toLocaleUpperCase();

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
    });
    const newgrp = await inserted.save();
    if(newgrp){
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

    //convert to simple JSON

    const simpleJSON = allgroups.map((grp)=>{
        return {
            gid:grp.gid,
            student1:grp.student1,
            student2:grp.student2,
            student3:grp.student3,
            student4:grp.student4,
        }
    })

    //get each student's id and name
    for(let i=0;i<simpleJSON.length;i++){
        const s1 = await Student.findById(allgroups[i].student1);
        const s2 = await Student.findById(allgroups[i].student2);
        const s3 = await Student.findById(allgroups[i].student3);
        const s4 = await Student.findById(allgroups[i].student4);
        simpleJSON[i].student1 = s1.sid;
        simpleJSON[i].student2 = s2.sid;
        simpleJSON[i].student3 = s3.sid;
        simpleJSON[i].student4 = s4.sid;
    }


    if(allgroups){
        return res.status(200).json({msg:"all groups fetched",allgroups:simpleJSON});
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