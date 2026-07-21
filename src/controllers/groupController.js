const mongoose=require("mongoose")
const Group=require("../models/Group")

const getMyGroups = async (req, res) => {
    try {
        const groups = await Group.find({ "members.user": req.user.id })
            .populate("groupLeader", "name email")
            .populate("members.user", "name email role")
            .sort({ createdAt: -1 })

        return res.json(groups)
    } catch (error) {
        console.error("getMyGroups error:", error)
        return res.status(500).json({ message: "Group fetch error" })
    }
}

const getGroupById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid group id" })
        }

        const group = await Group.findById(id)
            .populate("groupLeader", "name email")
            .populate("members.user", "name email role")

        if (!group) {
            return res.status(404).json({ message: "Group not found" })
        }

        const isMember = group.members.some(member => member.user?._id?.toString() === req.user.id)
        if (!isMember && group.groupLeader?._id?.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" })
        }

        return res.json(group)
    } catch (error) {
        console.error("getGroupById error:", error)
        return res.status(500).json({ message: "Group fetch error" })
    }
}

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
    getMyGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
}