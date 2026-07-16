import React from "react"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Hero from "./components/Hero.jsx"


function Home(){
    return(
        <>
            <Navbar/>
            <Hero/>
            <Footer/>
        </>
    )
}

export default Home;