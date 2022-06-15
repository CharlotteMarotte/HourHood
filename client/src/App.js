import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';


import ProfileView from './views/ProfileView';
import BookingsView from './views/BookingsView';
import RequestsView from './views/RequestsView';
import HomeView from './views/HomeView';
import OffersView from './views/OffersView';
import Error404View from './views/Error404View';


export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function switchUser(id){
    if(id){
      setUser({id, name: "User " + id})
    }else{
      setUser(null);
    }
    navigate('/offers');
  }

  return (
    <div className="App bg-[#FFF7A3] h-screen w-screen">
      <Navbar switchUserCb={id => switchUser(id)}/>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="bookings" element={<BookingsView />} />
        <Route path="offers" element={<OffersView user={user}/>} />
        <Route path="requests" element={<RequestsView />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

