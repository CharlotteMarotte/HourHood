import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import AppContext from './AppContext';
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
import OfferGrid from './components/OfferGrid';



const INIT_OFFERS = [
  {
    id: 1,
    title: 'Babysitting',
    description: 'Only available in evenings Monday/Wednesday/Friday',
    providerId: 1,
    category: 'Children & Pets',
    img: 'https://img.freepik.com/free-vector/mother-with-many-children-flat-vector-illustration-tired-single-mom-naughty-kids-cartoon-characters-parenthood-routine-motherhood-burnout-babysitting-concept-exhausted-housewife_198278-8159.jpg',
  },
  {
    id: 2,
    title: 'Cutting hair',
    description: 'Takes my about 1h for shoulder long hair',
    providerId: 1,
    category: 'Health & Wellness',
    img: 'https://img.freepik.com/free-vector/beauty-salon-concept-modern-flat-design-hairdresser-washes-client-hair-before-cutting_9209-6739.jpg',
  },
  {
    id: 3,
    title: 'Cleaning flat',
    description: 'Only available on the weekends',
    providerId: 2,
    category: 'Home Services & Repairs',
    img: 'https://i.pinimg.com/originals/4e/31/15/4e3115b585d68dd5e312224dd3ee8611.jpg',
  },
  {
    id: 4,
    title: 'Teaching guitar',
    description: 'For beginners to intermediate',
    providerId: 1,
    category: 'Education',
    img: 'https://i.pinimg.com/originals/34/b1/5d/34b15d58b31424d570d8160d814ca420.png',
  },
  {
    id: 5,
    title: 'Cooking lesson Catalan Food',
    description: 'Will show you how to prepare three dishes',
    providerId: 2,
    category: 'Food',
    img: 'https://img.freepik.com/free-vector/girl-cooking-food-flat-illustration_288067-132.jpg',
  },
];


export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState(INIT_OFFERS);
  const postalCodes = ['08006', '08012', '08023', '08035', '08024', '08037', '08025'];


  function switchUser(id) {
    if (id) {
      setUser({ id, name: 'User ' + id });
    } else {
      setUser(null);
    }
    navigate('/');
  }

  function requestService() {
    console.log('Service got requested');
    navigate('/bookings');
  }

  function postService() {
    console.log('Service got posted');
    navigate('/profile');
  }

  const contextObj = { offers, user };
  const chosenUserObj = { offer: offers[1], requestServiceCb: requestService };

  return (
    <div className="App bg-gradient-to-t from-[#FFF7A3] via-[#FFF7A3] to-[#ff994091] h-screen">
      <Navbar switchUserCb={(id) => switchUser(id)} user={user}/>

      <Routes>
        <Route
          path="profile"
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
              <EditProfileView postalCodes={postalCodes}/>
            </AppContext.Provider>
          }
        />
        <Route path="signup" element={<SignUpView />} />
        <Route path="login" element={<LogInView />} />
        {/* <Route path="offers" element={<OfferGrid />} /> */}
        <Route path="bookings" element={<BookingsView />} />
        <Route path="getstarted" element={<GetStarted />} />
        <Route
          path="/"
          element={
            <AppContext.Provider value={contextObj}>
              <HomeView />
            </AppContext.Provider>
          }
        />
        <Route
          path="service-request"
          element={
            <AppContext.Provider value={chosenUserObj}>
              <RequestServiceView />
            </AppContext.Provider>
          }
        />
        <Route path="service-post" element={<PostOfferView  postServiceCb={postService}/>} />
        <Route path="requests" element={<RequestsView />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}
