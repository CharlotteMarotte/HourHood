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
        <div className="flex gap-8 mx-8 justify-center">
          <button type="submit" className="bg-[#FF9940] hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-8 py-2 text-lg uppercase text-white font-bold rounded-xl md:mt-10 2xl:my-14 mt-8">
            Send
          </button>
          <textarea
            type="text"
            className="form-control w-10/12"
            name="text"
            value={text}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
