import React, { useContext } from 'react';
import AppContext from '../AppContext';
import OfferCard from './OfferCard';
import { Link } from 'react-router-dom';

export default function OfferGrid() {
  let { offers, user } = useContext(AppContext);

  return (
    // Code thanks to https://codepen.io/asdasdadddddddddd/pen/ExXjdPM
    <div>
      <div className="container px-5 py-24 mx-auto space-x-6 md:block lg:flex">
        <div className="flex flex-wrap items-stretch w-full -m-4 ">
          {offers.map((o) => (
            <OfferCard key={o.postID} offer={o} view={'offers'} />
          ))}
        </div>
        {user &&
        <div
          className={`${
            user ? 'lg:block ' : 'hidden'
          } pb-6 w-full mt-10 lg:mt-0 lg:w-1/6 xl:w-1/5 h-1/2 bg-white shadow-lg shadow-amber-400 border-amber-200 border-2  rounded-lg`}
        >
          <img
            className="object-cover w-2/3 h-auto mx-auto mt-3 border-2 rounded-full border-amber-400 lg:w-3/4"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/285ce8115100471.6047eaa30896a.jpg"
            alt="avatar"
          />
          <h1 className="my-2 text-2xl font-medium title-font text-amber-900">
            Hello {user.first_name}!
          </h1>
          <p className="my-2 leading-relaxed text-amber-500 ">Wallet: 10h</p>
          <Link
            to="/profile"
            className="leading-relaxed underline text-amber-400"
          >
            My Profile
          </Link>
        </div>
        }
      </div>
    </div>
  );
}
