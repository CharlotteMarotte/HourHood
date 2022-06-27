import React, { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import OfferCard from "./OfferCard";
import { Link } from "react-router-dom";

export default function OfferGrid() {
  let {
    offers,
    user,
    categories,
    choseCatCb,
    resetFilteredOffersCb,
    userWallet,
  } = useContext(AppContext);

  

  const [chosenCat, setChosenCat] = useState("default");

  let photoUrl = "http://localhost:5000/clientfiles";

  function handleSubmit(event) {
    event.preventDefault();

    choseCatCb(chosenCat);
    setChosenCat("default");
  }

  const handleInputChange = (event) => {
    // gets pressed after each key change
    setChosenCat(event.target.value); // updates key [name] with new value
  };

  return (
    // Code thanks to https://codepen.io/asdasdadddddddddd/pen/ExXjdPM
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="inline space-x-3">
          <select
            require="true"
            className="w-1/3 p-4 mx-auto my-8 overflow-hidden transition duration-200 ease-in bg-white border-2 border-solid rounded-lg text-amber-500 focus:outline-none focus:border-amber-500 text-md border-amber-200"
            id="select_category"
            onChange={(e) => handleInputChange(e)}
            value={chosenCat}
          >
            <option
              className="p-4 hover:bg-amber-100 text-md "
              disabled
              value={"default"}
            >
              -- Choose a category --
            </option>

            {categories &&
              categories.map((e) => (
                <option
                  key={e.id}
                  className="p-4 hover:bg-amber-100 text-md"
                  value={e.id}
                >
                  {e.category_title}
                </option>
              ))}
          </select>

          <button
            type="submit"
            disabled={chosenCat === "default" ? true : false}
            className="md:px-6 px-4 py-2 text-xs md:text-base font-semibold uppercase rounded-xl hover:bg-[#a6c120] bg-[#70840def] hover:shadow-white hover:shadow-md text-white"
          >
            Filter
          </button>
          <button
            onClick={resetFilteredOffersCb}
            className="md:px-6 px-4 py-2 font-semibold text-xs md:text-base rounded-lg uppercase bg-[#ff9940e3]  hover:shadow-md hover:shadow-white text-white hover:bg-[#fe8923]  hover:text-white "
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      <div
        className="container px-3 mx-4 md:mx-auto md:space-x-6 md:block lg:flex"
        id="offers"
      >
        <div className="flex flex-wrap items-stretch w-full -m-4 ">
          {offers.map((o) => (
            <OfferCard key={o.postID} offer={o} view={"offers"} />
          ))}
        </div>
        {user && (
          <div
            className={`${
              user ? "lg:block " : "hidden"
            } pb-6 w-80 mt-10 relative md:left-44 lg:left-0 lg:mt-0 lg:w-1/5 xl:w-1/4 max-h-[360px] bg-white shadow-lg shadow-[#ff9940e3] rounded-xl`}
          >
            <div className=" flex justify-center">
              <div className="mx-4 my-6 w-44 h-44">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    user.uploadedPhoto
                      ? `${photoUrl}/${user.uploadedPhoto}`
                      : user.photo
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <h1 className="px-2 my-2 text-2xl font-medium title-font text-[#361201]">
              Hello {user.first_name}!
            </h1>
            <p
              className={`my-2 leading-relaxed  ${
                userWallet < 1
                  ? "text-red-700 font-semibold hover:text-xl animate-pulse"
                  : "text-[#ff9940e3]"
              }`}
            >
              Wallet: {userWallet} h
            </p>
            <Link
              to={`/profile/${user.id}`}
              className="leading-relaxed font-bold hover:text-[#a6c120] hover:text-lg text-[#70840def]"
            >
              My Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
