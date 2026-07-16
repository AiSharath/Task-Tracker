const mongoose = require("mongoose")
const User = require("../models/User")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })
        res.json(users)
    } catch (error) {
        console.error("getAllUsers error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" })
        }

        if (id === req.user.id) {
            return res.status(400).json({ message: "You cannot delete your own account" })
        }

        const deleted = await User.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({ message: "User deleted" })
    } catch (error) {
        console.error("deleteUser error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id, { password: 0 })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json(user)
    } catch (error) {
        console.error("getProfile error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    getProfile
}