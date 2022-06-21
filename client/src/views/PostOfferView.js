import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";


export default function PostOfferView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { op } = useParams();

  let o =  props.offerToEdit ? props.offerToEdit[0] : null;

  console.log("allofferstoedit:", props.offerToEdit)
  
  console.log("offer to edit:", o)

  let EMPTY_FORM = {
    service_title: "",
    service_description: "",
    capacity: 0,
    donation: false,
    fk_category_id: 0,
    fk_provider_id: props.user.id,
  }; 
  
  let INIT_FORM = o ? {
    service_title: o.title,
    service_description: o.description,
    capacity: o.capacity,
    donation: o.donation,
    fk_category_id: o.category.categoryID,
    fk_provider_id: o.user.userID,
  } : EMPTY_FORM

 

  let [serviceData, setServiceData] = useState(
    op === "add" ? EMPTY_FORM : INIT_FORM
  );

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setServiceData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    op === "edit"
      ? props.updateOfferCb(serviceData)
      : props.postServiceCb(serviceData);
    setServiceData(EMPTY_FORM);
  }

  //let defaultCategory = op === "add" ? o.category.categoryID : null;

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="flex min-h-screen px-16 py-16 min-w-screen">
      <div className="w-full overflow-hidden border-2 border-solid bg-amber-100 text-amber-500 rounded-xl border-amber-200">
        <div className="w-full md:flex">
          <div className="hidden object-cover px-5 py-5 bg-white border-r-2 border-solid md:block md:w-4/7 lg:w-3/5 border-amber-00">
            <img
              className="rounded-xl"
              src="https://img.graphicsurf.com/2020/08/volunteers-vector-flat-design.jpg"
            />
          </div>
          <div className="w-full px-5 py-20 md:w-3/7 lg:w-2/5 md:px-10">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-amber-900">
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
                      className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
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
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5 space-x-3 lg:w-1/2 mt-7">
                    <input
                      type="checkbox"
                      id="donation"
                      name="donation"
                      value={!serviceData.donation}
                      onChange={(e) => handleInputChange(e)}
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
                        className="min-w-full p-4 mt-2 mb-0 transition duration-200 ease-in bg-white border-2 border-solid rounded-lg focus:outline-none focus:border-amber-500 text-md border-amber-200"
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
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center space-x-2 lg:space-y-0">
                  <Link
                    to={"/"}
                    className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                  >
                    Back
                  </Link>

                  <button
                    type="submit"
                    className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-lime-600 text-lime-700 hover:text-white border-lime-600 hover:border-transparent"
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
