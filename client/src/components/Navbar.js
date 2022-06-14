import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <ul className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/">Home</NavLink>
        </li>
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/bad-route">Bad!</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
