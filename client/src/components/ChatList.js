import React, { useEffect, useRef } from 'react';
import './ChatList.css';


function ChatList(props) {
    let listDiv = useRef(null);

    // When new msg is added, scroll if necessary so it's visible
    useEffect(() => {
        let lastPara = listDiv.current.lastElementChild;
        if (lastPara) {
            lastPara.scrollIntoView(false);
        }
    }, [props.messages]);

    function formatDT(dt) {
        return new Date(dt).toLocaleString();
    }

    return (
        <div className="mb-1 rounded ChatList" ref={listDiv}>
        {
            props.messages.map((m, index) => (
                <div key={index}>
                <p>
                    <b>{m.senderName}: </b><span title={formatDT(m.dateTime)}>{m.text}</span>
                </p>
                </div>
            ))
        }
        </div>
    );
}

export default ChatList;