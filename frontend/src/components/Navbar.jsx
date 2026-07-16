import React from "react"
import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function getCookie(name) {
    const cookies = document.cookie.split("; ")
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key === name) return value
    }
    return null
}

function Navbar() {
    const navigate = useNavigate()
    const token = getCookie("token")

    const handleSignOut = () => {
        document.cookie = "token=; path=/; max-age=0"
        navigate("/login")
    }

    return (
        <>
            <div className="navbar">
                <p className="heading" onClick={() => navigate("/")}>TaskFlow</p>
                <div className="buttons">
                    {token ? (
                        // logged in
                        <>
                            <button className="sign-in" onClick={() => navigate("/dashboard")}>Dashboard</button>
                            <button className="sign-up" onClick={handleSignOut}>Sign Out</button>
                        </>
                    ) : (
                        // not logged in
                        <>
                            <button className="sign-in" onClick={() => navigate("/login")}>Sign in</button>
                            <button className="sign-up" onClick={() => navigate("/register")}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
            <hr />
        </>
    )
}

export default Navbar