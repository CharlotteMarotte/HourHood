import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function EditProfileView(props) {
  let { user, offers } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    // Call callback we got from AppContext
    // requestServiceCb();
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="flex px-16 py-16 min-w-screen min-h-scree">
      <div className="w-full overflow-hidden border-2 border-solid bg-amber-100 text-amber-500 rounded-xl border-amber-200">
        <div className="w-full lg:flex">
          <div className="object-cover px-5 py-5 bg-white border-r-2 border-solid md:block md:w-3/7 lg:w-2/5 border-amber-00">
            <img
              className="rounded-xl"
              src="https://cdn.dribbble.com/users/5352839/screenshots/11892562/character.png"
            />
            <button
              type="button"
              className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
            >
              Upload a new photo{' '}
            </button>{' '}
          </div>
          <div className="w-full px-5 py-20 md:w-4/7 lg:w-3/5 md:px-10">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-amber-900">
                Edit your profile{' '}
              </h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="w-full xl:flex :lg-flex-col-1 xl:space-x-4">
                  <div className="w-full mb-5 xl:w-1/2">
                    <label
                      htmlFor="firstname-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      First Name
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        required
                        id="firstname-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Jordi"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-5 xl:w-1/2">
                    <label
                      htmlFor="firstname-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      Last Name
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        required
                        id="firstname-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Garcia"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full xl:flex :lg-flex-col-1 xl:space-x-4">
                  <div className="w-full mb-5 xl:w-1/2">
                    <label
                      htmlFor="street-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      Street + Number
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        required
                        id="street-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Carrer de Grassot 101"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-5 xl:w-1/2">
                    <label
                      htmlFor="housenumber-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      Housenumber
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        required
                        id="housenumber-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="1-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full xl:flex xl:space-x-2">
                  <div className="w-full xl:w-1/3">
                    <div className="block">
                      <div className="flex items-center justify-center w-full text-center pointer-events-none"></div>
                      <label
                        for="select_category"
                        className="flex items-center justify-center w-full text-center pointer-events-none"
                      >
                        Postal Code{' '}
                      </label>
                      <div className="relative">
                        <select
                          require
                          className="p-2.5 mb-0 min-w-full rounded-lg bg-white focus:outline-none focus:border-amber-500 text-md border-solid border-2 border-amber-200 transition ease-in duration-200"
                          name="category"
                          id="select_category"
                        >
                          <option
                            disabled
                            selected
                            className="p-2 hover:bg-amber-100 text-md "
                          >
                            -- Select a postal code --
                          </option>
                          {props.postalCodes.map((postalCode, index) => (
                            <option key={index} className="p-4 hover:bg-amber-100 text-md">
                              {postalCode}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-5 xl:w-1/3">
                    <label
                      htmlFor="city-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      City
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        readOnly
                        id="city-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Barcelona"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-5 xl:w-1/3">
                    <label
                      htmlFor="country-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      Country
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        readOnly
                        id="country-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Spain"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="hobbies-input"
                      className="px-1 text-semibold"
                    >
                      Hobbies
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"></div>
                      <input
                        id="hobbies-input"
                        placeholder="Using Hour Hood"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="superpower-input"
                      className="px-1 text-semibold"
                    >
                      My superpower is...
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"></div>
                      <input
                        id="superpower-input"
                        placeholder="Being part of a loving community"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="message-input"
                      className="px-1 text-semibold"
                    >
                      Description
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"></div>
                      <textarea
                        id="message-input"
                        placeholder="Write a short introduction about yourself!"
                        rows="3"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center space-x-2">
                <Link
                  to={'/profile'}
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
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
