import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomeView from './HomeView';
import Error404View from './Error404View';
import IreneView from './IreneView';


export default function CharlottesView() {
  return (
    <div className="App bg-[#FFF7A3] h-screen w-screen">
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/irene" element={<IreneView />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}
