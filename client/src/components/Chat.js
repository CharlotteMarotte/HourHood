import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);

  //That useEffect will called when Chat component is mounted. It creates the conection with the pusher.
  useEffect(() => {
    pusherRef.logToConsole = true;
    let pusherKey = "743d776d890cdc65b073";
    let options = { cluster: "eu", forceTLS: true };

    pusherRef.current = new Pusher(pusherKey, options);

    pusherRef.current.connection.bind("connected", () => {
      socketIdRef.current = pusherRef.current.connection.socket_id;
    });
    //We want to make sure when our program is stop running, it's totally disconnected
    return () => {
      pusherRef.current.disconnect();
    };
  }, []);

  //That one has dependencies: when the users change, the chat has to be closed and create a new channel to new users.
  useEffect(() => {
    let channelName = "channel-" + props.bookingId;

    let channel = pusherRef.current.subscribe(channelName);
    channel.bind("message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      pusherRef.current.unsubscribe(channelName);
    };
  }, [props.bookingId]);

  useEffect(() => {
    // Call whenever participants change
    getRecentMessages();
  }, [props.bookingId]);

  async function getRecentMessages() {
    try {
      let response = await axios.get(`/chat/${props.bookingId}`);
      setMessages(response.data);
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  async function sendMessage(text) {
    // POST user-entered text to server as message async function sendMessage(text)
    try {
      let body = {
        text,
        senderName: props.senderName,
        socketId: socketIdRef.current,
      };
      let response = await axios.post(`/chat/${props.bookingId}`, body);

      let completeMsg = response.data;
      setMessages((messages) => [...messages, completeMsg]);
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  return (
    <div>
        <h1>{props.user.first_name}</h1>
      <ChatList messages={messages} bookings={props.bookings} bookingId={props.bookingId}/>
      <ChatInput user={props.user} sendCb={(text) => sendMessage(text)} />
    </div>
  );
}
export default Chat;
