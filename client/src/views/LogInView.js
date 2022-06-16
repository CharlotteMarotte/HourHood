import React from "react";
import { Link } from "react-router-dom";

export default function LogInView(props) {
  function handleSubmit(event) {
    event.preventDefault();

    props.postServiceCb();
  }
  return (
    <div className="flex justify-center">
      <div className="bg-white flex flex-col py-20 w-[500px] rounded-lg shadow-lg shadow-[#361201a2] mt-20">
        <h3 className="text-2xl text-[#361201] font-bold mt-2">
          Already part of the community? <br />
          <span className="text-[#fe8923] text-3xl">Login</span>
    
        </h3>
        <form className="flex flex-col items-center gap-10 mt-10">
          <div className="flex gap-10 items-center">
            <input
              require
              id="title-input"
              type="text"
              className="rounded-lg py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Whats your name?"
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              require
              id="password-input"
              type="password"
              className="rounded-lg py-2 px-8 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Password"
            />
          </div>
          <button className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-[#C8E242] hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
