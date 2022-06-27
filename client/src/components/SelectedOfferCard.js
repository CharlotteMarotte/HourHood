import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";

export default function SelectedOfferCard(props) {
  let { reactToRequestCb, users, offers, openChatCb } = useContext(AppContext);

  const [providerData, setProviderData] = useState(users[0]);
  const [givingHelp, SetGivingHelp] = useState(false);
  let photoUrl = 'http://localhost:5000/clientfiles';
  

  useEffect(() => {
    getProviderData();
  }, []);

  function getProviderData() {
    let filteredUsers = users.filter(
      (u) => u.id === props.booking.servicePost.serviceProvider
    );
    setProviderData(filteredUsers[0]);
  }

  function switchRequestorUser() {
    if (props.view === "requests") {
      SetGivingHelp(!givingHelp);
    }
  }

  return (
    // Code thanks to https://codepen.io/egoistdeveloper/pen/xxYrmgd
    <div className="mx-8 my-10 ">
      <div className="flex flex-col md:ml-12 lg:ml-0 md:flex-row items-center justify-center">
        
        <div className="md:w-[400px] md:h-[400px] w-44 h-44 relative">
          <img
            className="object-cover rounded-full relative z-20 md:rounded-xl shadow-lg shadow-[#ff994091] w-full h-full"
            src={
              props.view === "requests"
                ? props.booking.requestor.profilePicture
                : providerData.photo
            }
            alt="User"
          />

        </div>
    
        <div className="block h:[390px] md:h-[380px] mb-16 md:mb-0 md:py-6 py-10 w-full relative -mt-9 md:mt-0 z-10 shadow-lg shadow-[#ff994091] bg-white rounded-xl md:rounded-r-xl -z-1 md:flex md:flex-row lg:mx-auto lg:w-4/5 ">
          <div className="flex flex-col w-full px-6">
            <div className="flex flex-row h-14">
              <h2 className="mb-1 text-2xl font-semibold title-font text-[#361201]">
                {props.booking.servicePost.serviceTitle}
              </h2>
            </div>

            <div className="flex flex-row my-2 mt-4 md:mt-0 space-x-2">
              <div className="flex flex-row">
                <svg
                  className="w-4 h-6 mr-2 fill-[#fe8923]"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                </svg>

                <div className="text-s text-[#fe8923] ">
                  {props.view === "requests"
                    ? props.booking.requestor.firstName
                    : providerData.first_name}
                </div>
              </div>

              <div className="flex flex-row">
                <svg
                  className="w-4 h-6 mr-2 fill-[#fe8923]"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
                </svg>

                <div className="text-s text-[#fe8923] ">
                  {props.view === "requests"
                    ? props.booking.requestor.cityName
                    : providerData.city_name}
                </div>
              </div>
            </div>
            <div
              className={`w-full p-5 mt-5 space-y-3 text-left rounded-lg overflow-y-auto h-32 ${
                props.view === "bookings" ? "bg-gradient-to-b from-[#fff7a382] to-[#ff994021]" : "bg-gradient-to-t from-[#fff7a382] to-[#ff994021]"
              }`}
            >
              <p className="leading-relaxed text-[#fe8923] ">
                {props.view === "bookings"
                  ? 'You: "'
                  : `${props.booking.requestor.firstName}: "`}
                {props.booking.bookingDescription}"
              </p>
            </div>
            <div
              className={`w-full p-5 mt-5 py-1 text-left rounded-lg justify ${
                props.view === "bookings" ? "bg-gradient-to-l from-[#fff7a382] to-[#ff994021]" : "bg-gradient-to-r from-[#fff7a382] to-[#ff994021]"
              }`}
            >
              <p className="leading-relaxed text-[#fe8923] ">
                {new Date(props.booking.proposedDate).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <div className="flex items-center justify-center flex-grow w-full col-span-2 pt-6 mt-4 lg:pt-0 w-100">
              {props.view === "requests" &&
              props.booking.bookingStatus === "pending" ? (
                <div className="flex flex-col md:flex-row gap-4 md:gap-2 lg:mt-4 items-center">
                  <div className="flex gap-6 md:gap-2">
                  <button
                    type="button"
                    onClick={(e) =>
                      reactToRequestCb(props.booking.bookingId, "accepted")
                    }
                    className="hover:bg-[#a6c120] bg-[#70840def] hover:shadow-[#fe8923] hover:shadow-md px-5 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Accept
                  </button>
                  <button
                    type="submit"
                    onClick={(e) =>
                      reactToRequestCb(props.booking.bookingId, "declined")
                    }
                    className="hover:bg-red-500 bg-red-400 hover:shadow-[#fe8923] hover:shadow-md px-5 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Decline{" "}
                  </button>{" "}
                  </div>
                  <button
                    type="button"
                    onClick={(e) =>
                      openChatCb(props.booking.bookingId, givingHelp)
                    }
                    className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-[#fe8923] hover:shadow-md w-full md:px-8 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Chat{" "}
                  </button>
                </div>
              ) : (
                <div className="flex flex-row space-x-3">
                  <button
                    type="submit"
                    onClick={(e) =>
                      reactToRequestCb(props.booking.bookingId, "declined")
                    }
                    className="hover:bg-red-500 bg-red-400 hover:shadow-[#fe8923] hover:shadow-md px-5 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Cancel{" "}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={(e) => openChatCb(props.booking.bookingId)}
                    className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-[#fe8923] hover:shadow-md w-full md:px-8 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Chat{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
