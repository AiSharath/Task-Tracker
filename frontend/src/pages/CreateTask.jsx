import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateTask.css"


function getCookie(name) {
    const value = document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1]
    return value
}
function CreateTask() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = getCookie("token")
            const res = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (res.ok) {
                console.log("Task created", data)
                navigate("/tasks")
            } else {
                console.log("Error:", data.message)
            }
        } catch (error) {
            console.log("Network error:error")
        }
    }

    return (
        <>
            <div className="form-container">
                <h4>Create Your Task</h4>
                <form onSubmit={handleSubmit}>
                    <div className="input-fields">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter your task title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter your task description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <label>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="submit">Create Task</button>
                </form>
            </div>
        </>
    )
}

export default CreateTask;