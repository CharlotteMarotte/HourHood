import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

export default function RequestServiceView() {
  let { offer, requestServiceCb } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    // Call callback we got from AppContext
    requestServiceCb();
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="min-w-screen min-h-scree flex py-16 px-16">
      <div className="bg-amber-100 text-amber-500 rounded-xl w-full overflow-hidden border-solid border-2 border-amber-200">
        <div className="md:flex w-full">
          <div className="hidden md:block bg-white md:w-4/7 lg:w-3/5 py-5 px-5 object-cover border-solid border-r-2 border-amber-00">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/originals/01/1b/24/011b24f9cb707b842aeb862ef9d54e5a.gif"
            />
          </div>
          <div className="w-full md:w-3/7 lg:w-2/5 py-20 px-5 md:px-10">
            <header className="text-center mb-10">
              <h1 className="font-bold text-4xl text-amber-900">
                Request a service
              </h1>
              <p className="font-bold text-2xl text-amber-600">{offer.title}</p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="xl:flex :lg-flex-col-1 space-x-2">
                <div className="w-full mb-5">
                  <label
                    htmlFor="time-needed-input"
                    className="text-xs font-semibold px-1"
                  >
                    Time needed (in h)
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center">
                    </div>
                    <input
                      required
                      id="time-needed-input"
                      type="number"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                      placeholder="1"
                    />
                  </div>
                </div>
                <div className="w-full mb-5">
                  <label
                    htmlFor="proposed-date-input"
                    className="text-xs font-semibold px-1"
                  >
                    Proposed Date
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 text-center poniter-events-none flex items-center justify-center">
                    </div>
                    <input
                      required
                      id="proposed-date-input"
                      type="date"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="message-input" className="text-semibold px-1">
                    Message
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    </div>
                    <textarea
                      id="message-input"
                      rows="3"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-amber-200 outline-none focus:border-lime-700"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 space-x-3 mb-5">
                  <input
                    type="checkbox"
                    id="donation"
                    className="bg-lime-700 hover:bg-lime-700 focus:bg-lime-700"
                  />
                  <label htmlFor="donation">I need a donation</label>
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
                  Request{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
