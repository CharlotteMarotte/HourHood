import React, { useState, useEffect, useContext } from "react";
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";
import chatImage from "../img/chat.png";
import AppContext from "../AppContext";

export default function ChatView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { bookingId } = useContext(AppContext);
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="">
          <div className="">
            <img src={chatImage} className="xl:h-52 h-40 left-10 sm:h-52 sm:left-1/4 xl:left-1/4 relative" />
          </div>
          <div className="flex flex-col relative md:gap-2 -top-6 md:-top-10">
            <h1 className="md:text-4xl text-lg text-[#FF9940]">
              {" "}
              <span className="md:text-5xl text-2xl text-[#361201] font-bold xl:bg-[#ffe60099]">Chat </span>
                with your neighbours
            </h1>
            <h1 className="md:text-4xl text-lg text-[#FF9940]">
              About the{" "}
              <span className="md:text-5xl text-2xl text-[#361201] font-bold xl:bg-[#c7e2429c]">details</span>
            </h1>
          </div>
        </div>
      </div>
      <div>
        <Chat
          senderName={props.user ? props.user.first_name : "no one"}
          bookings={props.bookings}
          givingHelp={true}
          user={props.user}
          bookingId={bookingId}
        />
      </div>
    </div>
  );
}
