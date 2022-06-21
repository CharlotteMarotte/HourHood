import React, { useContext } from 'react';
import AppContext from '../AppContext';
import SelectedOfferCard from '../components/SelectedOfferCard';
import { Link } from 'react-router-dom';

export default function BookingsView(props) {
  let { bookings } = useContext(AppContext);

  return (
    <div>
      <h1 className="pt-8 text-4xl font-bold text-left ml-14 text-amber-900">
        Receiving help{' '}
      </h1>
      <Link
        to={'/'}
        className="block w-1/4 p-3 mx-auto mt-5 overflow-hidden text-lg text-white font-bold rounded-lg justify-left bg-[#90a32e6d]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
        height="48"
          className="inline mr-3 fill-lime-100/80"
          viewBox="0 0 92 92"
        >
          <path d="M91.8 27.3L81.1 61c-.8 2.4-2.9 4-5.4 4H34.4c-2.4 0-4.7-1.5-5.5-3.7L13.1 19H4c-2.2 0-4-1.8-4-4s1.8-4 4-4h11.9c1.7 0 3.2 1.1 3.8 2.7L36 57h38l8.5-27H35.4c-2.2 0-4-1.8-4-4s1.8-4 4-4H88c1.3 0 2.5.7 3.2 1.7.8 1 1 2.4.6 3.6zm-55.4 43c-1.7 0-3.4.7-4.6 1.9-1.2 1.2-1.9 2.9-1.9 4.6 0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9s3.4-.7 4.6-1.9c1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6-1.2-1.2-2.9-1.9-4.6-1.9zm35.9 0c-1.7 0-3.4.7-4.6 1.9s-1.9 2.9-1.9 4.6c0 1.7.7 3.4 1.9 4.6 1.2 1.2 2.9 1.9 4.6 1.9 1.7 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.9 1.9-4.6 0-1.7-.7-3.4-1.9-4.6s-2.9-1.9-4.6-1.9z" />
        </svg>
        Go to all offers{' '}
      </Link>
      <div className="lg:grid lg:grid-cols-2 ">
        <div className="container">
          <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-amber-700 border-amber-700">
            Pending
          </h1>
          {bookings
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
            <h1 className="pt-4 ml-20 mr-20 text-3xl font-bold text-left border-b-2 border-opacity-25 q-100 text-amber-700 border-amber-700">
              Accepted
            </h1>
            {bookings
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
    </div>
  );
}