import React from 'react';
import logo from "../img/logo-2.png";
import { NavLink } from 'react-router-dom';
import { Container } from 'postcss';


function HomeView() {
    return (
        <div>
        <div className="sm:h-[568px] xl:h-[700px] h-[420px] bg-[#FFF701] z-0 flex flex-col items-center">
          <img src={logo} className="w-[660px] xl:w-[800px] xl:mt-20 mt-14 mb-4" />
          <h2 className="font-bold text-[0.65rem] xl:text-2xl md:text-lg">
            Is simply dummy text of the printing and typesetting industry
          </h2>
          <h3 className='sm:text-base xl:text-xl text-xs'>when an unknown printer took a galley</h3>
          <h2 className="font-bold text-xs xl:text-2xl sm:text-lg">Is simply dummy</h2>
          <button className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-16 py-2 text-lg uppercase text-white font-bold rounded-xl xl:my-10 mt-10">Sign up!</button>
          <NavLink to="offers" className="sm:text-3xl text-2xl scroll-my-0 font-bold animate-bounce hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] rounded-full mt-8 align-middle">
            v
          </NavLink>
        </div>
        {/* <scroll-container>
        <scroll-page className='mt-40 scroll-smooth'><NavLink to="offers"></NavLink></scroll-page>
        </scroll-container> */}
        </div>
    );
}

export default HomeView;