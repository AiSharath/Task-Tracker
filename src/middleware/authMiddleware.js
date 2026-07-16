const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not set")
            return res.status(500).json({ message: "Server configuration error" })
        }

        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header missing or malformed" })
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" })
        }
        console.error("authMiddleware error:", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = authMiddleware