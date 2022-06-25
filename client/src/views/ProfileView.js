import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import OfferCard from '../components/OfferCard';
import { Link, useParams } from 'react-router-dom';
import { useLayoutEffect } from "react";
import AddOfferButton from '../components/AddOfferButton';

export default function ProfileView(props) {
  let { user, users } = useContext(AppContext);
  let [myOffers, setMyOffers] = useState(props.offers);
  let [myData, setMyData] = useState(props.offers[0]);
  let [myToken, setMyToken] = useState([]);

  let photoUrl = 'http://localhost:5000/clientfiles';

  useEffect(() => {
    getMyOffers();
    getMyUserData();
  }, [
    // offers,
    users,
    user,
  ]);

  console.log("user", user);
   console.log("myData", myData);


  useLayoutEffect(() => {
    window.scrollTo(0, 0)
}, []);

  const { id } = useParams();

  // filters for offers where user that is currently logged in provider
  function getMyOffers() {
    if (user) {
      let filteredOffers = props.offers.filter(
        (e) => e.user.userID === Number(id)
      );
      setMyOffers(filteredOffers);
    }
  }

  function getMyUserData() {
    let filteredUsers = users.filter((u) => u.id === Number(id));
    setMyData(filteredUsers[0]);
  }

  // Generate a new token and register into the backend as valid token.
  async function getMyToken() {
    myToken = Math.random().toString(36).substr(2);
    console.log(myToken);
    setMyToken(myToken);

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: myToken, valid: 1 }),
    };

    try {
      let response = await fetch('/tokens', options);
      if (!response.ok) {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  // Check if a token is valid or it has been used before.
  async function checkTokenValid(token) {
    try {
      let response = await fetch(`/tokens/${token}`);
      if (!response.ok) {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
        return false;
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
      return false;
    }
    return true;
  }

  async function setInvalidToken(token) {
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token, valid: 0 }),
    };
    try {
      let response = await fetch('/tokens', options);
      if (!response.ok) {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    // Code thanks to https://codepen.io/tariq01/pen/jOyLrRJ
    <>
    {/* only show Profile page if user is logged in */}
      {user ? (
        <div className="font-sans antialiased leading-normal tracking-wider text-gray-900 bg-cover">
          <div className="flex flex-wrap items-center h-auto max-w-4xl mx-auto my-24 lg:h-screen lg:my-0">
            <div className="w-full lg:w-2/5">
              {Number(id) === user.id && 
                <img
                  src={user.uploadedPhoto ? `${photoUrl}/${user.uploadedPhoto}`
                      : user.photo}
                  className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
                />}
               {Number(id) !== user.id &&
                <img
                  src={myData.uploadedPhoto ? `${photoUrl}/${myData.uploadedPhoto}`
                      : myData.photo}
                  className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
                />}
            </div>
            <div
              id="profile"
              className="w-full mx-6 bg-white rounded-lg shadow-lg opacity-75 lg:w-3/5 lg:rounded-r-lg lg:rounded-l-none lg:mx-0 "
            >
              <div className="p-4 text-center md:p-12 lg:text-left">    
                <h1 className="pt-8 text-3xl font-bold lg:pt-0">
                  {Number(id) === user.id ? `${user.first_name}'s Profile`
                    : `${myData.first_name}'s Profile`
                  }
                </h1>
                <div className="w-4/5 pt-3 mx-auto border-b-2 opacity-25 lg:mx-0 border-amber-500"></div>

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  About Me{' '}
                </p>
                {Number(id) === user.id && 
                  <p className="text-sm">
                    {user.user_description
                      ? user.user_description
                      : 'No information provided'}
                  </p>}
                {Number(id) !== user.id && 
                  <p className="text-sm">
                    {myData.user_description
                      ? myData.user_description
                      : 'No information provided'}
                  </p>}

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Hobbies{' '}
                </p>
                {Number(id) === user.id && 
                  <p className="text-sm">
                    {user.hobbies ? user.hobbies : 'No hobbies shared with us yet'}
                  </p>}
                {Number(id) !== user.id && 
                  <p className="text-sm">
                   {myData.hobbies ? myData.hobbies : 'No hobbies shared with us yet'}
                   </p>}
               
               <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Superpower is...{' '}
                </p>
                {Number(id) === user.id && 
                  <p className="text-sm">
                    {user.superpower ? user.superpower : 'No superpower disclosed'}
                  </p>}
                {Number(id) !== user.id && 
                  <p className="text-sm">
                   {myData.superpower ? myData.superpower : 'No superpower disclosed'}
                   </p>}
                
              </div>
              {/* only show when profile of user who is currently logged in is shown */}
              {user.id === Number(id) && (
                <div className="pt-12 pb-8">
                  <Link
                    to="/profile/edit"
                    className="px-4 py-2 font-bold text-white rounded-full bg-amber-700 hover:bg-amber-900"
                  >
                    Edit Profile{' '}
                  </Link>
                </div>
              )}
            {user.id === Number(id) && (
              <div className="pt-12 pb-8">
                <button
                  className="px-4 py-2 font-bold text-white rounded-full bg-amber-700 hover:bg-amber-900"
                  onClick={(e) => getMyToken()}
                >
                  Get tokennnn{' '}
                </button>
                <p>{myToken}</p>
              </div>
              )}
            </div>
          </div>
          {/* only show when profile of user who is currently logged in is shown */}
          {user.id === Number(id) && (
            <div>
              <div className="container mx-auto ">
                <h1 className="pt-8 text-3xl font-bold border-b-2 border-opacity-25 text-amber-900 lg:pt-0 border-amber-700">
                  My current offerings
                </h1>
              </div>
              <AddOfferButton />
              <div className="px-5 py-24 mx-auto -m-4 lg:flex-wrap md:block lg:flex">
                {myOffers.map((o) => (
                  <OfferCard key={o.postID} offer={o} view={'profile'} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          className="p-4 my-1 text-2xl font-medium rounded-lg title-font bg-amber-200 text-amber-900"
          to="/offers"
        >
          No User logged in - back to offers
        </Link>
      )}
    </>
  );
}
