import React from 'react';
import { Link } from 'react-router-dom';


export default function AddOfferButton() {
  return (
    <Link
      to={'/service-post'}
      className="block w-1/4 p-3 mx-auto mt-5 overflow-hidden text-lg text-white rounded-lg justify-left bg-[#FF9940]"
    >
      <svg
        className="inline fill-amber-100/80"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="48"
        height="48"
        viewBox="0 0 24 24"
      >
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
      Add a new offer{' '}
    </Link>
  );
}
