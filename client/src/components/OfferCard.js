import React from 'react';

export default function OfferCard(props) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-amber-800 rounded-lg overflow-hidden bg-amber-100">
        <img
          className="lg:h-48 md:h-36 w-full object-cover"
          src={props.offer.img}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-s title-font font-medium text-amber-500 mb-1">
            {props.offer.category}
          </h2>
          <h1 className="title-font text-2xl font-medium text-amber-900 mb-3">
            {props.offer.title}
          </h1>
          <p className="leading-relaxed mb-3 text-amber-500 ">{props.offer.description}</p>
          <div className="flex justify-center flex-wrap space-x-2 md:space-y-2 lg:space-y-0">
            <button className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded">
              Add to Favs{' '}
            </button>
            <button className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
