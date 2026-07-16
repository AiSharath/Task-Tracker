import React from "react"
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-mast">
                <span className="footer-wordmark">TaskFlow</span>
                <p className="footer-tagline">Task management that works.</p>
            </div>
            <div className="footer-links">
                <div className="footer-col">
                    <h5>Product</h5>
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Updates</span>
                </div>
                <div className="footer-col">
                    <h5>Company</h5>
                    <span>About</span>
                    <span>Blog</span>
                    <span>Contact</span>
                </div>
                <div className="footer-col">
                    <h5>Resources</h5>
                    <span>Help Center</span>
                    <span>API docs</span>
                </div>
                <div className="footer-col">
                    <h5>Legal</h5>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </div>
            <p className="footer-credit">&copy; 2026 TaskFlow. All rights reserved.</p>
        </footer>
    )
}

export default Footer
