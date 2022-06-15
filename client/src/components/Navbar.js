import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1';

function Navbar(props) {
  let [open, setOpen] = useState(false);

  const handleBurger = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="sticky top-0">
      <nav className="flex items-center justify-around py-3 bg-[#361201] text-gray-200 shadow-md shadow-[#361201a2] navbar navbar-expand-lg navbar-light">
        <NavLink className="text-xl text-white pr-2 font-semibold" to="/">
          Hour Hood
        </NavLink>

        <div>
          <NavLink
            className="text-xl text-white pr-2 font-semibold"
            to="/offers"
          >
            Offers
          </NavLink>
          {props.user && (
            <>
              <NavLink
                className="text-xl text-white pr-2 font-semibold"
                to="/requests"
              >
                Requests
              </NavLink>
              <NavLink
                className="text-xl text-white pr-2 font-semibold"
                to="/bookings"
              >
                Bookings
              </NavLink>
            </>
          )}
        </div>

        {props.user && (
          <div className="flex">
            <NavLink
              className="text-xl text-white pr-2 font-semibold"
              to="/profile"
            >
              Profile
            </NavLink>
          </div>
        )}

        <div className="flex flex-col">
          <div>
            <div
              onClick={handleBurger}
              className=" items-center justify-center cursor-pointer h-8"
            >
              <h3
                className={`text-white text-center px-6 text-xl font-semibold pt-[10px] transform duration-200 ease-in-out -translate-y-2 ${open}`}
              >
                Users
              </h3>
              {/* <div
                className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-200 ease-in-out -translate-y-2 ${
                  open && "rotate-45 translate-y-full"
                }`}
              ></div>
              <div
                className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-75 ease-in-out ${
                  open && "-translate-x-14 opacity-0 shadow-none"
                }`}
              ></div>
              <div
                className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-200 ease-in-out translate-y-2 ${
                  open && "-rotate-45 -translate-y-full"
                }`}
              ></div> */}
            </div>
            <div className="relative">
              {open && (
                <div className="flex items-center justify-center absolute flex-col">
                  <button
                    className="text-white bg-[#361201dd] hover:bg-[#361201] hover:text-[#FF9940] px-10 py-4 font-semibold"
                    onClick={(e) => {
                      props.switchUserCb(null);
                      setOpen(!open);
                    }}
                  >
                    Anonymous{' '}
                  </button>
                  <button
                    className=" text-white bg-[#361201dd] px-16 py-4 hover:bg-[#361201] hover:text-[#FF9940] font-medium"
                    onClick={(e) => {
                      props.switchUserCb(1);
                      setOpen(!open);
                    }}
                  >
                    User1{' '}
                  </button>
                  <button
                    className="text-white bg-[#361201dd] px-[63px] py-4 rounded-b-lg hover:text-[#FF9940] hover:bg-[#361201] font-medium"
                    onClick={(e) => {
                      props.switchUserCb(2);
                      setOpen(!open);
                    }}
                  >
                    User2
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
