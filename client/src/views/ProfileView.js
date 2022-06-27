
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import OfferCard from "../components/OfferCard";
import { Link, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import AddOfferButton from "../components/AddOfferButton";
import GoToOfferButton from "../components/GoToOfferButton";
import noUserImg from "../img/lock.png";


export default function ProfileView(props) {
  let { user, users } = useContext(AppContext);
  let [myOffers, setMyOffers] = useState(props.offers);
  let [myData, setMyData] = useState(props.offers[0]);
  let [myToken, setMyToken] = useState([]);
  console.log("myData:", myData)

  let photoUrl = "http://localhost:5000/clientfiles";

  useEffect(() => {
    getMyOffers();
    getMyUserData();
  }, [
    // offers,
    users,
    user,
  ]);

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: myToken, valid: 1 }),
    };

    try {
      let response = await fetch("/tokens", options);
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, valid: 0 }),
    };
    try {
      let response = await fetch("/tokens", options);
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

        <div className="font-sans antialiased leading-normal tracking-wider bg-cover">
          {user.id !== myData.id && <GoToOfferButton />}
          <h3 className="md:text-5xl text-2xl text-[#361201] font-bold mt-6">
            Profile
          </h3>

          <div className="-mt-[75px]">
            <div className="flex flex-wrap items-center h-auto max-w-4xl mx-auto my-24 lg:h-screen lg:my-0">
              <div className="w-auto md:w-full lg:w-2/5">
                <img
                  src={
                    user.uploadedPhoto
                      ? `${photoUrl}/${user.uploadedPhoto}`
                      : user.photo
                  }
                  className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
                />
              </div>
              <div
                id="profile"
                className="w-full md:mt-10 lg:mt-0 mx-6 bg-white/75 rounded-lg flex flex-col items-center shadow-lg shadow-[#ff994091] lg:w-3/5 lg:rounded-r-lg lg:rounded-l-none lg:mx-0 "
              >
                <div className="w-44 h-44 mt-6 lg:hidden">
                  <img
                    src={
                      user.uploadedPhoto
                        ? `${photoUrl}/${user.uploadedPhoto}`
                        : user.photo
                    }
                    className="h-full w-full object-cover rounded-full shadow-lg shadow-[#ff994091] lg:rounded-lg lg:hidden"
                  />
                </div>
                <div className="p-4 -mt-8 md:-mt-10 lg:mt-0 text-center md:p-12 lg:text-left">
                  <h1 className="pt-8 text-3xl font-bold text-[#fe8923] lg:pt-0">
                    {myData.first_name}'s{" "}
                    <span className="text-[#361201]">Profile</span>
                  </h1>
                  <div className="w-4/5 pt-3 mx-auto border-b-2 opacity-25 lg:mx-0 border-amber-500"></div>

                  <p className="flex items-center text-[#361201] justify-center pt-4 text-base font-bold lg:justify-start">
                    About Me{" "}
                  </p>
                  <p className="text-sm text-[#361201]">
                    {myData.user_description
                      ? myData.user_description
                      : "No description"}
                  </p>

                  <p className="flex items-center text-[#361201] justify-center pt-4 text-base font-bold lg:justify-start">
                    My Hobbies{" "}
                  </p>
                  <p className="text-sm text-[#361201]">
                    {myData.hobbies ? myData.hobbies : "No Hobbies"}
                  </p>
                  <p className="flex text-[#361201] items-center justify-center pt-4 text-base font-bold lg:justify-start">
                    My Superpower is...{" "}
                  </p>
                  <p className="text-sm text-[#361201]">
                    {myData.superpower ? myData.superpower : "No superpower"}
                  </p>
                </div>
                {/* only show when profile of user who is currently logged in is shown */}
                {user.id === myData.id && (
                  <div className="pt-12 pb-8">
                    <Link
                      to="/profile/edit"
                      className="px-10 py-3 text-lg font-bold uppercase text-white hover:shadow-lg hover:shadow-[#ff994091] rounded-xl bg-[#ff9940e3] hover:bg-[#fe8923]"
                    >
                      Edit Profile{" "}
                    </Link>
                  </div>
                )}
/*
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
              <div className="pt-6 pb-12">
                <button
                  title="With a token you can invite a friend to become part of the community!"
                  className="px-4 py-2 font-bold text-white rounded-full bg-amber-700 hover:bg-amber-900"
                  onClick={(e) => getMyToken()}
                >
                  Get a token{' '}

                </button>
                <p className={`w-1/4 p-3 mx-auto mt-3 font-mono ${myToken.length>0 && "bg-gray-200 hover:bg-gray-100"}`}>{myToken}</p>
 */
              </div>
              )}
            </div>
          </div>
          <div className="pt-12 pb-8 lg:text-right -mt-28 md:-mt-24 lg:mr-64 mb-2 lg:-mt-40">
            <p className="text-[#361201] text-lg font-semibold">
              Do you want to invite a friend? <br />
              <span className="text-[#fe8923]">Send him/her a token</span>
            </p>

            <button
              className="px-6 py-2 mt-4 text-lg font-bold uppercase text-[#361201] rounded-xl hover:shadow-lg hover:shadow-[#ff994091] border-2 border-[#FFE500] bg-[#FFF7A3] hover:bg-[#FFE500]"
              onClick={(e) => getMyToken()}
            >
              Get token{" "}
            </button>
            <p className="font-semibold lg:mr-5 mt-2">{myToken}</p>
          </div>
          {/* only show when profile of user who is currently logged in is shown */}
          {user.id === Number(id) && (
            <div>
              <div className="container mx-auto">
                <h1 className="pt-8 text-3xl mx-16 font-bold border-b-2 pb-2 border-opacity-25 text-[#361201] lg:pt-0 border-[#fe8923]">
                  My current offerings
                </h1>
              </div>
              <AddOfferButton />
              <div className="px-5 py-24 mx-auto -m-4 lg:flex-wrap md:justify-center lg:justify-start md:flex">
                {myOffers.map((o) => (
                  <OfferCard key={o.postID} offer={o} view={"profile"} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center xl:mt-10 md:mt-44 mt-20 relative">
          <img src={noUserImg} className="absolute top-4 z-10" />
          <h3 className="md:mt-48 mt-32 py-4 md:py-9 animate-pulse text-2xl md:text-4xl w-screen z-20 font-medium uppercase bg-[#a81223ca] text-white">
            No User logged in
          </h3>
          <Link
            to="/login"
            className="bg-[#ff9940e3] z-20 xl:mt-44 md:mt-60 mt-32 hover:bg-[#fe8923] hover:shadow-white hover:shadow-md hover:font-extrabold px-10 py-2 text-md uppercase text-white font-bold rounded-xl"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}
