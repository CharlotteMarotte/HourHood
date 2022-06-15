import React from "react";
import logo from "../img/logo-2.png";

export default function IreneView() {
  return (
    <div>
    <div className="h-[540px] bg-[#FFF701] flex flex-col items-center">
      <img src={logo} className="w-[680px] mt-16 mb-4" />
      <h2 className="font-bold text-lg">
        Is simply dummy text of the printing and typesetting industry
      </h2>
      <h3>when an unknown printer took a galley</h3>
      <h2 className="font-bold text-xl">Is simply dummy</h2>
      <p className="text-4xl font-bold bg-[#36120186] text-[#FFF701] py-[6px] px-[16px] rounded-full mt-8 align-middle">
        v
      </p>
    </div>
    <button className="bg-[#FF9940] px-16 py-2 text-lg uppercase text-white font-bold rounded-xl mt-10">Sign up!</button>
    </div>
  );
}
