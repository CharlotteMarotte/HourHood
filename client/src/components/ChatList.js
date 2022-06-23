import React, { useEffect, useRef, useState, useContext } from "react";
import AppContext from "../AppContext";
import "./ChatList.css";

function ChatList(props) {
  // let {requests, bookings} = useContext(AppContext);
  let listDiv = useRef(null);
  let [myBooking, setMyBooking] = useState(props.bookings[0]);

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
    <div
      className="mb-1 rounded ChatList mt-2"
      ref={listDiv}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="md:text-3xl text-lg xl:mt-0 mt-4 text-[#361201] font-bold uppercase">
          {myBooking.servicePost.serviceTitle}
        </h2>
        <div className="items-center justify-center">
          <div className="flex justify-center gap-8 md:gap-20 mt-8 mb-6">
            <div className="flex flex-col items-center">
              <h4 className="text-[#FF9940] md:text-xl font-semibold">
                Receiving Help:
              </h4>
              <h3 className="md:text-2xl text-xl text-[#361201] font-bold">
                {myBooking.requestor.firstName}
              </h3>
              <div className="h-28 w-28 mt-2">
                <img
                  src={myBooking.requestor.profilePicture}
                  className="h-full w-full object-cover rounded-full shadow-lg shadow-[#fff701]"
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
              <div className="h-28 w-28 mt-2">
                <img
                  src={myBooking.servicePost.provider.providerProfilePicture}
                  className="h-full w-full object-cover rounded-full shadow-lg shadow-[#c8e242]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <a
              href="#input"
              className="xl:text-5xl text-3xl mt-8 xl:mt-0font-bold animate-bounce hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] md:hidden xl:inline rounded-full
       align-middle"
            >
              v
            </a>
          </div>
        </div>
      </div>

      {props.messages.map((m, index) => (
        <div key={index} className="mt-10 mb-20 flex justify-center">
          <p>
            
            {m.senderName === myBooking.requestor.firstName ? (
              <div className="flex items-center -ml-44 gap-8">
                <div className="w-20 h-20">
                  <img
                    src={myBooking.requestor.profilePicture}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <b className="text-[#FF9940] text-start ml-2">{m.senderName}: </b>
                  <span className="bg-[#ffe60099] py-2 min-w-fit px-10 rounded-full max-w-2xl text-[#361201] text-lg" title={formatDT(m.dateTime)}>
                    {m.text}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-row-reverse ml-44 items-center gap-8">
                <div className="w-20 h-20">
                  <img
                    src={myBooking.servicePost.provider.providerProfilePicture}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                <b className="text-[#FF9940] text-end mr-2">{m.senderName}: </b>
                <span className="bg-[#c7e2429c] py-2 min-w-fit max-w-2xl px-10 rounded-full text-[#361201] txt-lg" title={formatDT(m.dateTime)}>
                  {m.text}
                </span>
                </div>
              </div>
            )}
            {/* <b>{m.senderName}: </b> */}
            {/* <span title={formatDT(m.dateTime)}>{m.text}</span> */}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
