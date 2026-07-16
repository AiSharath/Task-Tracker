const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req, res) => {
    try {
        const { name,email, password,role } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(201).json({
            message: "User created",
            token
        })

    } catch (error) {
        console.error("Register error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({ token })

    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    register,
    login
}