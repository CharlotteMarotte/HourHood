import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';


const InitialUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(InitialUsers);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-red-500 underline">
        Hello world!
      </h1>

      <Routes>
        {/* <Route path="/" element={<HomeView />} />
                <Route path="about" element={<AboutView userCount={users.length} />} />
                <Route path="users" element={<UsersView users={users} />} />
                <Route path="users/:id" element={<UserProfileView users={users} />} />
                <Route path="add-user" element={<AddUserView addUserCb={name => addUser(name)} />} />
                <Route path="*" element={<Error404View />} /> */}
      </Routes>
    </div>
  );
}

export default App;
