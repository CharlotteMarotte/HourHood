import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function OfferCard(props) {
  let { user, deleteServiceCb, selectOfferCb, toEditCb, userWallet } =
    useContext(AppContext);

  return (
    <div
      className={`p-4 w-full ${
        user && props.view === 'offers'
          ? 'md:w-1/2 xl:w-1/3 2xl:1/4'
          : 'md:w-1/2 lg:w-1/3 xl:w-1/4'
      }`}
    >
      <div className="overflow-hidden bg-white border-2 rounded-lg shadow-lg shadow-amber-400 border-amber-200">
        <div className="m-5 lg:h-48 md:h-36">
          <img
            className="object-cover w-full h-full "
            // should be img from servicePost obj
            src={props.offer.category.picture}
            alt="blog"
          />
        </div>
        <div className="p-6">
          <h2 className="mb-1 font-medium tracking-widest text-s title-font text-amber-500">
            {props.offer.category.title}
          </h2>
          <h1 className="h-16 mb-3 text-2xl font-medium title-font text-amber-900">
            {props.offer.title}
          </h1>
          <div className="p-2 mb-5 rounded-lg h-28 bg-amber-100">
            <p className="leading-relaxed text-amber-500 ">
              Note: "{props.offer.description}"
            </p>
          </div>
          {/* if in profile view show extra information */}
          {props.view === 'profile' && (
            <p className="mb-3 leading-relaxed text-amber-500">
              My capacity: {props.offer.capacity} times/month
            </p>
          )}
          {props.view === 'profile' && (
            // depending of donation boolean show relevant string in card
            <p className="mb-3 leading-relaxed text-amber-500">
              I {!props.offer.donation && "don't"} accept donations
            </p>
          )}
          <div className="relative flex flex-wrap justify-center space-x-2 bottom-1">
            {/* depending which view uses card (profile/) buttons change */}
            {props.view === 'offers' ? (
              <>
                <Link
                  to={user ? `/profile/${props.offer.user.userID}` : '/login'}
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                >
                  {!user || user.id !== props.offer.user.userID
                    ? `${props.offer.user.firstName}'s Profile`
                    : 'My Profile'}
                </Link>
                {/* only show this button if this is not my own offer, check first if user is defined */}
                {user && user.id !== props.offer.user.userID && (
                  <button
                    disabled={userWallet < 1 ? true : false}
                    onClick={(e) => selectOfferCb(props.offer.postID)}
                    className="px-4 py-2 font-semibold bg-transparent border rounded disabled:transform-none disabled:transition-none disabled:cursor-not-allowed hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
                  >
                    Request
                  </button>
                )}
              </>
            ) : (
              <>
                <Link to={`/profile/${props.offer.user.userID}`}>
                  <button
                    type="button"
                    onClick={(e) => deleteServiceCb(props.offer.postID)}
                    className="px-4 py-2 font-semibold bg-transparent border rounded lg:mb-2 hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                  >
                    Delete{' '}
                  </button>
                </Link>
                <Link to={'/service-post/edit'}>
                  <button
                    type="button"
                    className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-500 hover:border-transparent"
                    onClick={(e) => toEditCb(props.offer.postID)}
                  >
                    Edit{' '}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
