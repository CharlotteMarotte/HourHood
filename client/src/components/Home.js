import React from 'react';
import logo from "../img/logo-2.png";
import { Link } from 'react-router-dom';
import { Container } from 'postcss';
import OfferGrid from './OfferGrid';


function Home() {
    return (
        <div>
        <div className="sm:h-[78vh] xl:h-[80vh] scroll-smooth h-[70vh] bg-[#FFE500] z-0 flex flex-col justify-center items-center">
          <img src={logo} className="w-[660px] md:w-[700px] xl:w-[640px] 2xl:w-[800px] 2xl:mt-28 md:mt-56 mt-20 xl:mt-24 mb-4" />
          <div className='md:mt-20 mt-4 flex flex-col xl:mt-1 md:mx-16 mx-8'>
          <h2 className="font-bold text-md xl:text-xl 2xl:text-3xl md:text-2xl">
            Is simply dummy text of the printing and typesetting industry
          </h2>
          <h3 className='sm:text-base 2xl:text-2xl xl:text-lg md:text-xl text-sm'>when an unknown printer took a galley</h3>
          <h2 className="font-bold text-md 2xl:text-xl md:text-2xl xl:text-xl sm:text-lg">Is simply dummy</h2>
          </div>
          <Link to="rules" className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-16 py-2 text-lg uppercase text-white font-bold rounded-xl md:mt-10 2xl:my-14 mt-8">Sign up!</Link>
          <Link to="offers" className="sm:text-3xl md:text-5xl text-2xl font-bold animate-bounce hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] xl:py-[6px] xl:px-[16px] md:py-5 md:px-8 rounded-full mt-10 xl:mt-12 sm:mt-24 md:mt-36 align-middle">
            v
          </Link>
        </div>
        </div>
    );
}

export default Home;