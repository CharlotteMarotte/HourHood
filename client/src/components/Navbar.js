import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <ul className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/">
            Home
          </NavLink>
        </li>
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink
            className="text-xl text-white pr-2 font-semibold"
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink
            className="text-xl text-white pr-2 font-semibold"
            to="/requests"
          >
            Requests
          </NavLink>
        </li>
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink
            className="text-xl text-white pr-2 font-semibold"
            to="/bookings"
          >
            Bookings
          </NavLink>
        </li>
        {/* <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/irene">Irene</NavLink>
        </li>
        <li className="collapse navbar-collapse flex-grow items-center">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/charlotte">Charlotte</NavLink>
        </li> */}
        <li
          className="text-xl text-white pr-2 font-semibold"
          onClick={(e) => props.switchUserCb(null)}
        >
          Anonymous User | {' '}
        </li>
        <li
          className="text-xl text-white pr-2 font-semibold"
          onClick={(e) => props.switchUserCb(1)}
        >
          Default User1 | {' '}
        </li>
        <li
          className="text-xl text-white pr-2 font-semibold"
          onClick={(e) => props.switchUserCb(2)}
        >
          Default User2
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
