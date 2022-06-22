import React, { useContext, useState } from 'react';
import BookingContext from '../BookingContext';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export default function RequestServiceView() {
  let { selectedOffer, user, requestServiceCb, userWallet } =
    useContext(BookingContext);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    getCurrDate();
  }, []);

  const INIT_FORM = {
    booking_description: '',
    proposed_date: '',
    estimated_time: 0,
    booking_status: 'pending',
    fk_requestor_id: user.id,
  };

  const [requestData, setRequestData] = useState(INIT_FORM);
  const [isChecked, setIsChecked] = useState(userWallet < 1 ? true : false);
  const [date, setDate] = useState(null);

  function getCurrDate() {
    let yourDate = new Date();
    yourDate = yourDate.toISOString().split('T')[0];
    setDate(yourDate);
  }

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setRequestData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // Call callback we got from AppContext
    let newRequestData = {
      ...requestData,
      fk_service_post_id: selectedOffer[0].postID,
      need_donation: isChecked,
    };
    requestServiceCb(newRequestData);
    setRequestData(INIT_FORM);
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="flex px-16 py-16 min-w-screen min-h-scree">
      <div className="w-full overflow-hidden border-2 border-solid bg-amber-100 text-amber-500 rounded-xl border-amber-200">
        <div className="w-full md:flex">
          <div className="hidden object-cover px-5 py-5 bg-white border-r-2 border-solid md:block md:w-4/7 lg:w-3/5 border-amber-00">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/originals/01/1b/24/011b24f9cb707b842aeb862ef9d54e5a.gif"
            />
          </div>
          <div className="w-full px-5 py-20 md:w-3/7 lg:w-2/5 md:px-10">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-amber-900">
                Request a service
              </h1>
              <p className="text-2xl font-bold text-amber-600">
                {selectedOffer[0].title}
              </p>
              <p className="w-1/2 p-5 mx-auto text-xl rounded-lg text-amber-600 bg-rose-200">
                Time to spend: {userWallet}h
              </p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="space-x-2 xl:flex :lg-flex-col-1">
                <div className="w-full mb-5">
                  <label
                    htmlFor="time-needed-input"
                    className="px-1 text-xs font-semibold"
                  >
                    Request time (in h)
                  </label>
                  <div className="flex">
                    <div className="z-10 flex items-center justify-center w-10 text-center poniter-events-none"></div>
                    <input
                      required
                      id="time-needed-input"
                      name="estimated_time"
                      value={requestData.estimated_time}
                      max={isChecked ? '100' : userWallet}
                      min="0"
                      onChange={(e) => handleInputChange(e)}
                      type="number"
                      className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                      placeholder="1"
                    />
                  </div>
                </div>
                <div className="w-full mb-5">
                  <label
                    htmlFor="proposed-date-input"
                    className="px-1 text-xs font-semibold"
                  >
                    Proposed Date
                  </label>
                  <div className="flex">
                    <div className="z-10 flex items-center justify-center w-10 text-center poniter-events-none"></div>
                    <input
                      required
                      id="proposed-date-input"
                      name="proposed_date"
                      min={date}
                      value={requestData.proposed_date}
                      onChange={(e) => handleInputChange(e)}
                      type="date"
                      className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="message-input" className="px-1 text-semibold">
                    Message
                  </label>
                  <div className="flex">
                    <div className="z-10 flex items-center justify-center w-10 pl-1 text-center pointer-events-none"></div>
                    <textarea
                      id="message-input"
                      name="booking_description"
                      value={requestData.booking_description}
                      onChange={(e) => handleInputChange(e)}
                      rows="3"
                      className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5 space-x-3">
                  <input
                    type="checkbox"
                    name="need_donation"
                    readOnly={userWallet < 1 ? true : false}
                    checked={isChecked}
                    onChange={userWallet < 1 ? null : (e) => handleCheckboxChange(e)}
                    id="donation"
                    className="bg-lime-700 hover:bg-lime-700 focus:bg-lime-700"
                  />
                  <label htmlFor="donation">I need a donation</label>
                </div>
              </div>
              <div className="flex flex-wrap justify-center space-x-2 lg:space-y-0">
                <Link
                  to={'/'}
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
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
