import React from 'react'
import { Link } from "react-router-dom";

export default function SignUpView(props) {
  function handleSubmit(event) {
    event.preventDefault();

    props.postServiceCb();
  }
  return (
    <div className="flex justify-center">
    <div className="bg-white flex flex-col pt-20 w-[500px] rounded-lg shadow-lg shadow-[#ff994091] mt-20 mb-20 pb-20">
      <h3 className="text-2xl text-[#361201] font-bold mt-2">
        Welcome to the community! <br />
        <span className="text-[#fe8923] text-3xl">Login</span>
      </h3>
      <form className="flex flex-col items-center gap-10 mt-10">
        <div className="flex gap-10 items-center">
          <input
            require
            id="email-input"
            type="email"
            className="rounded-lg py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="Whats your email?"
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
        <button
          type="submit"
          className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-[#C8E242] hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
        >
          Login
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center mt-4 gap-6">
            <div className="bg-[#C8E242] w-20 h-[0.1rem]"></div>
            <h3 className="text-lg text-[#361201] font-bold">Or</h3>
            <div className="bg-[#C8E242] w-20 h-[0.1rem]"></div>
          </div>
          <h3 className="text-2xl text-[#361201] font-bold">
            Do you want to <Link to="/signup" className="text-[#ff994093] text-3xl cursor-pointer hover:text-[#fe8923]">register</Link>?
          </h3>
        </div>
      </form>
    </div>
  </div>
  )
}
