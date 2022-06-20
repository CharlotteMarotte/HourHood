import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Api from '../src/helpers/Api';
import Local from '../src/helpers/Local';
import './App.css';


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

const bookings = [
  {
    id: 1,
    title: 'Babysitting',
    name: 'Rachel',
    description: 'Only available in evenings Monday/Wednesday/Friday',
    date: '2022-06-23T14:41:13+00:00',
    status: 'pending',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwhBGoWgheuLGTkcoNqHuBHEiflDd-TBd9OoYARUY2cFq6I6GIjBUvbtI7zwnogvDAwSk&usqp=CAU',
  },
  {
    id: 2,
    title: 'Watering plants',
    name: 'Martha',
    description: 'Only available in summer',
    date: '2022-07-30T19:41:13+00:00',
    status: 'accepted',
    img: 'https://i.pinimg.com/originals/b8/da/8d/b8da8da3ffb8647ce7fa6bd743eeb611.png',
  },
  {
    id: 3,
    title: 'Teaching guitar',
    name: 'Lisa',
    description: 'Only available in evenings Monday/Wednesday/Friday',
    date: '2022-07-25T08:41:13+00:00',
    status: 'accepted',
    img: 'https://i.pinimg.com/originals/34/b1/5d/34b15d58b31424d570d8160d814ca420.png',
  },
  {
    id: 4,
    title: 'Painting house',
    name: 'Luis',
    description: 'Please contact me via email before',
    date: '2022-07-30T20:05:13+00:00',
    status: 'pending',
    img: 'https://i.pinimg.com/originals/8c/22/4c/8c224c88cbfcf226e3ee5d215e4930fa.png',
  },
];

const requests = [
  {
    id: 1,
    title: 'Babysitting',
    name: 'Amelia',
    description: "I need help because I'm going out for dinner",
    date: '2022-06-23T14:41:13+00:00',
    status: 'pending',
    img: '^1',
  },
  {
    id: 2,
    title: 'Watering plants',
    name: 'Elena',
    description: 'I will be gone on holiday, need watering 1 time/week',
    date: '2022-07-30T19:41:13+00:00',
    status: 'accepted',
    img: 'https://cdn.dribbble.com/users/3543938/screenshots/6603062/flat-illustration.png',
  },
  {
    id: 3,
    title: 'Teaching guitar',
    name: 'Lolo',
    description: 'I want to learn a happy song',
    date: '2022-07-25T08:41:13+00:00',
    status: 'accepted',
    img: 'https://cdn.dribbble.com/users/5352839/screenshots/11892562/character.png',
  },
  {
    id: 4,
    title: 'Painting house',
    name: 'Armin',
    description: 'I broke my arm and cannot hold a brush',
    date: '2022-07-30T20:05:13+00:00',
    status: 'pending',
    img: 'https://www.kindpng.com/picc/m/310-3100872_dancing-man-design-flat-vector-vector-colors-illustration.png',
  },
];

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

  const [bookings, setBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState([]);

  useEffect(() => {
    getCategories();
    getOffers();
  }, []);

  // ********* users *************

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
  async function addNewUser(username, password, email) {
    let myresponse = await Api.RegisterUser(username, password, email);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.user, myresponse.data.token);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');

      navigate('/login');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  // ********* users *************

  async function getCategories() {
    try {
      let response = await fetch('/categories'); // does GET by default
      if (response.ok) {
        let categories = await response.json();
        setCategories(categories); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getOffers() {
    try {
      let response = await fetch('/servicePost'); // does GET by default
      if (response.ok) {
        let offers = await response.json();
        setOffers(offers); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getBookings() {
    try {
      let response = await fetch('/bookings'); // does GET by default
      if (response.ok) {
        let bookings = await response.json();
        setBookings(bookings); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function switchUser(id) {
    if (id) {
      setUser({ id, name: 'User ' + id });
    } else {
      setUser(null);
    }
    navigate('/');
  }


  async function selectOffer(id) {
    try {
      let response = await fetch(`/servicePost/${id}`); // does GET by default
      if (response.ok) {
        let selOffer = await response.json();
        setSelectedOffer(selOffer); // set selectedOffer state with the offer that was chosen by the user, so it can be used by other components/views
        console.log("I am selected offer from APP:", selectedOffer)
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function requestService(requestData) {

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    try {
      let response = await fetch("/bookings/", options); // do POST
      if (response.ok) {
        let userBookings = await response.json(); // set bookings state with all bookings(requests) that the logged in user made, including the new one
        setUserBookings(userBookings);
        console.log("Service got requested");
        navigate("/bookings"); // go to all bookings (Receiving help page)
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

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
        navigate('/profile');
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // DELETE a duck
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

  const contextObj = { offers, user, selectOfferCb: selectOffer, deleteServiceCb: deleteService };
  const chosenUserObj = { selectedOffer, user, requestServiceCb: requestService };
  console.log("I am chosenUserObj", {chosenUserObj});

  return (
    <div className="App bg-gradient-to-t from-[#FFF7A3] via-[#FFF7A3] to-[#ff994091] h-full pb-28">
      <Navbar
        switchUserCb={(id) => switchUser(id)}
        user={user}
        logoutCb={doLogout}
      />

      <Routes>
        <Route
          path="profile"
          element={
            <AppContext.Provider value={contextObj}>
              <ProfileView user = {user} />
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
              addNewUserCb={(u, p, e) => addNewUser(u, p, e)}
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
        {/* <Route path="offers" element={<OfferGrid />} /> */}
        <Route path="receiving-help" element={<BookingsView bookings={user ? bookings.filter(e=> e.requestor.userID === user.id) : []} />} />
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
          path="service-post"
          element={
            <PostOfferView
              postServiceCb={postService}
              categories={categories}
              user={user}
            />
          }
        />
        <Route path="giving-help" element={<RequestsView bookings={user ? bookings.filter(e=> e.servicePost.serviceProvider === user.id) : []} />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}
