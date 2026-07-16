import React from "react"
import "./Hero.css"
import { useNavigate } from "react-router-dom"

function Hero(){

    const navigate = useNavigate()
    return(
        <>
            <div className="hero-container">
                <div className="main-content">
                    <h2>Task management that works</h2>
                    <p>Keep track of your tasks, collaborate with your team, and get things done.</p>
                </div>
                <div className="features">
                    <div className="tasks">
                        <h4>Tasks</h4>
                        <p>Create and organize tasks with due dates, labels, and priorities.</p>
                    </div>
                    <div className="collaboration">
                        <h4>Collaboration</h4>
                        <p>Assign tasks, share updates, work together in real time.</p>
                    </div>
                    <div className="progress">
                        <h4>Progress</h4>
                        <p>Track what's done and what's left to do with simple dashboards.</p>
                    </div>
                </div>
                <div className="try-it">
                    <h4>Start managing tasks today</h4>
                    <p>Click the button to register.</p>
                    <div>
                        <button onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero