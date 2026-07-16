const { z } = require("zod")

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().trim().optional(),
    dueDate: z.coerce.date().optional()
})

const updateTaskSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().trim().optional(),
    status: z.enum(["pending", "in-progress", "completed", "cancelled", "assigned"]).optional()
})

module.exports = {
    createTaskSchema,
    updateTaskSchema
}
