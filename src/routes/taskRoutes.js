const express = require('express')
const { createTask, getTasks, updateTask, deleteTask,takeTask } = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')
const validate = require('../middleware/validateMiddleware')
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidators')

const router = express.Router()

router.use(authMiddleware)

router.post('/', validate(createTaskSchema), createTask)
router.get('/', getTasks)
router.put('/:id/take', takeTask)
router.put('/:id', validate(updateTaskSchema), updateTask)
router.delete('/:id', deleteTask)

module.exports = router
