import React from "react";
import image1 from "../img/getStarted-image.png";
import image2 from "../img/building.png";
import image3 from "../img/building2.png";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";

export default function GetStarted(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mb-5 md:mt-8 xl:mt-0 md:mb-20 flex items-center md:gap-10 flex-col">
            {props.loading && (
        <div>
          <div className="giphy-embed w-full h-full relative">
            <iframe
              src="https://giphy.com/embed/ZAqy8JqMwiyeUprHUI"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full absolute"
            ></iframe>
          </div>
          <p>
            <a href="https://giphy.com/gifs/community-takecare-holdon-ZAqy8JqMwiyeUprHUI" className="text-3xl text-[#70840def]">
              loading...
            </a>
          </p>
        </div>
      )}
      <div className="xl:relative">
        <img src={image2} className="xl:w-[400px] w-[300px] left-14 xl:left-0 relative top-8 " />
        <div className="flex flex-col items-center">
          <h1 className="text-6xl text-[#361201] font-bold mb-8">
            Hour Hood App
          </h1>
          <p className="xl:w-[400px] w-[300px] font-semibold">
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        {/* <img src={image3} className="w-[200px] " /> */}
      </div>
      <div className="flex md:mt-10 xl:mt-0 flex-wrap md:flex-nowrap content-center xl:gap-2 md:mx-4 xl:mx-44">
        <img src={image1} className="xl:w-[900px] w-[400px] relative -mt-4 xl:-mt-8" />
        <div className="flex flex-col items-center xl:-ml-20 xl:mr-5 gap-2 justify-center">
          <div className="bg-[#fe8923] w-28 h-1"></div>
          <h1 className="xl:text-6xl text-5xl text-[#361201] font-bold">
            Why did we do this project?
          </h1>
          <p className="xl:w-[400px] w-[300px] font-semibold">
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <div className="bg-[#fe8923] w-28 h-1"></div>
        </div>
      </div>
      <p className=" mt-10 md:-mb-10 xl:mb-0 md:w-[600px] w-[300px] font-semibold">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </p>
      {!props.user && (
        <Link
          to="/rules"
          className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-16 py-2 text-lg uppercase text-white font-bold rounded-xl md:mt-10 2xl:my-14 mt-8"
        >
          Sign up!
        </Link>
      )}
    </div>
  );
}
