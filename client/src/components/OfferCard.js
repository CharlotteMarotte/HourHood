import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function OfferCard(props) {
  let { user } = useContext(AppContext);

  return (
    <div className={`p-4 w-full ${user && props.view==="offers" ? "md:w-1/2 xl:w-1/3 2xl:1/4" : "md:w-1/2 lg:w-1/3 xl:w-1/4"}`}>
      <div className="h-full overflow-hidden bg-white border-2 rounded-lg shadow-lg shadow-amber-400 border-amber-200 ">
        <div className="m-5 lg:h-72 md:h-36">
          <img
            className="object-scale-down w-full h-full "
            // should be img from servicePost obj
            src= {props.offer.category.picture}
            alt="blog"
          />
        </div>
        <div className="p-6">
          <h2 className="mb-1 font-medium tracking-widest text-s title-font text-amber-500">
            {props.offer.category.title}
          </h2>
          <h1 className="mb-3 text-2xl font-medium title-font text-amber-900">
            {props.offer.title}
          </h1>
          <p className="mb-3 leading-relaxed text-amber-500 ">
            "{props.offer.description}"
          </p>
          {/* {
            props.view === 'profile' && (
              <p className="mb-3 leading-relaxed text-amber-500>Haha</p>
            )
          } */}
          <div className="relative flex flex-wrap justify-center space-x-2 bottom-1 md:space-y-2 lg:space-y-0">
            {/* depending which view uses card (profile/) buttons change */}
            {props.view === 'offers' ? (
              <>
                <Link
                  to={user ? '/' : '/login'}
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                >
                  User's Profile{' '}
                </Link>

                <Link
                  to={user ? '/service-request' : '/login'}
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
                >
                  Request
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-amber-500 hover:border-transparent"
                >
                  Edit{' '}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
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
