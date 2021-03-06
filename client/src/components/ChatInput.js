import React, { useState } from "react";
import { useLayoutEffect } from 'react';

function ChatInput(props) {
  const [text, setText] = useState("");
  let photoUrl = 'http://localhost:5000/clientfiles';



  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.sendCb(text);
    setText("");
  }

  return (
    <div id="input">
      <form onSubmit={handleSubmit}>
        <div className="flex  gap-2 xl:gap-8 mb-0 md:mb-2 xl:mx-12 mx-3 md:mx-6 justify-center items-center rounded-full bg-white md:h-20 h-16 shadow-lg shadow-[#ff994091]">
          <button
            type="submit"
            className="sm:text-3xl md:text-5xl text-2xl font-bold hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] xl:py-[6px] xl:px-[16px] md:py-2 md:px-4 rounded-full align-middle ml-4"
          > 
          &#62;
          </button>
          <input
            type="text"

            className="form-control xl:w-10/12 md:w-8/12 md:mx-4 md:mr-8 focus:border-white px-4 md:py-4 py-2 rounded-3xl bg-white"
            name="text"
            value={text}
            onChange={handleChange}
          />
          <div className="md:w-28 w-16 h-16 md:h-28">
            <img
              src={props.user.uploadedPhoto
                  ? `${photoUrl}/${props.user.uploadedPhoto}` 
                  : props.user.photo}
              className="object-cover h-full w-full rounded-full shadow-[#ff994091] shadow-lg"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
