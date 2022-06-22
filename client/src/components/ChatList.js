import React, { useEffect, useRef, useState } from 'react';
import './ChatList.css';

function ChatList(props) {
  let listDiv = useRef(null);
  let [myBooking, setMyBooking] = useState(props.bookings);
  // let [provider, setProvider] =useState(null);

  console.log(myBooking)

  function getMyBooking() {
    let filteredBooking = props.bookings.filter(
      (e) => e.bookingId === Number(props.bookingId)
    );
    setMyBooking(filteredBooking[0]);
  }

  // function providerUser(){
  //   let provider = props.user.filter((e) => { e.id === myBooking.servicePost.serviceProvider})
  //   setProvider(provider)
  // }

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
        {/* {myBooking.servicePost.serviceTitle} */}
        {/* do a filter inside users to find the one that match with the code below and ask for his/her first_name and his/her  photo */}
        {/* {myBooking.requestor.firstName} */}
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
