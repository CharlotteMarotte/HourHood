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
import RulesView from './views/RulesView';

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
    img: 'https://media.istockphoto.com/vectors/black-man-exercising-in-the-park-illustration-in-flat-style-concept-vector-id1158202184?k=20&m=1158202184&s=612x612&w=0&h=nTnoqg5wjvf44Wwf3N6W0Yo4TIIoWOQvuKOERzcPX3M=',
  },
];

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
    img: 'https://media1.thehungryjpeg.com/thumbs2/ori_3828483_pvs5h84dimh89wrk5g11gcc3wjgxg1tts9xyyyfq_flat-illustration-girl-holding-a-laptop.jpg',
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

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState(INIT_OFFERS);
  const postalCodes = [
    '08006',
    '08012',
    '08023',
    '08035',
    '08024',
    '08037',
    '08025',
  ];

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

    <div className="App bg-gradient-to-t from-[#FFF7A3] via-[#FFF7A3] to-[#ff994091] h-full pb-28">

      <Navbar switchUserCb={(id) => switchUser(id)} user={user} />

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
              <EditProfileView postalCodes={postalCodes} />
            </AppContext.Provider>
          }
        />
        <Route path="signup" element={<SignUpView />} />
        <Route path="login" element={<LogInView />} />
        <Route path="rules" element={<RulesView />} />
        {/* <Route path="offers" element={<OfferGrid />} /> */}
        <Route path="bookings" element={<BookingsView bookings={bookings} />} />
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
        <Route
          path="service-post"
          element={<PostOfferView postServiceCb={postService} />}
        />
        <Route path="requests" element={<RequestsView requests={requests} />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}
