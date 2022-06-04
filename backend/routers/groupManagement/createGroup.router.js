const router = require("express").Router();
const Groups = require("../../models/groupManagement/createGroup.model");
const Staff = require("../../models/userManagement/staff.model");
const Student = require("../../models/userManagement/student.model");

const Topic = require("../../models/projectManagement/researchTopic.model");
const SupervisorGroup = require("../../models/groupManagement/superviosrGroup.model");


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
    
    let code = Math.random().toString(36).substring(2,8);
    const gid = "G-" + code.toLocaleUpperCase();

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

    if(allgroups){
        return res
          .status(200)
          .json({ msg: "all groups fetched", allgroups: allgroups });
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
});

router.route("/supervisor").get(async(req,res)=>{
    const staff = await Staff.find({} , {name:1,email:1, _id:1});
    if(staff){
        return res.status(200).json({msg:"all staff fetched",staff});
    }
    else{
        return res.status(200).json({msg:"no staff found", staff:[]});
    }
});

router.route("/supervisor/request/topic").post(async(req,res)=>{
    const { supervisorid, groupid} = req.body;
    //const supervisor = await Staff.findById(supervisorid);
    
/*     const group = await Groups.findById(groupid);
    if(!supervisor){
        return res.status(400).json({msg:"supervisor not found"});
    }
    if(!group){
        return res.status(400).json({msg:"group not found"});
    } */
    
    //insert into supervisor group
    const inserted = await SupervisorGroup.create({
        supervisorid:supervisorid,
        groupid:groupid,
    });
    const newgrp = await inserted.save();
    if(newgrp){
        return res.status(200).json({msg:"request sent"});
    }
    else{
        return res.status(400).json({msg:"request not sent"});
    }
    
});

module.exports = router;
