import React, { useState } from "react";

function ChatInput(props) {
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.sendCb(text);
    setText("");
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-10 gap-8 mx-12 justify-center items-center rounded-full bg-white h-20 shadow-lg shadow-[#ff994091]">
          <button
            type="submit"
            className="sm:text-3xl md:text-5xl text-2xl font-bold hover:bg-[#361201] bg-[#957e4e] text-[#FFF701] py-[6px] px-[16px] xl:py-[6px] xl:px-[16px] md:py-5 md:px-8 rounded-full align-middle ml-4"
          >
            
          </button>
          <input
            type="text"
            className="w-10/12 px-4 py-4 bg-white form-control rounded-3xl"
            name="text"
            value={text}
            onChange={handleChange}
          />
          <div className="w-28 h-28">
            <img
              src={props.user.photo}
              className="object-cover h-full w-full rounded-full shadow-[#ff994091] shadow-lg"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
