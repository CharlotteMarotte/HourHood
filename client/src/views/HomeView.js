import React, { useContext } from 'react';
import AppContext from '../AppContext';
import OfferGrid from '../components/OfferGrid';
import Home from "../components/Home";

export default function HomeView() {

  return (
    <div className='scroll-smooth'>
      <Home/>
      <OfferGrid/>
    </div>
  );
}
