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
  console.log("myData:", myData);

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
    window.scrollTo(0, 0);
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
        /*
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
                {/* only show when profile of user who is currently logged in is shown */
        /* {user.id === myData.id && (
                  <div className="pt-12 pb-8">
                    <Link
                      to="/profile/edit"
                      className="px-10 py-3 text-lg font-bold uppercase text-white hover:shadow-lg hover:shadow-[#ff994091] rounded-xl bg-[#ff9940e3] hover:bg-[#fe8923]"
                    >
                      Edit Profile{" "}
                    </Link>
                  </div>
                )} */

        <div className="font-sans antialiased leading-normal text-[#361201] tracking-wide bg-cover">
          <div className="flex flex-wrap items-center h-auto max-w-4xl mx-auto my-24 -mt-1 md:mt-10 lg:h-screen lg:my-0">
            {Number(id) === user.id && (
              
                <div className="w-auto md:w-full lg:w-2/5">
                  <img
                    src={
                      user.uploadedPhoto
                        ? `${photoUrl}/${user.uploadedPhoto}`
                        : user.photo
                    }
                    className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
                  />
                  <div className="w-44 md:w-60 md:h-60 relative z-20 ml-24 md:ml-72 h-44 mt-6 lg:hidden">
                    <img
                      src={
                        user.uploadedPhoto
                          ? `${photoUrl}/${user.uploadedPhoto}`
                          : user.photo
                      }
                      className="h-full w-full object-cover  rounded-full shadow-lg shadow-[#ff994091] lg:rounded-lg lg:hidden"
                    />
                  </div>
                </div>
            )}
            {Number(id) !== user.id && (
              <div className="w-auto md:w-full lg:w-2/5">
                <img
                  src={
                    myData.uploadedPhoto
                      ? `${photoUrl}/${myData.uploadedPhoto}`
                      : myData.photo
                  }
                  className="hidden rounded-none shadow-lg lg:rounded-lg lg:block"
                />
                <div className="w-44 relative md:w-60 md:h-60 z-20 md:ml-72 ml-24 h-44 mt-6 lg:hidden">
                  <img
                    src={
                      myData.uploadedPhoto
                        ? `${photoUrl}/${myData.uploadedPhoto}`
                        : myData.photo
                    }
                    className="h-full w-full object-cover rounded-full shadow-lg shadow-[#ff994091] lg:rounded-lg lg:hidden"
                  />
                </div>
              </div>
            )}

            <div
              id="profile"
              className="w-full mx-6 z-10 -mt-16 md:-mt-20 lg:mt-0 bg-white/60 rounded-lg shadow-lg lg:w-3/5 lg:rounded-r-lg lg:rounded-l-none lg:mx-0 "
            >
              <div className="p-4 text-center md:p-12 lg:text-left">
                <h1 className="pt-8 text-3xl font-bold text-[#fe8923] lg:pt-0">
                  {Number(id) === user.id ? (
                    <h1 className="pt-8 text-3xl font-bold text-[#fe8923] lg:pt-0">
                      {myData.first_name}'s{" "}
                      <span className="text-[#361201]">Profile</span>
                    </h1>
                  ) : (
                    <h1 className="pt-8 text-3xl font-bold text-[#fe8923] lg:pt-0">
                      {myData.first_name}'s{" "}
                      <span className="text-[#361201]">Profile</span>
                    </h1>
                  )}
                </h1>

                <div className="w-4/5 pt-3 mx-auto border-b-2 opacity-25 lg:mx-0 border-amber-500"></div>

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  About Me{" "}
                </p>
                {Number(id) === user.id && (
                  <p className="text-sm">
                    {user.user_description
                      ? user.user_description
                      : "No information provided"}
                  </p>
                )}
                {Number(id) !== user.id && (
                  <p className="text-sm">
                    {myData.user_description
                      ? myData.user_description
                      : "No information provided"}
                  </p>
                )}

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Hobbies{" "}
                </p>
                {Number(id) === user.id && (
                  <p className="text-sm">
                    {user.hobbies
                      ? user.hobbies
                      : "No hobbies shared with us yet"}
                  </p>
                )}
                {Number(id) !== user.id && (
                  <p className="text-sm">
                    {myData.hobbies
                      ? myData.hobbies
                      : "No hobbies shared with us yet"}
                  </p>
                )}

                <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                  My Superpower is...{" "}
                </p>
                {Number(id) === user.id && (
                  <p className="text-sm">
                    {user.superpower
                      ? user.superpower
                      : "No superpower disclosed"}
                  </p>
                )}
                {Number(id) !== user.id && (
                  <p className="text-sm">
                    {myData.superpower
                      ? myData.superpower
                      : "No superpower disclosed"}
                  </p>
                )}
              </div>

              {user.id === Number(id) && (
                <div className="pt-12 pb-8">
                  <Link
                    to="/profile/edit"
                    className="px-10 py-3 text-lg font-bold uppercase text-white hover:shadow-md hover:shadow-[#ff994091] rounded-xl bg-[#ff9940e3] hover:bg-[#fe8923]"
                  >
                    Edit Profile{" "}
                  </Link>
                </div>
              )}
              
            </div>
          </div>
          {user.id === Number(id) && (
              <div className="pt-6 pb-12 lg:text-right lg:mx-56 -mt-16 md:-mt-8 lg:mt-0">
                <h3 className="text-lg text-[#361201] font-bold">Do you want to invite a friend?</h3>
                <h3 className="font-bold text-lg py-2 text-[#fe8923]">Send him/her a token</h3>
                <button
                  title="With a token you can invite a friend to become part of the community!"
                  className="px-10 py-2 text-lg font-bold uppercase text-[#361201] hover:shadow-md hover:shadow-white rounded-xl bg-[#ffe60072] border-2 border-[#FFE500] hover:bg-[#FFE500]"
                  onClick={(e) => getMyToken()}
                >
                  Get a token{' '}
                </button>
                <p className={`lg:mr-9 text-lg mt-3 font-mono ${myToken.length>0 && ""}`}>{myToken}</p>
              </div>
              )}

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
