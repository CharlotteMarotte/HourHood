import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function SelectedOfferCard(props) {
  let { reactToRequestCb, users, offers } = useContext(AppContext);

  const [providerData, setProviderData] = useState(users[0]);

  useEffect(() => {
    getProviderData();
  }, []);

  function getProviderData() {
    let filteredUsers = users.filter(
      (u) => u.id === props.booking.servicePost.serviceProvider
    );
    setProviderData(filteredUsers[0]);
  }

  return (
    // Code thanks to https://codepen.io/egoistdeveloper/pen/xxYrmgd
    <div className="mx-8 my-10 ">
      <div
        className={`block w-full p-6 bg-white border-4 rounded-lg -z-1 md:flex md:flex-row lg:mx-auto lg:w-4/5 border-amber-200/80`}
      >
        <div className="relative flex items-center justify-center">
          <img
            className="object-cover w-64 h-64 rounded-lg"
            src={
              props.view === 'requests'
                ? props.booking.requestor.profilePicture
                : providerData.photo
            }
            alt="User"
          />
        </div>

        <div className="flex flex-col w-full px-6">
          <div className="flex flex-row h-14">
            <h2 className="mb-1 text-2xl font-medium title-font text-amber-900">
              {props.booking.servicePost.serviceTitle}
            </h2>
          </div>

          <div className="flex flex-row my-2 space-x-2">
            <div className="flex flex-row">
              <svg
                className="w-4 h-6 mr-2 fill-amber-700/80"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
              </svg>

              <div className="text-s text-amber-700/80 ">
                {props.view === 'requests'
                  ? props.booking.requestor.firstName
                  : providerData.first_name}
              </div>
            </div>

            <div className="flex flex-row">
              <svg
                className="w-4 h-6 mr-2 fill-amber-700/80"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
              </svg>

              <div className="text-s text-amber-700/80 ">
                {props.view === 'requests'
                  ? props.booking.requestor.cityName
                  : providerData.city_name}
              </div>
            </div>
          </div>
          <div
            className={`w-full p-5 mt-5 space-y-3 text-left rounded-lg justify ${
              props.view === 'bookings' ? 'bg-amber-200' : 'bg-orange-200'
            }`}
          >
            <p className="leading-relaxed text-amber-700 ">
              Note: "{props.booking.bookingDescription}"
            </p>
          </div>
          <div
            className={`w-full p-5 mt-5 space-y-3 text-left rounded-lg justify ${
              props.view === 'bookings' ? 'bg-blue-200' : 'bg-pink-200'
            }`}
          >
            <p className="leading-relaxed text-amber-700 ">
              {new Date(props.booking.proposedDate).toLocaleDateString(
                'en-GB',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              )}
            </p>
          </div>
          <div className="flex items-center justify-center flex-grow w-full col-span-2 pt-6 mt-4 lg:pt-0 w-100">
            {props.view === 'requests' &&
            props.booking.bookingStatus === 'pending' ? (
              <div className="flex flex-row space-x-3">
                <button
                  type="submit"
                  onClick={(e) =>
                    reactToRequestCb(props.booking.bookingId, 'declined')
                  }
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                >
                  Decline{' '}
                </button>{' '}
                <button
                  type="button"
                  onClick={(e) =>
                    reactToRequestCb(props.booking.bookingId, 'accepted')
                  }
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
                >
                  Accept
                </button>
                <Link
                  to="/chat"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-rose-500 text-rose-700 hover:text-white border-rose-500 hover:border-transparent"
                >
                  Chat{' '}
                </Link>{' '}

              </div>
            ) : (
              <div className="flex flex-row space-x-3">
                <button
                  type="submit"
                  onClick={(e) =>
                    reactToRequestCb(props.booking.bookingId, 'declined')
                  }
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                >
                  Cancel{' '}
                </button>{' '}
                <Link
                  to="/chat"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-500 text-lime-700 hover:text-white border-lime-500 hover:border-transparent"
                >
                  Chat{' '}
                </Link>{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
