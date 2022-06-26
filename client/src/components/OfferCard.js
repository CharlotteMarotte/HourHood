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
      <div className="overflow-hidden bg-white lg:h-[580px] md:h-[510px]  min-h-fit max-h-[620px] rounded-lg shadow-lg shadow-[#ff994091]">
        <div className="m-5 lg:h-48 md:h-36">
          <img
            className="object-cover w-full h-full "
            // should be img from servicePost obj
            src={props.offer.category.picture}
            alt="blog"
          />
        </div>
        <div className="p-6">
          <h2 className="mb-1 font-semibold tracking-widest text-s title-font text-[#70840def]">
            {props.offer.category.title}
          </h2>
          <h1 className="h-16 mb-3 text-2xl title-font text-[#361201] font-bold">
            {props.offer.title}
          </h1>
          <div className="p-2 mb-5 rounded-lg h-24 bg-gradient-to-b from-[#fff7a382] to-[#ff994021] overflow-y-auto">
            <p className="leading-relaxed text-[#fe8923] ">
              Note: "{props.offer.description}"
            </p>
          </div>
          {/* if in profile view show extra information */}
          {/* {props.view === 'profile' && (
            <p className="mb-3 leading-relaxed text-amber-500">
              My capacity: {props.offer.capacity} times/month
            </p>
          )} */}
          {props.view === 'profile' && (
            // depending of donation boolean show relevant string in card
            <p className="mb-3 leading-relaxed text-[#fe8923]">
              I {!props.offer.donation && "don't"} accept donations
            </p>
          )}
          <div className="relative flex flex-wrap justify-center space-x-2 bottom-1">
            {/* depending which view uses card (profile/) buttons change */}
            {props.view === 'offers' ? (
              <>
                <Link
                  to={user ? `/profile/${props.offer.user.userID}` : '/login'}
                  className="px-8 py-2 font-semibold rounded-lg uppercase bg-[#ff9940e3] hover:bg-[#fe8923] hover:border hover:border-[#fe8923] hover:shadow-md hover:shadow-[#ff994091] text-white "
                >
                  {!user || user.id !== props.offer.user.userID
                    ? <p className='text-sm'>{props.offer.user.firstName}'s <br/> <span className='text-xs'>Profile</span></p>
                    : <p>My Profile</p>}
                </Link>
                {/* only show this button if this is not my own offer, check first if user is defined */}
                {user && user.id !== props.offer.user.userID && (
                  <button
                  title={(userWallet < 1 && !props.offer.donation) ? "You don't have enough credit in your wallet and the service is not available for donation" : null}
                  // disabled = {(userWallet < 1 && !props.offer.donation) ? true : false}
                    onClick={(userWallet < 1 && !props.offer.donation) ? (e => alert("Service is not available for donation")) : ((e) => selectOfferCb(props.offer.postID))}
                    className={`px-4 py-2 font-semibold bg-transparent border rounded ${(userWallet < 1 && !props.offer.donation) ? "transform-none transition-none uppercase cursor-not-allowed hover:bg-gray-300 text-gray-400 hover:text-white border-gray-300 hover:border-transparent" : "uppercase rounded-xl hover:bg-[#a6c120] bg-[#70840def] hover:shadow-[#ff994091] hover:shadow-md text-white hover:border hover:border-[#a6c120]"}`}
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
                    className="px-6 uppercase py-2 font-bold rounded-lg lg:my-2 hover:shadow-md hover:shadow-[#ff994091] hover:border hover:border-red-500 hover:bg-red-500 bg-red-400 text-white"
                  >
                    Delete{' '}
                  </button>
                </Link>
                <Link to={'/service-post/edit'}>
                  <button
                    type="button"
                    className="px-[35px] py-2 uppercase font-semibold rounded-lg hover:bg-[#fe8923] lg:my-2 bg-[#ff9940e3] hover:border hover:border-[#fe8923] hover:shadow-md hover:shadow-[#ff994091] text-white"
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
