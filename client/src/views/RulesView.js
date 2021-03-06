import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import img1 from "../img/beOnTime.png";
import img2 from "../img/beKind.png";
import img3 from "../img/give&receive.png";
import img4 from "../img/community.png"

function RulesView() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container flex flex-col items-center gap-10 mx-auto my-20">
      <div className="flex items-center -ml-72">
        <img src={img1}/>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-6xl text-[#361201] bg-[#ffe60099] font-bold">
            Be on time
          </h2>
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <p className="mb-10 w-[400px] font-semibold">
            Respect your community member’s time and cancel appointments with
            enough time in advance.
          </p>
        </div>
      </div>

      <div className="flex items-center -mr-72">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-6xl font-bold text-[#361201] bg-[#c7e2429c]">
            Be kind
          </h2>
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <p className="mb-10 w-[400px] font-semibold">
            Be kind to each other, in messages and in real life.
          </p>
        </div>
        <img src={img2} />
      </div>

      <div className="flex items-center -ml-72">
        <img src={img3} className="mb-20 mr-10 h-32"/>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-6xl font-bold text-[#361201] bg-[#ff994093]">
            Give and receive
          </h2>
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <p className="mb-10 w-[400px] font-semibold">
            Think about what you contribute and accept the help others offer to
            you.
          </p>
        </div>
      </div>

      <div className="flex items-center -mr-72">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-6xl font-bold text-[#361201] bg-[#3612014b]">
            Think as a community
          </h2>
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <p className="mb-10 w-[400px] font-semibold">
            It’s not about you as an invidiual, it’s about making things happen
            together.{" "}
          </p>
        </div>
        <img src={img4} className="mb-12 h-72" />
      </div>
      <div className="flex justify-center gap-10">
        <Link
          to="/getstarted"
          className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
        >
          Learn more
        </Link>
        <Link
          to="/signup"
          className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default RulesView;
