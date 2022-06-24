import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export default function EditProfileView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { user, updateUserInfoCb } = useContext(AppContext);
  let photoUrl = 'http://localhost:5000/clientfiles'


  let DEFAULT_FORM = {
    first_name: user.first_name,
    last_name: user.last_name,
    street: user.street,
    house_number: user.house_number,
    city_code: user.city_code,
    city_name: user.city_name,
    country: user.country,
    email: user.email,
    user_description: user.user_description,
    hobbies: user.hobbies,
    superpower: user.superpower,
    photo: user.photo,
  };

  const [file, setFile] = useState(null);
  const [profileData, setProfileData] = useState(DEFAULT_FORM);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // gets pressed after each key change
    setProfileData((state) => ({
      ...state, // gets replaced by all key-value pairs from obj
      [name]: value, // updates key [name] with new value
    }));
  };

  

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Call parent's callback
    props.updateProfileCb(profileData);

    setProfileData(DEFAULT_FORM);

  }

  function handlePhotoSubmit(event) {
    event.preventDefault();

    // Create FormData obj and append everything to upload
    let formData = new FormData();
    formData.append('fk_user_id', user.id);
    formData.append('clientfile', file, file.name);

    // Call parent's callback
    props.uploadCb(formData);
    // console.log('uploaded');

    // Reset everything
    setFile(null); // remove filename of previous file
    event.target.reset();
  }

  return (
    // Code thanks to https://codepen.io/atzinn-herrera/pen/JjMMBxy
    <div className="flex px-16 py-16 min-w-screen min-h-scree">
      <div className="w-full overflow-hidden border-2 border-solid bg-amber-100 text-amber-500 rounded-xl border-amber-200">
        <div className="w-full lg:flex">
          <div className="object-cover px-5 py-5 bg-white border-r-2 border-solid md:block md:w-3/7 lg:w-2/5 border-amber-00">
            <img className="mb-5 rounded-xl" src={user.uploadedPhoto? `${photoUrl}/${user.uploadedPhoto}` : user.photo} />
            <form onSubmit={handlePhotoSubmit}>
              <input
                type="file"
                className="px-4 py-2 mb-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
                onChange={handleFileChange}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 font-semibold bg-transparent border rounded hover:bg-amber-500 text-amber-700 hover:text-white border-amber-500 hover:border-transparent"
              >
                Upload photo{' '}
              </button>{' '}
            </form>
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
                        onChange={handleInputChange}
                        required
                        name="first_name"
                        value={profileData.first_name}
                        id="firstname-input"
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Jordi"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-5 xl:w-1/2">
                    <label
                      htmlFor="lastname-input"
                      className="flex items-center justify-center w-full text-center pointer-events-none"
                    >
                      Last Name
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        onChange={handleInputChange}
                        required
                        id="lastname-input"
                        name="last_name"
                        value={profileData.last_name}
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
                      Street
                    </label>
                    <div className="flex">
                      <div className="z-10 flex items-center justify-center w-10 text-center pointer-events-none"></div>
                      <input
                        onChange={handleInputChange}
                        required
                        id="street-input"
                        name="street"
                        value={profileData.street}
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="Carrer de Grassot"
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
                        onChange={handleInputChange}
                        required
                        id="housenumber-input"
                        name="house_number"
                        value={profileData.house_number}
                        type="number"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
                        placeholder="101"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full xl:flex xl:space-x-2">
                  <div className="w-full xl:w-1/3">
                    <div className="block">
                      <div className="flex items-center justify-center w-full text-center pointer-events-none"></div>
                      <label
                        htmlFor="select_category"
                        className="flex items-center justify-center w-full text-center pointer-events-none"
                      >
                        Postal Code{' '}
                      </label>
                      <div className="relative">
                        <select
                          onChange={handleInputChange}
                          require="true"
                          className="p-2.5 mb-0 min-w-full rounded-lg bg-white focus:outline-none focus:border-amber-500 text-md border-solid border-2 border-amber-200 transition ease-in duration-200"
                          name="city_code"
                          id="select_category"
                          value={profileData.city_code}
                          defaultValue={'DEFAULT'}
                        >
                          <option
                            disabled
                            value="DEFAULT"
                            className="p-2 hover:bg-amber-100 text-md "
                          >
                            -- Select a postal code --
                          </option>
                          {props.postalCodes.map((postalCode, index) => (
                            <option
                              key={index}
                              value={postalCode}
                              className="p-4 hover:bg-amber-100 text-md"
                            >
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
                        name="city_name"
                        value={profileData.city_name}
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
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
                        name="country"
                        value={profileData.country}
                        type="text"
                        className="w-full py-2 pl-10 pr-3 -ml-10 border-2 rounded-lg outline-none border-amber-200 focus:border-lime-700"
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
                        onChange={handleInputChange}
                        id="hobbies-input"
                        name="hobbies"
                        value={profileData.hobbies}
                        placeholder="No hobbies filled in yet"
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
                        onChange={handleInputChange}
                        id="superpower-input"
                        name="superpower"
                        value={profileData.superpower}
                        placeholder="No superpower filled in yet"
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
                        name="user_description"
                        onChange={handleInputChange}
                        value={profileData.user_description}
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
