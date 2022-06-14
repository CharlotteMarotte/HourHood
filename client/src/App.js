import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

import CharlottesView from './views/CharlottesView';
import HomeView from './views/HomeView';
import Error404View from './views/Error404View';


const InitialUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(InitialUsers);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/charlotte" element={<CharlottesView />} />
        <Route path="/irene" element={<CharlottesView />} />

        <Route path="*" element={<Error404View />} />
        {/*
                <Route path="about" element={<AboutView userCount={users.length} />} />
                <Route path="users" element={<UsersView users={users} />} />
                <Route path="users/:id" element={<UserProfileView users={users} />} />
                <Route path="add-user" element={<AddUserView addUserCb={name => addUser(name)} />} />
                */}
      </Routes>
    </div>
  );
}

export default App;
