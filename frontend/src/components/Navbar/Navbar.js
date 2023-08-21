import React from "react";
import "../Navbar/Navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
        <div className="brand">
            <a href="/homepage">StreamSeeker</a>
        </div>
        <ul className="links">
            <li><a href="/homepage">Homepage</a></li>
            <li><a href="/users/:id">Your Profile</a></li>
            <li><a href="/watchlater">Watch Later</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
        </ul>
        </nav>
    );
};
export default Navbar;
