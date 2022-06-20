import React, { useContext, useState } from 'react';
import AppContext from '../AppContext';
import OfferGrid from '../components/OfferGrid';
import Home from "../components/Home";

export default function HomeView(props) {

  return (
    <div className='scroll-smooth'>
      {!props.user && (
      <Home/>
      )}
      <OfferGrid/>
    </div>
  );
}
