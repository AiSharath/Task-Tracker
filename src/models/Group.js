const mongoose=require("mongoose")

const groupSchema=new mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    groupLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    members:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                index:true,
                required:true
            },
            role:{
                type:String,
                enum:["project-leader","member"],
                default:"member"
            }
        }
    ]
},{timestamps:true});


module.exports=mongoose.model("Group",groupSchema)