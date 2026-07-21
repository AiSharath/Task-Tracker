const express=require("express")
const { getMyGroups, getGroupById, createGroup, updateGroup, deleteGroup } = require("../controllers/groupController.js")
const authMiddleware = require('../middleware/authMiddleware')

const router=express.Router()
router.use(authMiddleware)

router.get("/", getMyGroups)
router.get("/:id", getGroupById)
router.post("/", createGroup)
router.post("/create", createGroup)
router.put("/:id", updateGroup)
router.delete("/:id", deleteGroup)

module.exports=router