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

const updateGroup=async(req,res)=>{
    try{
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid group id"})
        }

        const group=await Group.findById(id)

        if(!group){
            return res.status(404).json({message:"Group was not found"})
        }

        if (group.groupLeader.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const{groupName,description}=req.body
        const updated=await Group.findByIdAndUpdate(
            id,
            {groupName,description},
            { new: true, runValidators: true },
        )
        return res.json(updated)
    }catch(error){
        console.error("updateGroup error:", error)
        return res.status(500).json({message:"Group updation error"})
    }
}


const deleteGroup=async(req,res)=>{
    try{
        const {id}=req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Not a valid Group Id"})
        }

        const group=await Group.findById(id)
        if(!group){
            return res.status(404).json({message:"Group not found"})
        }

        if (group.groupLeader.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        await Group.findByIdAndDelete(id);
        return res.json({ message: "Group deleted" });
    }catch(error){
        console.error("deleteGroup error:", error)
        return res.status(500).json({message:"Group deletion error"})
    }
}

module.exports={
    createGroup,
    updateGroup,
    deleteGroup
}