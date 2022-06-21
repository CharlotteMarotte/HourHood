import React, { useState, useEffect } from 'react';
import Chat from "../components/Chat";
import { useLayoutEffect } from "react";

export default function ChatView(props) {
  return (
    <div>
      ChatView
      <Chat senderName="Juan" bookingId="1" />
      
    </div>
  );
}
