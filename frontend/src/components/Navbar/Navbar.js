import React from "react";
import "../Navbar/Navbar.css"
import logo from '../../images/whitelogo.png'
const Navbar = () => {

    const userId = window.localStorage.getItem('userId')

    return (
        <nav className="navbar">
        <div className="brand">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        </div>
        </div>
        <ul className="links">
            <li><a href="/homepage">Homepage</a></li>
            <li><a href={"/users/" + userId}>Your Profile</a></li>
            <li><a href={"/users/" + userId + "/watch-later"}>Watch Later</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
        </ul>
        </nav>
    );
};
export default Navbar;
