const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db')
const cors = require("cors")
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const groupRoutes=require('./routes/groupRoutes')

dotenv.config()

const app = express()
app.use(cors())

connectDB()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path, req.headers.authorization)
    next()
})



app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/groups', groupRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
