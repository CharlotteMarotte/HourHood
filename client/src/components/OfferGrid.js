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
          <div className='w-2/3 mx-4 my-6 h-2/3 lg:w-48 lg:h-48'>
          <img
            className="object-cover w-2/3 border-2 rounded-full h-2/3 lg:w-48 lg:h-48 border-amber-400"
            src={user.photo}
            alt="avatar"
          />
          </div>
          <h1 className="my-2 text-2xl font-medium title-font text-amber-900">
            Hello {user.first_name}!
          </h1>
          <p className="my-2 leading-relaxed text-amber-500 ">Wallet: 10h</p>
          <Link
            to={`/profile/${user.id}`}
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
