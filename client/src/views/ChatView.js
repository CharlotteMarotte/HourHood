import React, { useState, useEffect } from 'react';
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";

export default function ChatView(props) {

  return (
    <div>
      ChatView
      <Chat senderName={props.user ? props.user.first_name : "no one"} bookings={props.bookings} bookingId="1" />
      
    </div>
  );
}
