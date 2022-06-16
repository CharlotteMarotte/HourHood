import React from 'react';
import SelectedOfferCard from '../components/SelectedOfferCard';

export default function RequestsView(props) {
  return (
    <div>
      <h1 className="pt-8 text-4xl font-bold text-left ml-14 text-amber-900">
        Requests{' '}
      </h1>
      <div className="container">
        <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
          Pending{' '}
        </h1>
      </div>
      {props.requests
        .filter((e) => e.status === 'pending')
        .map((request) => (
          <SelectedOfferCard
            view={'requests'}
            offer={request}
            key={request.id}
          />
        ))}
      <div className="container ">
        <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
          Accepted{' '}
        </h1>
      </div>
      {props.requests
        .filter((e) => e.status === 'accepted')
        .map((request) => (
          <SelectedOfferCard
            view={'requests'}
            offer={request}
            key={request.id}
          />
        ))}{' '}
    </div>
  );
}
