import React, { useEffect, useRef, useState } from 'react';
import './ChatList.css';

function ChatList(props) {
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
    <div className="mb-1 rounded ChatList" ref={listDiv}>
        {myBooking.servicePost.serviceTitle}
      {props.messages.map((m, index) => (
        <div key={index}>
          <p>
            <b>{m.senderName}: </b>
            <span title={formatDT(m.dateTime)}>{m.text}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
