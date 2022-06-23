import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Api from '../src/helpers/Api';
import Local from '../src/helpers/Local';
import './App.css';
import { useLayoutEffect } from 'react';

import AppContext from './AppContext';
import BookingContext from './BookingContext';
import Navbar from './components/Navbar';
import ProfileView from './views/ProfileView';
import BookingsView from './views/BookingsView';
import RequestsView from './views/RequestsView';
import HomeView from './views/HomeView';
import Error404View from './views/Error404View';
import SignUpView from './views/SignUpView';
import LogInView from './views/LogInView';
import RequestServiceView from './views/RequestServiceView';
import PostOfferView from './views/PostOfferView';
import EditProfileView from './views/EditProfileView';
import GetStarted from './views/GetStarted';
import RulesView from './views/RulesView';
import Chat from './components/Chat';
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
  const [unfilteredOffers, setUnfilteredOffers] = useState(offers);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [userWallet, setUserWallet] = useState(0);

  const [bookings, setBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);
  const [toBeEdited, setToBeEdited] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState([]);

  useEffect(() => {
    getCategories();
    getOffers();
    getUsers();
    getFiles();
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
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
      await getWalletValue(myresponse.data.user.id);
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  // GET all users
  async function getWalletValue(id) {
    try {
      let response = await fetch(`/users/${id}/wallet`); // does GET by default
      if (response.ok) {
        let walletValue = await response.json();
        setUserWallet(walletValue.hour_balance); // set users state with all users, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // logout
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    setUserBookings(null);
    setUserWallet(0);
  }

  // sign up
  async function addNewUser(newUser) {
    let myresponse = await Api.RegisterUser(newUser);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.user, myresponse.data.token);
      setUser(myresponse.data.user);
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
        users = users.filter((u) => u.id !== 1);
        setUsers(users); // set users state with all users, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
  // ********* PROFILE  *************

  //PUT method - edit the service post/offer
  async function updateProfile(profileData) {
    // Define fetch() options
    let options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    };

    try {
      let response = await fetch(`/users/${user.id}`, options); // do PUT
      if (response.ok) {
        let users = await response.json();
        // don't show admin user
        users = users.filter((u) => u.id !== 1);
        setUsers(users);
        navigate(`/profile/${user.id}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getFiles() {
    try {
      let response = await fetch('/photos');
      if (response.ok) {
        let data = await response.json();
        setFiles(data);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  async function uploadFile(formData) {
    let options = {
      method: 'POST',
      body: formData,
    };

    try {
      let response = await fetch('/photos', options);
      if (response.ok) {
        // Server responds with updated array of files
        let data = await response.json();
        setFiles(data);
        navigate(`/profile/${user.id}`);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  // ********* CATEGORIES *************

  async function getCategories() {
    try {
      let response = await fetch('/categories'); // does GET by default
      if (response.ok) {
        let categories = await response.json();
        // filter out system category
        categories = categories.filter((c) => c.id !== 1);
        setCategories(categories); // set categories state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // ********* OFFERS *************

  function choseCat(chosenCatId) {
    let tempOffers = unfilteredOffers.filter(
      (e) => e.category.categoryID === Number(chosenCatId)
    );
    setOffers(tempOffers);
  }

  function resetFilteredOffers() {
    setOffers(unfilteredOffers);
  }

  // GET all offers
  async function getOffers() {
    try {
      let response = await fetch('/servicePost'); // does GET by default
      if (response.ok) {
        let offers = await response.json();
        // filter out system post to get starting hour debit
        offers = offers.filter((o) => o.category.categoryID !== 1);
        setOffers(offers); // set offers state with all offers, so it can be used by other components/views
        setUnfilteredOffers(offers);
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
        // don't show offer that was only made by system to give default credit
        offers = offers.filter((o) => o.category.categoryID !== 1);
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
    let offerToEdit = offers.filter((e) => e.postID === id);
    setToBeEdited(offerToEdit);
    console.log('to be edited:', toBeEdited);
  }

  //PUT method - edit the service post/offer
  async function updateOffer(serviceData) {
    let id = toBeEdited[0].postID; // get postID from state

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
        // don't show offer that was only made by system to give start credit
        offers = offers.filter((o) => o.category.categoryID !== 1);
        setOffers(offers);
        navigate(`/profile/${user.id}`);
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
        // don't show offers made by system for start credit
        offers = offers.filter((o) => o.category.categoryID !== 1);
        setOffers(offers);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // ********* BOOKINGS *************

  function openChat(id) {
    setSelectedBooking(id);
    // console.log(id);
    // console.log(selectedBooking);
    navigate('/chat');
    //it save the ID but not when I need it, it appears with delay.
  }

  // GET all bookings

  async function getBookings() {
    try {
      let response = await fetch('/bookings'); // does GET by default
      if (response.ok) {
        let bookings = await response.json();
        // filter out booking made by system
        bookings = bookings.filter((b) => b.requestor.userID !== 1);
        setBookings(bookings); // set bookings state with all categories, so it can be used by other components/views
        setUserBookings(bookings);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // save selected offer to selected state based on the id (callback used in OfferCard with click on Request button )
  function selectOffer(id) {
    let selected = offers.filter((e) => e.postID === id);
    setSelectedOffer(selected);
    navigate(user ? '/service-request' : '/login');
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
        let bookings = await response.json(); // set bookings state with all bookings(requests) that the logged in user made, including the new one
        //  don't show admin bookings
        bookings = bookings.filter((b) => b.requestor.userID !== 1);
        setBookings(bookings);
        setUserBookings(bookings);
        console.log('Service got requested');
        navigate('/receiving-help'); // go to all bookings (Receiving help page)
        console.log('userBookings:', userBookings);
        console.log('bookings', bookings);
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
        // don't show admin bookings
        bookings = bookings.filter((b) => b.requestor.userID !== 1);
        setBookings(bookings);
        await getWalletValue(user.id);
        setUserBookings(bookings);
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
    categories,
    userWallet,
    selectOfferCb: selectOffer,
    deleteServiceCb: deleteService,
    toEditCb: toEdit,
    choseCatCb: choseCat,
    resetFilteredOffersCb: resetFilteredOffers,
  };

  const chosenUserObj = {
    selectedOffer,
    user,
    userWallet,
    requestServiceCb: requestService,
  };

  const bookingsObj = {
    bookings:
      user && bookings
        ? bookings.filter((e) => e.requestor.userID === user.id)
        : [],
    requests:
      user && bookings
        ? bookings.filter((e) => e.servicePost.serviceProvider === user.id)
        : [],
    users,
    offers,
    reactToRequestCb: reactToRequest,
    openChatCb: openChat,
  };

  // ********* RETURN *************
  const chatBookingObj = {
    bookingId: selectedBooking,
  };

  return (
    <div className="App bg-gradient-to-t from-[#FFF7A3] via-[#FFF7A3] to-[#ff994091] h-full pb-28">
      <Navbar user={user} logoutCb={doLogout} />

      <Routes>
        <Route
          path="profile/:id"
          element={
            <AppContext.Provider value={contextObj}>
              <ProfileView />
            </AppContext.Provider>
          }
        />
        <Route
          path="profile/edit"
          element={
            <AppContext.Provider value={contextObj}>
              <EditProfileView
                postalCodes={postalCodes}
                updateProfileCb={(pd) => updateProfile(pd)}
                uploadCb={(fd) => uploadFile(fd)}
              />
            </AppContext.Provider>
          }
        />

        <Route
          path="signup"
          element={
            <SignUpView
              user={user}
              postalCodes={postalCodes}
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

        <Route
          path="chat"
          element={
            <AppContext.Provider value={chatBookingObj}>
              <ChatView user={user} bookings={bookings} />
            </AppContext.Provider>
          }
        />
      </Routes>
    </div>
  );
}
