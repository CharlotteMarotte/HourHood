import React, { useEffect, useRef, useState, useContext } from 'react';
import AppContext from '../AppContext';
import './ChatList.css';

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
    <div className="mb-1 rounded ChatList" ref={listDiv}>
        {myBooking.servicePost.serviceTitle}

       <h1>Receiving Help:{myBooking.requestor.firstName}</h1> 
       <img src={myBooking.requestor.profilePicture} className="h-44"/>

       <h1>Giving Help:{myBooking.servicePost.provider.firstName}</h1>
        <img src={myBooking.servicePost.provider.providerProfilePicture} className="h-44"/>

        
    
      {props.messages.map((m, index) => (
        <div key={index}>
          <p>
          { m.senderName === myBooking.requestor.firstName? (<div className="w-20 h-20"><img src={myBooking.requestor.profilePicture} className="h-full w-full object-cover rounded-full"/></div>): (<div className="w-20 h-20"><img src={myBooking.servicePost.provider.providerProfilePicture} className="h-full w-full object-cover rounded-full"/></div>)}
            <b>{m.senderName}: </b>
            <span title={formatDT(m.dateTime)}>{m.text}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
