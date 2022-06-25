import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../AppContext';
import OfferCard from './OfferCard';
import { Link } from 'react-router-dom';

export default function OfferGrid() {
  let { offers, user, categories, choseCatCb, resetFilteredOffersCb, userWallet } =
    useContext(AppContext);

  const [chosenCat, setChosenCat] = useState("default");

  let photoUrl = 'http://localhost:5000/clientfiles'

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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inline space-x-3">
          <select
            require="true"
            className="w-1/3 p-4 mx-auto my-8 overflow-hidden transition duration-200 ease-in bg-white border-2 border-solid rounded-lg text-amber-500 focus:outline-none focus:border-amber-500 text-md border-amber-200"
            id="select_category"
            onChange={(e) => handleInputChange(e)}
            value={chosenCat}
            defaultValue={'default'}
          >
            <option
              className="p-4 hover:bg-amber-100 text-md "
              disabled
              value={'default'}
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
            disabled = {chosenCat === "default" ? true : false}
            className="px-4 py-2 font-semibold bg-transparent border rounded disabled:transform-none disabled:transition-none disabled:cursor-not-allowed hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
          >
            Filter
          </button>
          <button
            onClick={resetFilteredOffersCb}
            className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      <div
        className="container px-3 mx-auto space-x-6 md:block lg:flex"
        id="offers"
      >
        <div className="flex flex-wrap items-stretch w-full -m-4 ">
          {offers.map((o) => (
            <OfferCard key={o.postID} offer={o} view={'offers'} />
          ))}
        </div>
        {user && (
          <div
            className={`${
              user ? 'lg:block ' : 'hidden'
            } pb-6 w-full mt-10 lg:mt-0 lg:w-1/5 xl:w-1/4 h-1/2 bg-white shadow-lg shadow-amber-400 border-amber-200 border-2  rounded-lg`}
          >
            <div className="mx-4 my-6">
              <img
                className="object-cover border-2 rounded-full border-amber-400"
                src={user.uploadedPhoto? `${photoUrl}/${user.uploadedPhoto}` : user.photo}
                alt="avatar"
              />
            </div>
            <h1 className="px-2 my-2 text-2xl font-medium title-font text-amber-900">
              Hello {user.first_name}!
            </h1>
            <p className={`my-2 leading-relaxed  ${userWallet < 1 ? "text-red-700 font-semibold hover:text-xl animate-pulse" : "text-amber-500"}`}>Wallet: {userWallet} h</p>
            <Link
              to={`/profile/${user.id}`}
              className="leading-relaxed underline text-amber-400"
            >
              My Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
