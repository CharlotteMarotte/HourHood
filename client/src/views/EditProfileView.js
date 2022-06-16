import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function EditProfileView() {
  let { user, offers } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    // Call callback we got from AppContext
    // requestServiceCb();
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="min-w-screen min-h-scree flex py-16 px-16">
      <div className="bg-amber-100 text-amber-500 rounded-xl w-full overflow-hidden border-solid border-2 border-amber-200">
        <div className="md:flex w-full">
          <div className="hidden md:block bg-white md:w-3/7 lg:w-2/5 py-5 px-5 object-cover border-solid border-r-2 border-amber-00">
            <img
              className="rounded-xl"
              src="https://cdn.dribbble.com/users/5352839/screenshots/11892562/character.png"
            />
            <button
              type="button"
              className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
            >
              Upload new photo{' '}
            </button>{' '}
          </div>
          <div className="w-full md:w-4/7 lg:w-3/5 py-20 px-5 md:px-10">
            <header className="text-center mb-10">
              <h1 className="font-bold text-4xl text-amber-900">
                Edit your profile{' '}
              </h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="w-full xl:flex :lg-flex-col-1 space-x-2">
                  <div className="w-1/2 mb-5">
                    <label
                      htmlFor="firstname-input"
                      className="text-xs font-semibold px-1"
                    >
                      First Name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                      <input
                        required
                        id="firstname-input"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                        placeholder="Jordi"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 mb-5">
                    <label
                      htmlFor="firstname-input"
                      className="text-xs font-semibold px-1"
                    >
                      Last Name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                      <input
                        required
                        id="firstname-input"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                        placeholder="Garcia"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full xl:flex :lg-flex-col-1 space-x-2">
                  <div className="w-1/2 mb-5">
                    <label
                      htmlFor="street-input"
                      className="text-xs font-semibold px-1"
                    >
                      Street + Number
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                      <input
                        required
                        id="street-input"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                        placeholder="Carrer de Grassot 101"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 mb-5">
                    <label
                      htmlFor="housenumber-input"
                      className="text-xs font-semibold px-1"
                    >
                      Housenumber
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                      <input
                        required
                        id="housenumber-input"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                        placeholder="1-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="hobbies-input"
                      className="text-semibold px-1"
                    >
                      Hobbies
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                      <input
                        id="hobbies-input"
                        placeholder="Using Hour Hood"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="superpower-input"
                      className="text-semibold px-1"
                    >
                      My superpower is...
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                      <input
                        id="superpower-input"
                        placeholder="Being part of a loving community"
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="message-input"
                      className="text-semibold px-1"
                    >
                      Description
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                      <textarea
                        id="message-input"
                        placeholder="Write a short introduction about yourself!"
                        rows="3"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center flex-wrap space-x-2 lg:space-y-0">
                <Link
                  to={'/profile'}
                  className="bg-transparent hover:bg-lime-600 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  Save{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
