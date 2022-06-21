import React, { useState, useEffect } from "react";
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";

export default function ChatView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center my-10 gap-8">
        <h1>ChatView</h1>
        <div className="w-44 h-44">
          <img
            src={props.user.photo}
            className="object-cover h-full w-full rounded-full"
          />
        </div>
      </div>
      <div>
      <Chat
        senderName={props.user ? props.user.first_name : "no one"}
        bookings={props.bookings}
        bookingId="1"
      />
      </div>
    </div>
  );
}
