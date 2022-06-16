import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import OfferCard from '../components/OfferCard';
import { Link } from 'react-router-dom';

export default function ProfileView() {
  let { user, offers } = useContext(AppContext);
  // doesn't work, direct filter before map
  // let [myOffers, setMyOffers] = useState(offers);

  // useEffect(() => {
  //   getMyOffers();
  // }, []);

  // function getMyOffers() {
  //   if (user) {
  //     let filteredOffers = offers.filter((e) => e.providerId === user.id);
  //     setMyOffers(filteredOffers);
  //   }
  // }

  return (
    // Code thanks to https://codepen.io/tariq01/pen/jOyLrRJ
    <>
      {user ? (
        <div className="font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover">
          <div className="flex flex-wrap items-center h-auto max-w-4xl mx-auto my-24 lg:h-screen lg:my-0">
            <div className="w-full lg:w-2/5">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F96%2F24%2Fa8%2F9624a8213b44121b85d6139e3dad1827.png&f=1&nofb=1"
                className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
              />
            </div>
            <div
              id="profile"
              className="w-full mx-6 bg-white rounded-lg shadow-lg opacity-75 lg:w-3/5 lg:rounded-r-lg lg:rounded-l-none lg:mx-0 "
            >
              <div className="p-4 text-center md:p-12 lg:text-left">
                <h1 className="pt-8 text-3xl font-bold lg:pt-0">My Profile</h1>
                <div className="w-4/5 pt-3 mx-auto border-b-2 opacity-25 lg:mx-0 border-amber-500"></div>

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  About Me{' '}
                </p>
                <p className="text-sm">
                  I moved to Gracia in September with my partner.
                </p>

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Hobbies{' '}
                </p>
                <p className="text-sm">Crocheting, gardening, ceramics</p>

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Superpower is...{' '}
                </p>
                <p className="text-sm">Planning suprise parties</p>

                <div className="pt-12 pb-8">
                  <Link
                    to="edit"
                    className="px-4 py-2 font-bold text-white rounded-full bg-amber-700 hover:bg-amber-900"
                  >
                    Edit Profile{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h1 className="pt-8 text-3xl font-bold lg:pt-0">
              My current offerings
            </h1>
            <div className="w-4/5 py-3 mx-auto border-b-2 opacity-25 lg:mx-0 border-amber-500"></div>
            <Link
              to={'/service-post'}
              className="block w-1/4 p-4 mx-auto mt-5 overflow-hidden text-white border-2 rounded-lg bg-lime-600 h-1/6 border-lime-800"
            >
              Add a new offer +
            </Link>
            <div className="flex flex-wrap px-5 py-24 mx-auto -m-4 space-x-6 md:block lg:flex">
              {offers
                .filter((e) => e.providerId === user.id)
                .map((o) => (
                  <OfferCard key={o.id} offer={o} view={'profile'} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <Link
          className="p-4 my-1 text-2xl font-medium rounded-lg title-font bg-amber-200 text-amber-900"
          to="/offers"
        >
          No User logged in - back to offers
        </Link>
      )}
    </>
  );
}
