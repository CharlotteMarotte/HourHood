import React, { useContext } from 'react';
import AppContext from '../AppContext';
import SelectedOfferCard from '../components/SelectedOfferCard';
import { useLayoutEffect } from 'react';
import GoToOfferButton from '../components/GoToOfferButton';

export default function BookingsView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { bookings, requests } = useContext(AppContext);

  return (
    <div>
      <h1 className="md:text-5xl text-2xl text-[#361201] font-bold mt-6 mb-12">
        Receiving help{' '}
      </h1>

      <GoToOfferButton />
      <div className="lg:grid lg:grid-cols-2 ">
        <div className="container">
          <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-[#fe8923] border-[#fe8923]">
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
            <h1 className="pt-4 ml-20 mr-20 text-3xl font-bold text-left border-b-2 border-opacity-25 q-100 text-[#fe8923] border-[#fe8923]">
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