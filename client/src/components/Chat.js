import React, { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
// import axios from 'axios';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

function Chat(props){
    const [messages, setMessages] = useState([]);
    const pusherRef = useRef(null);
    const socketIdRef = useRef(null);

     //That useEffect will called when Chat component is mounted. It creates the conection with the pusher.
    useEffect(() => {
        pusherRef.logToConsole = true;
        let pusherKey = process.env.REACT_APP_PUSHER_KEY;
        let options = { cluster:"eu", forceTLS: true};
        pusherRef.current.connection.bind('connected', () => {
            socketIdRef.current = pusherRef.current.connection.socket_id;
        });
        //We want to make sure when our program is stop running, it's totally disconnected 
        return () =>{
            pusherRef.current.disconnect();
        }
    }, [])

    //That one has dependencies: when the users change, the chat has to be closed and create a new channel to new users.
    useEffect(() => {
        if (props.senderId === props.receiverId) {
            return;
        }

        let ids = [props.senderId, props.receiverId].sort();
        let channelName = 'channel-' + ids.join('-');

        let channel = pusherRef.current.subscribe(channelName);
        channel.bind('message', function (msg){
            setMessages(messages => [...messages, msg]);
        });

        return () => {
            pusherRef.current.unsubscribe(channelName);
        }
    }, [props.senderId, props.receiverId]);
 
    async function sendMessage(text){
        // POST user-entered text to server as message async function sendMessage(text)
        try{ 
            let body = { text, socketId: socketIdRef.current };
            let response = await axios.post(`/chat/${props.senderId}/${props.receiverId}`, body);
 
            let completeMsg = response.data;
            setMessages (messages => [...messages, completeMsg]);
        } catch (err) {
            if(err.response) {
                let r = err.response
                console.log(`Server error: ${r.status} ${r.statusText}`);
            } else{
                console.log(`Network error: ${err.message}`)
            }
        }
    }
    
    return(
        <div>
        <ChatList messages = {messages} senderId = {props.senderId}/>
        <ChatInput sendCb = { text => sendMessage(text)}/>
        </div>
        
    );


}
export default Chat;