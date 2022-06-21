import React, { useState, useEffect } from "react";
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";

export default function ChatView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      ChatView
      <Chat senderName="Juan" bookingId="1" />
      <Chat senderName="karen" bookingId="2" />
    </div>
  );
}
