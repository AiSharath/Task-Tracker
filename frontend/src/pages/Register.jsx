import React, { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import "./Register.css"

function Register() {

    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
        role:""
    })
    const [error,setError]=useState("");

    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");


    if (!formData.role) {
        setError("Please select a role!")
        return
    }
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
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
            setError("Network Error",error)
        }
    }

    return (
        <>
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-fields">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Username"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="radio-group">
                            <label className={formData.role === "admin" ? "selected" : ""}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === "admin"}
                                    onChange={handleChange}
                                />
                               Admin 
                            </label>

                            <label className={formData.role === "user" ? "selected" : ""}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={formData.role === "user"}
                                    onChange={handleChange}
                                />
                               User 
                            </label>
                        </div>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div className="login-link">
                    Already have an account?<Link to="/login">Login</Link>
                </div>
                <div className="error-block">
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </>
    )
}

export default Register