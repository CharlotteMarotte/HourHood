import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import "./Navbar.css";

function Navbar(props) {
  let [open, setOpen] = useState(false);

  const handleBurger = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#361201] shadow-md shadow-[#361201a2] navbar navbar-expand-lg navbar-light">
        <div className="items-center justify-between hidden py-3 sm:flex xl:px-32 md:px-10">
          <NavLink 
            className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
            to="/"
          >
            Hour Hood
          </NavLink>

          <div className="flex gap-20">
            <NavLink
              className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
              to="/getstarted"
            >
              Get started
            </NavLink>
          </div>

          {props.user && (
            <>
              <NavLink
                className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
                to="/giving-help"
              >
                Giving help
              </NavLink>
              <NavLink
                className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
                to="/receiving-help"
              >
                Receiving help
              </NavLink>
            </>
          )}

          {props.user && (
            <div className="flex">
              <NavLink
                className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
                to={`/profile/${props.user.id}`}
              >
                Profile
              </NavLink>
            </div>
          )}
          <div className="flex gap-4 py-4 pr-0 xl:pr-10">
            {props.user ? (
              <NavLink
                className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
                to="/login"
                onClick={props.logoutCb}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                className="text-xl text-white pr-2 font-semibold hover:text-[#FF9940]"
                to="/login"
              >
                Login
              </NavLink>
            )}
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
                      to="/getstarted"
                    >
                      Get started
                    </NavLink>
                    {props.user && (
                      <>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="pr-2 font-semibold text-white"
                          to="/giving-help"
                        >
                          Giving help
                        </NavLink>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="pr-2 font-semibold text-white"
                          to="/receiving-help"
                        >
                          Receiving help
                        </NavLink>
                        <NavLink
                          onClick={(e) => {
                            setOpen(!open);
                          }}
                          className="pr-2 font-semibold text-white"
                          to="/profile"
                        >
                          Profile
                        </NavLink>
                      </>
                    )}
                    {props.user ? (
                      <NavLink
                        className=" text-white pr-2 font-semibold hover:text-[#FF9940]"
                        to="/"
                        onClick={(e) => {
                          props.logoutCb();
                          setOpen(!open);
                        }}
                      >
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink
                        className=" text-white pr-2 font-semibold hover:text-[#FF9940]"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    )}
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
