import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <nav className="Navbar">
            <ul>
                {/* <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/add-user">Add User</NavLink></li>
                <li><NavLink to="/bad-route">Bad!</NavLink></li> */}
            </ul>
        </nav>
    );
}

export default Navbar;