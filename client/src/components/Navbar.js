import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Navbar(props) {
  let [open, setOpen] = useState(false);

  const handleBurger = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="sticky top-0">
      <nav className="bg-[#361201] shadow-md shadow-[#361201a2] navbar navbar-expand-lg navbar-light">
        {/* One we have the login, change sm:pl-32 for sm:px-32 in the div below */}
        <div className="sm:flex hidden items-center justify-between sm:pl-32 py-3">
          <NavLink className="text-xl text-white pr-2 font-semibold" to="/">
            Hour Hood
          </NavLink>

          <div className="flex gap-20">
            <NavLink
              className="text-xl text-white pr-2 font-semibold"
              to="/offers"
            >
              Offers
            </NavLink>

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
            <NavLink
              className="text-xl text-white pr-2 font-semibold"
              to="/profile"
            >
              Profile
            </NavLink>
          </div>

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
          <div className="flex gap-4 py-4 pr-10">
          <div className="text-white font-semibold">|</div>
            <button
              className="text-white hover:bg-[#361201] hover:text-[#FF9940] font-semibold"
              onClick={(e) => {
                props.switchUserCb(null);
                setOpen(!open);
              }}
            >
              Anonymous{" "}
            </button>
            <button
              className=" text-white hover:bg-[#361201] hover:text-[#FF9940] font-medium"
              onClick={(e) => {
                props.switchUserCb(1);
                setOpen(!open);
              }}
            >
              User1{" "}
            </button>
            <button
              className="text-white rounded-b-lg hover:text-[#FF9940] hover:bg-[#361201] font-medium"
              onClick={(e) => {
                props.switchUserCb(2);
                setOpen(!open);
              }}
            >
              User2
            </button>
            <div className="text-white font-semibold">|</div>
          </div>
        </div>

        <div className="flex py-3 pl-4 xl:hidden lg:hidden md:hidden sm:hidden">
          <div className="flex flex-col">
            <div>
              <div
                onClick={handleBurger}
                className="cursor-pointer h-8 pt-[10px]"
              >
                <div
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
                ></div>
              </div>
              <div className="text-center pl-14">
                {open && (
                  <div className="flex rounded-b-lg bg-[#361201e6] flex-col">
                    <NavLink
                      onClick={(e) => {
                        setOpen(!open);
                      }}
                      className="text-white pr-2 font-semibold hover:bg-[#361201] hover:text-[#FF9940]"
                      to="/"
                    >
                      Hour Hood
                    </NavLink>
                    <NavLink
                      onClick={(e) => {
                        setOpen(!open);
                      }}
                      className="text-white hover:bg-[#361201] hover:text-[#FF9940] pr-2 font-semibold"
                      to="/offers"
                    >
                      Offers
                    </NavLink>

                    {props.user && (
                      <>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="text-white pr-2 font-semibold"
                          to="/requests"
                        >
                          Requests
                        </NavLink>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="text-white pr-2 font-semibold"
                          to="/bookings"
                        >
                          Bookings
                        </NavLink>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="text-white pr-2 font-semibold"
                          to="/profile"
                        >
                          Profile
                        </NavLink>
                      </>
                    )}
                    <div className="flex gap-3">
                      <button
                        className="text-white hover:bg-[#361201] hover:text-[#FF9940] font-semibold"
                        onClick={(e) => {
                          setOpen(!open);
                        }}
                      >
                        Anonymous{" "}
                      </button>
                      <div className="text-white font-semibold">|</div>
                      <button
                        className=" text-white hover:bg-[#361201] hover:text-[#FF9940] font-medium"
                        onClick={(e) => {
                          setOpen(!open);
                        }}
                      >
                        User1{" "}
                      </button>
                      <div className="text-white font-semibold">|</div>
                      <button
                        className="text-white rounded-b-lg hover:text-[#FF9940] hover:bg-[#361201] font-medium"
                        onClick={(e) => {
                          setOpen(!open);
                        }}
                      >
                        User2
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
