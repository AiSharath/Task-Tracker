import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { FaTasks, FaSignOutAlt,FaUsers } from "react-icons/fa"
import "./Dashboard.css"

function getCookie(name) {
    const cookies = document.cookie.split("; ")
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key === name) return value
    }
    return null
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0`
}

function getUserIdFromToken() {
    const token = getCookie("token")
    if (!token) return null
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.id
}

function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [groups, setGroups] = useState([])
    const [groupsLoading, setGroupsLoading] = useState(false)
    const [groupsError, setGroupsError] = useState("")
    const [openGroupId, setOpenGroupId] = useState(null)
    const [activeTab, setActiveTab] = useState("tasks")
    const navigate = useNavigate()
    const currentUserId = getUserIdFromToken()

    useEffect(() => {
        const token = getCookie("token")
        if (!token) {
            navigate("/login")
            return
        }
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const token = getCookie("token")
            const res = await fetch("http://localhost:5000/api/tasks", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            if (res.ok) {
                setTasks(Array.isArray(data) ? data : [])
            } else {
                console.log("Error:", data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log("Error fetching tasks:", error)
        }
    }

    const completeTask = async (taskId) => {
        try {
            const token = getCookie("token")
            const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "completed" })
            })
            if (res.ok) {
                fetchTasks()  
            }
        } catch (error) {
            console.log("Error completing task:", error)
        }
    }

    const fetchGroups = async () => {
        try {
            setGroupsLoading(true)
            setGroupsError("")
            const token = getCookie("token")
            const res = await fetch("http://localhost:5000/api/groups", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()

            if (res.ok) {
                setGroups(Array.isArray(data) ? data : [])
            } else {
                setGroups([])
                setGroupsError(data?.message || "Failed to load groups")
            }
        } catch (error) {
            console.log("Error fetching groups:", error)
            setGroups([])
            setGroupsError("Error fetching groups")
        } finally {
            setGroupsLoading(false)
        }
    }

    useEffect(() => {
        if (activeTab === "group") {
            fetchGroups()
        }
    }, [activeTab])

    const handleSignOut = () => {
        deleteCookie("token")
        navigate("/login")
    }

    const pendingTasks = tasks.filter(t => t.status === "pending")
    const assignedTasks = tasks.filter(t =>
        t.status === "assigned" && t.assignedTo?.toString() === currentUserId
    )
    const completedTasks = tasks.filter(t => t.status === "completed")

    return (
        <div className="db-layout">

            {/* SIDEBAR */}
            <div className="db-sidebar">
                <div className="db-sidebar-top">
                    <div className="db-logo">TaskFlow</div>
                    <nav className="db-nav">
                        <div
                            className={`db-nav-item ${activeTab === "overview" ? "active" : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            <MdDashboard size={18} />
                            <span>Overview</span>
                        </div>
                        <div
                            className={`db-nav-item ${activeTab === "tasks" ? "active" : ""}`}
                            onClick={() => setActiveTab("tasks")}
                        >
                            <FaTasks size={16} />
                            <span>Tasks</span>
                        </div>
                        <div
                            className={`db-nav-item ${activeTab === "group" ? "active" : ""}`}
                            onClick={() => setActiveTab("group")}
                        >
                            <FaUsers size={18} />
                            <span>Group</span>
                        </div>
                    </nav>
                </div>
                <div className="db-signout" onClick={handleSignOut}>
                    <FaSignOutAlt size={16} />
                    <span>Sign out</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="db-main">
                {activeTab === "tasks" && (
                    <>
                        <div className="db-header">
                            <div>
                                <h2>Tasks</h2>
                                <p>{pendingTasks.length} active, {completedTasks.length} completed</p>
                            </div>
                            <div className="header-buttons">
                                <button onClick={() => navigate("/tasks/create")}>+ Add task</button>
                                <button onClick={() => navigate("/tasks")}>See tasks</button>
                            </div>
                        </div>

                        <div className="db-section">
                            <h4>To Do</h4>
                            {pendingTasks.length === 0 ? (
                                <p className="db-empty">No pending tasks</p>
                            ) : (
                                pendingTasks.map(task => (
                                    <div key={task._id} className="db-task-row">
                                        <div className="db-task-left">
                                            <input
                                                type="checkbox"
                                                onChange={() => completeTask(task._id)}
                                            />
                                            <span>{task.title}</span>
                                        </div>
                                        <div className="db-task-right">
                                            <span className="db-badge pending">pending</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="db-section">
                            <h4>My Assigned Tasks</h4>
                            {assignedTasks.length === 0 ? (
                                <p className="db-empty">No tasks assigned to you</p>
                            ) : (
                                assignedTasks.map(task => (
                                    <div key={task._id} className="db-task-row">
                                        <div className="db-task-left">
                                            <input
                                                type="checkbox"
                                                onChange={() => completeTask(task._id)}
                                            />
                                            <span>{task.title}</span>
                                        </div>
                                        <div className="db-task-right">
                                            <span className="db-badge assigned">assigned</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="db-section">
                            <h4>Completed</h4>
                            {completedTasks.length === 0 ? (
                                <p className="db-empty">No completed tasks</p>
                            ) : (
                                completedTasks.map(task => (
                                    <div key={task._id} className="db-task-row completed">
                                        <div className="db-task-left">
                                            <input type="checkbox" checked readOnly />
                                            <span>{task.title}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === "overview" && (
                    <>
                        <div className="db-header">
                            <div>
                                <h2>Overview</h2>
                                <p>Your task summary</p>
                            </div>
                        </div>
                        <div className="db-stats">
                            <div className="db-stat-card">
                                <h3>{tasks.length}</h3>
                                <p>Total Tasks</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{pendingTasks.length}</h3>
                                <p>Pending</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{assignedTasks.length}</h3>
                                <p>My Assigned</p>
                            </div>
                            <div className="db-stat-card">
                                <h3>{completedTasks.length}</h3>
                                <p>Completed</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "group" && (
                <>
                    {groupsLoading && <p className="db-empty">Loading groups...</p>}
                    {!groupsLoading && groupsError && <p className="db-empty">{groupsError}</p>}
                    {!groupsLoading && !groupsError && groups.length === 0 && (
                        <p className="db-empty">You are not in any group yet</p>
                    )}

                    {!groupsLoading && !groupsError && groups.map((group) => {
                        const isOpen = openGroupId === group._id

                        return (
                            <div className="group" key={group._id}>
                                <div className="group-icon">
                                    <FaUsers size={36} />
                                </div>
                                <div className="group-content">
                                    <span className="group-name">
                                        <h3>{group.groupName}</h3>
                                    </span>
                                    <span className="group-desc">
                                        <p>{group.description || "No description"}</p>
                                    </span>
                                    <span className="open-btn">
                                        <button
                                            type="button"
                                            onClick={() => setOpenGroupId(isOpen ? null : group._id)}
                                        >
                                            {isOpen ? "Close" : "Open"}
                                        </button>
                                    </span>

                                    {isOpen && (
                                        <div className="group-members">
                                            <h4>Members</h4>
                                            {group.members?.length ? (
                                                <ul>
                                                    {group.members.map((member) => (
                                                        <li key={member._id || member.user?._id}>
                                                            <span>{member.user?.name || member.user?.email || "Unknown user"}</span>
                                                            <span className="member-role">{member.role}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="db-empty">No members in this group</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </>
                )
                }
            </div>
        </div>
    )
}

export default Dashboard