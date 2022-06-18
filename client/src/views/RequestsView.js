import React from 'react';
import SelectedOfferCard from '../components/SelectedOfferCard';

export default function RequestsView(props) {
  return (
    <div>
      <h1 className="pt-8 text-4xl font-bold text-left ml-14 text-amber-900">
        Giving help{' '}
      </h1>
      <div className="container">
        <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
          Pending{' '}
        </h1>
      </div>
      {props.bookings
        .filter((e) => e.bookingStatus === 'pending')
        .map((request) => (
          <SelectedOfferCard
            view={'requests'}
            booking={request}
            key={request.bookingId}
          />
        ))}
      <div className="container ">
        <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
          Accepted{' '}
        </h1>
      </div>
      {props.bookings
        .filter((e) => e.bookingStatus === 'accepted')
        .map((request) => (
          <SelectedOfferCard
            view={'requests'}
            booking={request}
            key={request.bookingId}
          />
        ))}{' '}
    </div>
  );
}
