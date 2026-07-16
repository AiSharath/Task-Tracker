const { z } = require("zod")

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["user", "admin"], {
        errorMap: () => ({ message: "Role must be 'user' or 'admin'" })
    })
})

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password required")
})

module.exports = {
    registerSchema,
    loginSchema
}
