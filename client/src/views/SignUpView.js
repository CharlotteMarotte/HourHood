import React, { useState } from "react";
import { Link } from "react-router-dom";
import map from "../img/tempMap.png";
import { useLayoutEffect } from "react";

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  street: "",
  house_number: "",
  city_code: 0,
  city_name: "",
  country: "",
  email: "",
  user_description: null,
  hobbies: null,
  superpower: null,
  photo: null,
  password: "",
};
export default function SignUpView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [newUser, setNewUser] = useState(EMPTY_FORM);

  function handleChange(event) {
    let { name, value } = event.target;
    setNewUser((newUser) => ({ ...newUser, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    // let user = newUser;

    // user.id =  props.user.id;
    // console.log("linea34" , user.id)
    // user.joining = new Date().toISOString().slice(0,12); //we modify the date format
    props.addNewUserCb(newUser);
    setNewUser(EMPTY_FORM);
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white flex flex-col pt-20 w-[600px] rounded-lg shadow-lg shadow-[#ff994091] mt-20 mb-20 pb-20">
        <h3 className="text-2xl text-[#361201] font-bold mt-2">
          Welcome to the community! <br />
          <span className="text-[#fe8923] text-3xl">Sign Up</span>
        </h3>
        <p className="text-sm text-[#ff994093] font-semibold">( It's free )</p>
        <form
          className="flex flex-col items-center gap-5 mt-10"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex gap-10 items-center">
            <input
              required
              name="first_name"
              type="text"
              className="rounded-lg py-2 w-64 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={(e) => handleChange(e)}
            />
            <input
              required
              name="last_name"
              type="text"
              className="rounded-lg py-2 w-64 px-8 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              required
              name="street"
              type="text"
              className="rounded-lg w-64 py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : Carrer d'en Grassot"
              value={newUser.street}
              onChange={(e) => handleChange(e)}
            />
            <input
              required
              name="house_number"
              type="text"
              className="rounded-lg py-2 px-8 w-64 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : 101 "
              value={newUser.house_number}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-10 items-center">
            <input
              required
              name="city_code"
              type="text"
              className="rounded-lg w-64 py-2 px-8 border-2 text-text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : 08025"
              value={newUser.city_code}
              onChange={(e) => handleChange(e)}
            />
            <input
              required
              name="city_name"
              type="text"
              className="rounded-lg py-2 px-8 w-64 border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
              placeholder="E.g. : Barcelona "
              value={newUser.city_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            required
            name="country"
            type="text"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="E.g. : Spain "
            value={newUser.country}
            onChange={(e) => handleChange(e)}
          />
          <img src={map} alt="location" className="w-[553px] rounded-lg" />
          <input
            required
            name="email"
            type="email"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="E.g. : codeop@grassot.com "
            value={newUser.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            required
            name="password"
            type="text"
            className="rounded-lg py-2 px-8 w-[553px] border-2 text-[#fe8923] border-[#fe8923] outline-none focus:border-[#C8E242]"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => handleChange(e)}
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
              Go to
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
