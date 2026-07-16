import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import CreateTask from "./pages/CreateTask.jsx"
import TaskList from "./pages/TaskList.jsx"
import Dashboard from "./pages/Dashboard.jsx"

function getCookie(name) {
    const cookies = document.cookie.split("; ")
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key === name) return value
    }
    return null
}

function ProtectedRoute({ children }) {
    const token = getCookie("token")
    return token ? children : <Navigate to="/login" />
}

function App() {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* protected routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/tasks" element={
                    <ProtectedRoute><TaskList /></ProtectedRoute>
                } />
                <Route path="/tasks/create" element={
                    <ProtectedRoute><CreateTask /></ProtectedRoute>
                } />
            </Routes>
        </>
    )
}

export default App