import React, { useEffect, useRef, useState, useContext } from "react";
import AppContext from "../AppContext";
import "./ChatList.css";

function ChatList(props) {
  // let {requests, bookings} = useContext(AppContext);
  let listDiv = useRef(null);
  let [myBooking, setMyBooking] = useState(props.bookings[0]);
  let photoUrl = 'http://localhost:5000/clientfiles';

  function getMyBooking() {
    let filteredBooking = props.bookings.filter(
      (e) => e.bookingId === Number(props.bookingId)
    );
    setMyBooking(filteredBooking[0]);
  }

  // When new msg is added, scroll if necessary so it's visible
  useEffect(() => {
    let lastPara = listDiv.current.lastElementChild;
    getMyBooking();
    if (lastPara) {
      lastPara.scrollIntoView(false);
    }
  }, [props.messages]);

  function formatDT(dt) {
    return new Date(dt).toLocaleString();
  }

  return (
    <div className="mt-2 mb-1 rounded ChatList" ref={listDiv}>
      <div className="flex flex-col items-center justify-center">
        <h2 className="md:text-3xl text-lg xl:mt-0 md:mt-0 mt-4 text-white bg-[#ff994023] shadow-[#ff994091] px-2 shadow-lg font-bold ">
          {myBooking.servicePost.serviceTitle}
        </h2>
        <div className="items-center justify-center">
          <div className="flex justify-center gap-8 mt-8 mb-6 md:gap-20">
            <div className="flex flex-col items-center">
              <h4 className="text-[#FF9940] md:text-xl font-semibold">
                Receiving Help:
              </h4>
              <h3 className="md:text-2xl text-xl text-[#361201] font-bold">
                {myBooking.requestor.firstName}
              </h3>
              <div className="mt-2 h-28 w-28">
                <img
                  src={myBooking.requestor.requestorProfilePicture
                    ? `${photoUrl}/${myBooking.requestor.requestorProfilePicture}`
                    : myBooking.requestor.requestorAvatar}
                  className="h-full w-full object-cover rounded-full border-2 border-[#FFE500] shadow-md shadow-[#ffe60099]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="text-[#FF9940] md:text-xl font-semibold">
                Giving Help:
              </h4>
              <h3 className="md:text-2xl text-xl text-[#361201] font-bold">
                {myBooking.servicePost.provider.firstName}
              </h3>
              <div className="mt-2 h-28 w-28">
                <img
                  src={myBooking.servicePost.provider.providerProfilePicture
                    ? `${photoUrl}/${myBooking.servicePost.provider.providerProfilePicture}` 
                    : myBooking.servicePost.provider.providerAvatar}
                  className="h-full w-full object-cover rounded-full shadow-md border-2 border-[#C8E242] shadow-[#C8E242]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a
              href="#input"
              className="xl:text-5xl text-3xl mt-8 xl:mt-0 font-bold animate-bounce hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] md:hidden xl:inline rounded-full
       align-middle"
            >
              v
            </a>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[420px] min-h-fit mb-10 ">
        {props.messages.map((m, index) => (
          <div key={index} className="flex justify-center mt-10 mb-10 md:mt-10 md:mb-20">
            <div>
              {m.senderName === myBooking.requestor.firstName ? (
                <div className="flex items-center gap-4 xl:-ml-44 xl:gap-8">
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={myBooking.requestor.requestorProfilePicture
                          ? `${photoUrl}/${myBooking.requestor.requestorProfilePicture}` 
                          : myBooking.requestor.requestorAvatar}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <b className="text-[#FF9940] text-start ml-2">
                      {m.senderName}:{" "}
                    </b>
                    <span
                      className="bg-[#ffe60099] py-2 px-2 xl:px-10 w-[250px] xl:w-[800px] md:w-[500px] rounded-xl xl:rounded-full xl:max-w-2xl text-[#361201] text-lg"
                      title={formatDT(m.dateTime)}
                    >
                      {m.text}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row-reverse items-center gap-4 xl:ml-44 xl:gap-8">
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={myBooking.servicePost.provider.providerProfilePicture 
                        ? `${photoUrl}/${myBooking.servicePost.provider.providerProfilePicture}` 
                        : myBooking.servicePost.provider.providerAvatar}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <b className="text-[#FF9940] text-end mr-2">
                      {m.senderName}:{" "}
                    </b>
                    <span
                      className="bg-[#c7e2429c] py-2 xl:max-w-2xl w-[250px] xl:w-[800px] md:w-[500px] px-2 xl:px-10 rounded-xl xl:rounded-full text-[#361201] text-lg"
                      title={formatDT(m.dateTime)}
                    >
                      {m.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
