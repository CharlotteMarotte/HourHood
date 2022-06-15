import React from 'react';
import OfferGrid from '../components/OfferGrid';

export default function OffersView(props) {
  return (
    <div>
      <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600">OffersView</h3>
      {props.user ? (
        <p>{props.user.name} is logged in</p>
      ) : (
        <p>No one is logged in</p>
      )}
      <OfferGrid/>
    </div>
  );
}
