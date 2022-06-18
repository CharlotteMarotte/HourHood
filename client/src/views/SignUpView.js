import React from "react";
import { Link } from "react-router-dom";
import map from "../img/tempMap.png";

export default function SignUpView(props) {
  function handleSubmit(event) {
    event.preventDefault();

    props.addNewUserCb();
  }
  return (
    <div className="flex justify-center">
      <div className="bg-white flex flex-col pt-20 w-[600px] rounded-lg shadow-lg shadow-[#ff994091] mt-20 mb-20 pb-20">
        <h3 className="text-2xl text-[#361201] font-bold mt-2">
          Welcome to the community! <br />
          <span className="text-[#fe8923] text-3xl">Sign Up</span>
        </h3>
        <p className="text-sm text-[#ff994093] font-semibold">( It's free )</p>
        <form className="flex flex-col items-center gap-5 mt-10">
          <div className="flex gap-10 items-center">
            <input
              require
              name="firstName-input"
              type="text"
              className="rounded-lg py-2 w-64 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="First Name"
            />
            <input
              require
              name="lastName-input"
              type="text"
              className="rounded-lg py-2 w-64 px-8 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Last Name"
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              require
              name="street-input"
              type="text"
              className="rounded-lg w-64 py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : Carrer d'en Grassot"
            />
            <input
              require
              name="houseNumber-input"
              type="text"
              className="rounded-lg py-2 px-8 w-64 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : 101 "
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              require
              name="postalCode-input"
              type="text"
              className="rounded-lg w-64 py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : 08025"
            />
            <input
              require
              name="city-input"
              type="text"
              className="rounded-lg py-2 px-8 w-64 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : Barcelona "
            />
          </div>
          <input
            require
            name="country-input"
            type="text"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="E.g. : Spain "
          />
          <img src={map} alt="location" className="w-[553px] rounded-lg" />
          <input
            require
            name="email-input"
            type="email"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="E.g. : codeop@grassot.com "
          />
          <input
            require
            name="password-input"
            type="text"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-[#FF9940] mt-10 hover:bg-[#fe8923] hover:shadow-[#C8E242] hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
          >
            Sign Up
          </button>

          <div className="flex flex-col items-center">
            <div className="flex items-center mt-4 gap-6">
              <div className="bg-[#C8E242] w-20 h-[0.1rem]"></div>
              <h3 className="text-lg text-[#361201] font-bold">Now</h3>
              <div className="bg-[#C8E242] w-20 h-[0.1rem]"></div>
            </div>
            <h3 className="text-2xl text-[#361201] font-bold">
              Go to{" "}
              <Link
                to="/login"
                className="text-[#ff994093] text-3xl cursor-pointer hover:text-[#fe8923]"
              >
                Login
              </Link>
              !
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}
