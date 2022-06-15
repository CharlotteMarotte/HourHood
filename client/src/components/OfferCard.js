import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function OfferCard(props) {
  let { user } = useContext(AppContext);

  return (
    <div className={`p-4 w-full ${user ? "w-full lg:w-1/2 " : "md:w-1/2 lg:w-1/3"}`}>
      <div className="h-full border-2 border-amber-800 rounded-lg overflow-hidden bg-amber-100">
        <div className="lg:h-72 md:h-36 m-5">
          <img
            className="h-full w-full object-cover"
            src={props.offer.img}
            alt="blog"
          />
        </div>
        <div className="p-6">
          <h2 className="tracking-widest text-s title-font font-medium text-amber-500 mb-1">
            {props.offer.category}
          </h2>
          <h1 className="title-font text-2xl font-medium text-amber-900 mb-3">
            {props.offer.title}
          </h1>
          <p className="leading-relaxed mb-3 text-amber-500 ">
            "{props.offer.description}"
          </p>
          <div className="flex justify-center flex-wrap space-x-2 md:space-y-2 lg:space-y-0">
            {/* depending which view uses card (profile/offers) buttons change */}
            {props.view === 'offers' ? (
              <>
                <Link
                  to={user ? '/' : '/login'}
                  className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  User's Profile{' '}
                </Link>

                <Link
                  to={user ? '/service-request' : '/login'}
                  className="bg-transparent hover:bg-lime-600 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded"
                >
                  Request
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-transparent hover:bg-lime-600 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  Edit{' '}
                </button>
                <button
                  type="button"
                  className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  Delete{' '}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
