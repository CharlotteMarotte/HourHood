import React, { useState, useEffect, useContext} from "react";
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";
import chatImage from "../img/chat.png";
import AppContext from '../AppContext';

export default function ChatView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { bookingId } = useContext(AppContext);
  return (
    <div>
      <div className="flex flex-col items-center my-10">
       
        <h1 className="text-4xl text-[#FF9940]">
          {" "}
          <span className="text-6xl text-[#361201] font-bold">Chat </span>
          with your neighbours
        </h1>
        <h1 className="text-4xl text-[#FF9940]">
          About the{" "}
          <span className="text-6xl text-[#361201] font-bold">details</span>
        </h1>
        <div className="relative">
          <img src={chatImage} className="h-80 top-0" />
        </div>
       
      </div>
      <div>
        <Chat
          senderName={props.user ? props.user.first_name : "no one"}
          bookings={props.bookings}
          user={props.user}
          bookingId={bookingId}
        />
      </div>
    </div>
  );
}
