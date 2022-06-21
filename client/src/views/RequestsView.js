import React, { useContext } from 'react';
import AppContext from '../AppContext';
import SelectedOfferCard from '../components/SelectedOfferCard';
import AddOfferButton from '../components/AddOfferButton';

export default function RequestsView(props) {
  let { bookings } = useContext(AppContext);

  return (
    <div>
      <h1 className="pt-8 text-4xl font-bold text-left ml-14 text-amber-900">
        Giving help{' '}
      </h1>
      <AddOfferButton />

      <div className="lg:grid lg:grid-cols-2 ">
        <div className="">
          <div className="container">
            <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
              Pending{' '}
            </h1>
          </div>
          {bookings
            .filter((e) => e.bookingStatus === 'pending')
            .map((request) => (
              <SelectedOfferCard
                view={'requests'}
                booking={request}
                key={request.bookingId}
              />
            ))}
        </div>
        <div>
          <div className="container ">
            <h1 className="pt-4 ml-20 mr-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
              Accepted{' '}
            </h1>
          </div>
          {bookings
            .filter((e) => e.bookingStatus === 'accepted')
            .map((request) => (
              <SelectedOfferCard
                view={'requests'}
                booking={request}
                key={request.bookingId}
              />
            ))}{' '}
        </div>
      </div>
    </div>
  );
}
