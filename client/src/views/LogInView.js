import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";



export default function LogInView(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useLayoutEffect(() => {
    window.scrollTo(0, 0)
}, []);

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "emailInput":
        setEmail(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.loginCb(email, password);
  }
  return (
    <div className="flex justify-center">
      {props.loginError && (
        <div className="alert alert-danger">{props.loginError}</div>
      )}
      <div className="bg-white flex flex-col pt-20 w-[500px] rounded-lg shadow-lg shadow-[#ff994091] mt-20 mb-20 pb-20">
        <h3 className="text-2xl text-[#361201] font-bold mt-2">
          Already part of the community? <br />
          <span className="text-[#fe8923] text-3xl">Login</span>
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-10 mt-10"
        >
          <div className="flex gap-10 items-center">
            <input
              name="emailInput"
              required
              type="email"
              className="rounded-lg py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Whats your email?"
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              required
              name="passwordInput"
              type="password"
              className="rounded-lg py-2 px-8 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-[#C8E242] hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
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
              Do you want to{" "}
              <Link
                to="/rules"
                className="text-[#ff994093] text-3xl cursor-pointer hover:text-[#fe8923]"
              >
                register
              </Link>
              ?
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}
