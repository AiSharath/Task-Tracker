// Task.js
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "cancelled","assigned"],
    default: "pending"
  },
  dueDate:{
    type:Date,
    default:null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default:null
  }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)