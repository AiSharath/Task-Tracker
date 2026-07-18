const mongoose=require("mongoose")
const Group=require("../models/Group")

const createGroup=async(req,res)=>{
    try{
        const {groupName,description,groupLeader }=req.body;

        const group=await Group.create({
            groupName,
            description,
            groupLeader:req.user.id,
            members:[
                {
                    user:req.user.id,
                    role:req.user.role
                }
            ]
        })
        res.status(201).json(group)
    }catch(error){
        res.status(500).json({ message: "Group Creation Error" });
    }
}

const deleteGroup=async(req,res)=>{
    try{
        const {id}=req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({message:"Not a valid Group Id"})
        }

        const group=await Group.findById(id)
        if(!group){
            res.status(404).json({message:"Group not found"})
        }

        if (group.groupLeader.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        await Group.findByIdAndDelete(id);
        return res.json({ message: "Group deleted" });
    }catch(error){
        res.status(500).json({message:"Group deletion error"})
    }
}

module.exports={
    createGroup,
    deleteGroup
}