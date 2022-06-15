import React, { useContext } from 'react';
import AppContext from '../AppContext';
import OfferCard from './OfferCard';
import { Link } from 'react-router-dom';


export default function OfferGrid() {
  let { offers } = useContext(AppContext);

  return (
    // Code thanks to https://codepen.io/asdasdadddddddddd/pen/ExXjdPM
    <div>
      <div className="container px-5 py-24 mx-auto md:block lg:flex space-x-6">
        <div className="flex flex-wrap -m-4">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} view={"offers"}/>
          ))}
        </div>
        <div className="hidden lg:block w-full md:w-1/2 lg:w-1/3 h-64 bg-amber-100 border-2 border-amber-800 rounded-lg">
          <img
            className="w-1/2 object-cover mx-auto mt-3 rounded-full"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/285ce8115100471.6047eaa30896a.jpg"
            alt="avatar"
          />
          <h1 className="title-font text-2xl font-medium text-amber-900 my-1">
            Hello Jane!
          </h1>
          <p className="leading-relaxed mb-3 text-amber-500 ">Wallet: 10h</p>
          <Link to="/profile" className="leading-relaxed mb-3 text-amber-400 underline">My Profile</Link>
        </div>
      </div>
    </div>
  );
}
