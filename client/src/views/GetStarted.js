import React from "react";
import image1 from "../img/getStarted.png";
import { Link } from 'react-router-dom';
import { useLayoutEffect } from "react";

export default function GetStarted(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="text-6xl text-[#361201] font-bold mb-8">Hour Hood App</h1>
      <p className="w-[400px] font-semibold">
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <div className="flex items-center mx-32">
        <img src={image1} className="w-[800px]" />
        <div className="flex flex-col items-center gap-8 justify-center">
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <h1 className="text-6xl text-[#361201] font-bold">
            Why did we do this project?
          </h1>
          <p className="w-[400px] font-semibold">
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className="bg-[#fe8923] w-28 h-1"></div>
        </div>
      </div>
      {!props.user && (
      <Link to="/rules" className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-16 py-2 text-lg uppercase text-white font-bold rounded-xl md:mt-10 2xl:my-14 mt-8">Sign up!</Link>
      )}
      </div>
  );
}
