const express = require('express')
const { getAllUsers, deleteUser, getProfile } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()



// All routes require authentication
router.use(authMiddleware)

// User routes
router.get('/profile', getProfile)                              

// Admin-only routes
router.get('/', adminMiddleware, getAllUsers)
router.delete('/:id', adminMiddleware, deleteUser)

module.exports = router