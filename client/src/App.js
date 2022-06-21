import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Api from '../src/helpers/Api';
import Local from '../src/helpers/Local';
import './App.css';
import { useLayoutEffect } from "react";



import AppContext from "./AppContext";
import BookingContext from "./BookingContext";
import Navbar from "./components/Navbar";
import ProfileView from "./views/ProfileView";
import BookingsView from "./views/BookingsView";
import RequestsView from "./views/RequestsView";
import HomeView from "./views/HomeView";
import Error404View from "./views/Error404View";
import SignUpView from "./views/SignUpView";
import LogInView from "./views/LogInView";
import RequestServiceView from "./views/RequestServiceView";
import PostOfferView from "./views/PostOfferView";
import EditProfileView from "./views/EditProfileView";
import GetStarted from "./views/GetStarted";
import RulesView from "./views/RulesView";
import Chat from "./components/Chat";
import ChatView from './views/ChatView';


const postalCodes = [
  '08006',
  '08012',
  '08023',
  '08035',
  '08024',
  '08037',
  '08025',
];

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);
  const [toBeEdited, setToBeEdited] = useState([]);

  useEffect(() => {
    getCategories();
    getOffers();
    getUsers();
  }, []);
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
}, []);


  // ********* USERS *************

  // login
  async function doLogin(email, password) {
    let myresponse = await Api.loginUser(email, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.email);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');
      await getBookings();
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  // logout
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  // sign up
  async function addNewUser(newUser) {
    let myresponse = await Api.RegisterUser(newUser);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.user, myresponse.data.token);
      setUser(myresponse.data.user);
      console.log(user);
      setLoginErrorMsg('');
      navigate('/login');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  // GET all users
 async function getUsers() {
    try {
      let response = await fetch('/users'); // does GET by default
      if (response.ok) {
        let users = await response.json();
        setUsers(users); // set users state with all users, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
  // ********* CATEGORIES *************

  async function getCategories() {
    try {
      let response = await fetch('/categories'); // does GET by default
      if (response.ok) {
        let categories = await response.json();
        setCategories(categories); // set categories state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // ********* OFFERS *************

  // GET all offers
  async function getOffers() {
    try {
      let response = await fetch('/servicePost'); // does GET by default
      if (response.ok) {
        let offers = await response.json();
        setOffers(offers); // set offers state with all offers, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // POST a new service/offer
  async function postService(serviceData) {
    // Define fetch() options
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    };

    try {
      let response = await fetch('/servicePost/', options); // do POST
      if (response.ok) {
        let offers = await response.json(); // set invoices state with all invoices including new ones
        setOffers(offers);
        navigate('/');
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

//save to state the info about the offer which the user wants to edit (callback used in OfferCard, id saved with click on "Edit" button)
function toEdit(id) {
  let offerToEdit = offers.filter(e=> e.postID === id);
  setToBeEdited(offerToEdit);
  console.log("to be edited:", toBeEdited)
 }

//PUT method - edit the service post/offer
  async function updateOffer(serviceData) {
    
    let id = toBeEdited[0].postID // get postID from state

    // Define fetch() options
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    };

    try {
      let response = await fetch(`/servicePost/${id}`, options); // do PUT
      if (response.ok) {
        let offers = await response.json();
        setOffers(offers);
        navigate('/');
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
  

  // DELETE a service/offer
  async function deleteService(id) {
    // Define fetch() options
    let options = {
      method: 'DELETE',
    };

    try {
      let response = await fetch(`/servicePost/${id}`, options); // do DELETE
      if (response.ok) {
        let offers = await response.json();
        setOffers(offers);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

// ********* BOOKINGS *************

// GET all bookings

  async function getBookings() {
    try {
      let response = await fetch('/bookings'); // does GET by default
      if (response.ok) {
        let bookings = await response.json();
        setBookings(bookings); // set bookings state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

// save selected offer to selected state based on the id (callback used in OfferCard with click on Request button )
  function selectOffer(id) {
   let selected = offers.filter(e=> e.postID === id);
   setSelectedOffer(selected);
  }

  // POST a new request (make a booking)
  async function requestService(requestData) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    try {
      let response = await fetch('/bookings/', options); // do POST
      if (response.ok) {
        let userBookings = await response.json(); // set bookings state with all bookings(requests) that the logged in user made, including the new one
        setUserBookings(userBookings);
        console.log('Service got requested');
        navigate('/receiving-help'); // go to all bookings (Receiving help page)
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // PUT: Add status of booking
  async function reactToRequest(id, reply) {
    // Find booking in state and change status
    let booking = bookings.find((b) => b.bookingId === id);
    booking.bookingStatus = reply;
    booking.proposedDate = booking.proposedDate.slice(0, 10);

    // Define fetch() options
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    };

    try {
      let response = await fetch(`/bookings/${id}`, options); // do PUT
      if (response.ok) {
        let bookings = await response.json();
        setBookings(bookings);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }


// ********* OBJECT FOR APP CONTEXT *************
  const contextObj = {
    offers,
    user,
    users,
    selectOfferCb: selectOffer,
    deleteServiceCb: deleteService,
    toEditCb: toEdit
  };

  const chosenUserObj = {
    selectedOffer,
    user,
    requestServiceCb: requestService,
  };

  const bookingsObj = {
    requests: user && bookings
      ? bookings.filter((e) => e.requestor.userID === user.id)
      : [],
      bookings: user && bookings
      ? bookings.filter((e) => e.servicePost.serviceProvider === user.id)
      : [],
      users,
      offers,
    reactToRequestCb: reactToRequest,
  };

// ********* RETURN *************

  return (
    <div className="App bg-gradient-to-t from-[#FFF7A3] via-[#FFF7A3] to-[#ff994091] h-full pb-28">
      <Navbar
        user={user}
        logoutCb={doLogout}
      />

      <Routes>
        <Route
          path="profile/:id"
          element={
            <AppContext.Provider value={contextObj}>
              <ProfileView/>
            </AppContext.Provider>
          }
        />
        <Route
          path="profile/edit"
          element={
            <AppContext.Provider value={contextObj}>
              <EditProfileView postalCodes={postalCodes} />
            </AppContext.Provider>
          }
        />

        <Route
          path="signup"
          element={
            <SignUpView
              user={user}
              addNewUserCb={(newUser) => addNewUser(newUser)}
            />
          }
        />

        <Route
          path="login"
          element={
            <LogInView
              loginCb={(e, p) => doLogin(e, p)}
              loginError={loginErrorMsg}
            />
          }
        />
        <Route path="rules" element={<RulesView />} />

        <Route
          path="receiving-help"
          element={
            <AppContext.Provider value={bookingsObj}>
              <BookingsView />{' '}
            </AppContext.Provider>
          }
        />
        <Route path="getstarted" element={<GetStarted />} />
        <Route
          path="/"
          element={
            <AppContext.Provider value={contextObj}>
              <HomeView user={user} />
            </AppContext.Provider>
          }
        />
        <Route
          path="service-request"
          element={
            <BookingContext.Provider value={chosenUserObj}>
              <RequestServiceView />
            </BookingContext.Provider>
          }
        />
        <Route
          path="service-post/:op"
          element={
            <PostOfferView
              postServiceCb={postService}
              categories={categories}
              user={user}
              offerToEdit={toBeEdited}
              updateOfferCb={updateOffer}
            />
          }
        />
        <Route
          path="giving-help"
          element={
            <AppContext.Provider value={bookingsObj}>
              <RequestsView />{' '}
            </AppContext.Provider>
          }
        />
        <Route path="*" element={<Error404View />} />
        <Route path="chat" element={<ChatView user={user} bookings={bookings}/>} />
      </Routes>
      <div>
        {/* <Chat user = {user} senderName="Juan" bookingId="1"/>
        <Chat senderName="Pepe" bookingId="1"/> */}
      </div>
    </div>
  );
}
