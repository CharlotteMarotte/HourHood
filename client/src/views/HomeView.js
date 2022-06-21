import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import OfferGrid from "../components/OfferGrid";
import Home from "../components/Home";
import { useLayoutEffect } from "react";

export default function HomeView(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="scroll-smooth">
      {!props.user && <Home />}
      <OfferGrid />
    </div>
  );
}
