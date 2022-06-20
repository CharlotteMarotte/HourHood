import React from 'react';
import SelectedOfferCard from '../components/SelectedOfferCard';

export default function BookingsView(props) {
  return (
    <div className="columns-2">
      <h1 className="pt-8 text-4xl font-bold text-left ml-14 text-amber-900">
        Receiving help{' '}
      </h1>
      <div className="container">
        <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
          Your sent requests{' '}
        </h1>
        {props.bookings
          .filter((e) => e.bookingStatus === 'pending')
          .map((booking) => (
            <SelectedOfferCard
              view={'bookings'}
              booking={booking}
              key={booking.bookingId}
            />
          ))}
      </div>

      <div>
        <div className="container ">
          <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
            Services you will receive{' '}
          </h1>
          {props.bookings
            .filter((e) => e.bookingStatus === 'accepted')
            .map((booking) => (
              <SelectedOfferCard
                view={'bookings'}
                booking={booking}
                key={booking.bookingId}
              />
            ))}{' '}
        </div>
      </div>
    </div>
  );
}
