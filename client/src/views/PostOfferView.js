import React from 'react';
import { Link } from 'react-router-dom';

export default function PostOfferView() {
  function handleSubmit(event) {
    event.preventDefault();
    // Call callback we got from CatContext
    // requestServiceCb();
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="min-w-screen min-h-scree flex py-16 px-16">
      <div className="bg-amber-100 text-amber-500 rounded-xl w-full overflow-hidden border-solid border-2 border-amber-200">
        <div className="md:flex w-full">
          <div className="hidden md:block bg-white md:w-4/7 lg:w-3/5 py-5 px-5 object-cover border-solid border-r-2 border-amber-00">
            <img
              className="rounded-xl"
              src="https://img.graphicsurf.com/2020/08/volunteers-vector-flat-design.jpg"
            />
          </div>
          <div className="w-full md:w-3/7 lg:w-2/5 py-20 px-5 md:px-10">
            <header className="text-center mb-10">
              <h1 className="font-bold text-4xl text-amber-900">
                Offer a service
              </h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="space-x-2">
                <div className="w-full mb-5">
                  <label
                    htmlFor="title-input"
                    className="text-xs font-semibold px-1"
                  >
                    Title
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                    <input
                      required
                      id="title-input"
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      placeholder="What do you want to offer?"
                    />
                  </div>
                </div>
                <div className="w-1/2 mb-5">
                  <label
                    htmlFor="capacity-input"
                    className="text-xs font-semibold px-1"
                  >
                    Capacity (times/month)
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center"></div>
                    <input
                      required
                      id="capacity-input"
                      type="number"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      placeholder="1"
                    />
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 space-x-3 mb-5">
                    <input
                      type="checkbox"
                      id="donation"
                      className="bg-lime-700 hover:bg-lime-700 focus:bg-lime-700"
                    />
                    <label htmlFor="donation">I accept donations</label>
                  </div>
                </div>
                <div className="w-full mb-5">
                  <label
                    htmlFor="categories"
                    className="text-xs font-semibold px-1"
                  >
                    Select an option
                  </label>
                  <div className="block">
                    <div className="w-full z-10 text-center poniter-events-none flex items-center justify-center"></div>
                    <select
                      id="categories"
                      className="w-full bg-white pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                    >
                      <option selected>Choose a categorie</option>
                      <option value="Children & Pets">Children & Pets</option>
                      <option value="Health & Wellness">
                        Health & Wellness
                      </option>
                      <option value="IT">IT</option>
                      <option value="Hobbies">Hobbies</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="message-input" className="text-semibold px-1">
                    Description
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                    <textarea
                      id="message-input"
                      rows="3"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-center flex-wrap space-x-2 lg:space-y-0">
                <Link
                  to={'/offers'}
                  className="bg-transparent hover:bg-lime-600 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  Publish{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
