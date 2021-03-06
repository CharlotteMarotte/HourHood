import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";


export default function PostOfferView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { op } = useParams();

  let o =  props.offerToEdit ? props.offerToEdit[0] : null;



  let EMPTY_FORM = {
    service_title: "",
    service_description: "",
    capacity: 0,
    fk_category_id: 0,
    fk_provider_id: props.user.id,
  }; 
  
  let INIT_FORM = o ? {
    service_title: o.title,
    service_description: o.description,
    capacity: o.capacity,
    fk_category_id: o.category.categoryID,
    fk_provider_id: o.user.userID,
  } : EMPTY_FORM

 

  let [serviceData, setServiceData] = useState(
    op === "add" ? EMPTY_FORM : INIT_FORM
  );

  let [isChecked, setIsChecked] = useState(op === "add" ? false : o.donation);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setServiceData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleSubmit(event) {
    event.preventDefault();
    let newServiceData = {
    ...serviceData,
    donation: isChecked}

    op === "edit"
      ? props.updateOfferCb(newServiceData)
      : props.postServiceCb(newServiceData);
    setServiceData(EMPTY_FORM);
    setIsChecked(false);
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="flex flex-col items-center lg:flex-row min-h-screen px-16 py-16 min-w-screen">
      <div className="w-screen md:w-full overflow-hidden bg-white/30 text-[#fe8923] rounded-xl ">
        <div className="w-full flex md:flex-col lg:flex-row">
          <div className="hidden object-cover px-5 py-5 bg-white md:block md:w-4/7 lg:w-3/5">
            <img
              className="rounded-xl"
              src="https://img.graphicsurf.com/2020/08/volunteers-vector-flat-design.jpg"
            />
          </div>
          <div className="w-full px-5 py-20 md:w-3/7 lg:w-2/5 md:px-10">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-[#361201]">
                Offer a service
              </h1>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="space-x-2">
                <div className="w-full mb-5">
                  <label
                    htmlFor="title-input"
                    className="px-1 font-semibold text-s"
                  >
                    Title
                  </label>
                  <div className="flex">
                    <div className="flex items-center justify-center w-10 text-center poniter-events-none"></div>
                    <input
                      require="true"
                      maxLength="25"
                      id="title-input"
                      name="service_title"
                      value={serviceData.service_title}
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      className="w-full py-2 pl-10 pr-3 -ml-10 rounded-lg outline-none  focus:border-[#FFE500]"
                      placeholder="What do you want to offer?"
                    />
                  </div>
                </div>

                <div className="block lg:flex">
                  <div className="w-full mb-5 lg:w-1/2">
                    <label
                      htmlFor="capacity-input"
                      className="px-1 font-semibold text-s"
                    >
                      Capacity (times/month)
                    </label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 text-center poniter-events-none"></div>
                      <input
                        require="true"
                        id="capacity-input"
                        name="capacity"
                        value={serviceData.capacity}
                        onChange={(e) => handleInputChange(e)}
                        type="number"
                        min="0"
                        className="w-full py-2 pl-10 pr-3 -ml-10 rounded-lg outline-none focus:border-[#FFE500]"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5 space-x-3 lg:w-1/2 mt-7">
                    <input
                      type="checkbox"
                      id="donation"
                      name="donation"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e)}
                      className="bg-lime-700 hover:bg-lime-700 focus:bg-lime-700"
                    />
                    <label htmlFor="donation">I accept donations</label>
                  </div>
                </div>

                <div className="w-full px-3 pr-6 mb-5">
                  <div className="block">
                    <div className="flex items-center justify-center w-full text-center poniter-events-none"></div>
                    <label
                      htmlFor="select_category"
                      className="px-1 font-semibold text-s"
                    >
                      Select a category
                    </label>
                    <div className="relative">
                      <select
                        require="true"
                        className="min-w-full p-4 mt-2 mb-0 transition duration-200 ease-in bg-white rounded-xl focus:outline-none focus:border-[#FFE500]"
                        name="fk_category_id"
                        id="select_category"
                        onChange={(e) => handleInputChange(e)}
                        defaultValue={
                          op === "edit" ? o.category.categoryID : "DEFAULT"
                        }
                      >
                        <option
                          className="p-4 hover:bg-amber-100 text-md "
                          value="DEFAULT"
                          disabled
                        >
                          -- Choose a category --
                        </option>

                        {props.categories &&
                          props.categories.map((e) => (
                            <option
                              key={e.id}
                              className="p-4 hover:bg-amber-100 text-md"
                              value={e.id}
                            >
                              {e.category_title}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="message-input"
                      className="px-1 font-semibold text-s"
                    >
                      Description
                    </label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 pl-1 text-center pointer-events-none"></div>
                      <textarea
                        id="message-input"
                        maxLength="110"
                        name="service_description"
                        value={serviceData.service_description}
                        onChange={(e) => handleInputChange(e)}
                        rows="3"
                        className="w-full py-2 pl-10 pr-3 -ml-10 rounded-lg outline-none focus:border-[#FFE500]"
                      ></textarea>
                    </div>
                    <div className="block lg:flex">
                  {/* <div className="w-full mb-5 lg:w-1/2">
                    <label
                      htmlFor="capacity-input"
                      className="px-1 font-semibold text-s"
                    >
                      Capacity (times/month)
                    </label>
                    <div className="flex">
                      <div className="flex items-center justify-center w-10 text-center poniter-events-none"></div>
                      <input
                        require="true"
                        id="capacity-input"
                        name="capacity"
                        value={serviceData.capacity}
                        onChange={(e) => handleInputChange(e)}
                        type="number"
                        min="0"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="1"
                      />
                    </div>
                  </div> */}
                  <div className="w-full px-3 mx-auto mb-5 space-x-3 lg:w-1/2 mt-7">
                    <input
                      type="checkbox"
                      id="donation"
                      name="donation"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e)}
                      className="bg-lime-700 hover:bg-lime-700 focus:bg-lime-700"
                    />
                    <label htmlFor="donation">I accept donations</label>
                  </div>
                </div>
                  </div>
                  
                </div>

                <div className="flex flex-wrap justify-center items-center space-x-2 lg:space-y-0">
                  <Link
                    to={"/"}
                    className="bg-[#ff9940e3] hover:bg-[#fe8923] hover:shadow-[#fe8923] hover:shadow-md px-[45px] py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    Back
                  </Link>

                  <button
                    type="submit"
                    className="hover:bg-[#a6c120] bg-[#70840def] hover:shadow-[#fe8923] hover:shadow-md px-8 py-2 text-sm uppercase text-white font-bold rounded-xl"
                  >
                    {op === "edit" ? <p>Update</p> : <p>Publish</p>}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
