import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (res.ok) {
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`
                navigate("/dashboard")  
            } else {
                setError(data.message)  
            }
        } catch (error) {
            setError("Network error. Please try again.")
        }
    }

    return (
        <>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-fields">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <div className="login-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login