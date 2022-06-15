import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import AppContext from './AppContext';
import Navbar from './components/Navbar';
import ProfileView from './views/ProfileView';
import BookingsView from './views/BookingsView';
import RequestsView from './views/RequestsView';
import HomeView from './views/HomeView';
import OffersView from './views/OffersView';
import Error404View from './views/Error404View';

const INIT_OFFERS = [
  {
    id: 1,
    title: 'Babysitting',
    description: 'Only available in evenings Monday/Wednesday/Friday',
    providerId: 1,
    category: "Children & Pets",
    img: 'https://img.freepik.com/free-vector/mother-with-many-children-flat-vector-illustration-tired-single-mom-naughty-kids-cartoon-characters-parenthood-routine-motherhood-burnout-babysitting-concept-exhausted-housewife_198278-8159.jpg',
  },
  {
    id: 2,
    title: 'Cutting hair',
    description: 'Takes my about 1h for shoulder long hair',
    providerId: 1,
    category: "Health & Wellness",
    img: 'https://img.freepik.com/free-vector/beauty-salon-concept-modern-flat-design-hairdresser-washes-client-hair-before-cutting_9209-6739.jpg',
  },
  {
    id: 3,
    title: 'Cleaning flat',
    description: 'Only available on the weekends',
    providerId: 2,
    category: "Home Services & Repairs",
    img: 'https://i.pinimg.com/originals/4e/31/15/4e3115b585d68dd5e312224dd3ee8611.jpg',
  },
  {
    id: 4,
    title: 'Teaching guitar',
    description: 'For beginners to intermediate',
    providerId: 1,
    category: "Education",
    img: 'https://i.pinimg.com/originals/34/b1/5d/34b15d58b31424d570d8160d814ca420.png',
  },
  {
    id: 5,
    title: 'Cooking lesson Catalan Food',
    description: 'Will show you how to prepare three dishes',
    providerId: 2,
    category: "Food",
    img: 'https://img.freepik.com/free-vector/girl-cooking-food-flat-illustration_288067-132.jpg',
  },
];

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState(INIT_OFFERS);

  function switchUser(id) {
    if (id) {
      setUser({ id, name: 'User ' + id });
    } else {
      setUser(null);
    }
    navigate('/offers');
  }

  

  return (
    <div className="App bg-[#FFF7A3] h-screen w-screen">
      <Navbar switchUserCb={(id) => switchUser(id)} />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="bookings" element={<BookingsView />} />
        <Route
          path="offers"
          element={
            <AppContext.Provider value={offers}>
              <OffersView user={user} />
            </AppContext.Provider>
          }
        />
        <Route path="requests" element={<RequestsView />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}
