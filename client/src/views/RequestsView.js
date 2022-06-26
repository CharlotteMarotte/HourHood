
import React, { useContext } from "react";
import AppContext from "../AppContext";
import SelectedOfferCard from "../components/SelectedOfferCard";
import { useLayoutEffect } from "react";
import AddOfferButton from '../components/AddOfferButton';


export default function RequestsView(props) {
  let { requests, userWallet } = useContext(AppContext);


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="md:text-5xl text-2xl text-[#361201] font-bold mt-6 mb-12">
        Giving help{" "}
      </h1>
      <AddOfferButton />

      <div className="lg:grid lg:grid-cols-2 ">
        <div className="">
          <div className="container">
            <h1 className="pt-4 ml-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-[#fe8923] border-[#fe8923]">
              Pending{" "}
            </h1>
          </div>
          {requests
            .filter((e) => e.bookingStatus === "pending")
            .map((request) => (
              <SelectedOfferCard
                view={"requests"}
                booking={request}
                key={request.bookingId}
              />
            ))}
        </div>
        <div>
          <div className="container ">
            <h1 className="pt-4 ml-20 mr-20 text-3xl font-bold text-left border-b-2 border-opacity-25 text-[#fe8923] border-[#fe8923]">
              Accepted{" "}
            </h1>
          </div>
          {requests
            .filter((e) => e.bookingStatus === "accepted")
            .map((request) => (
              <SelectedOfferCard
                view={"requests"}
                booking={request}
                key={request.bookingId}
              />
            ))}{" "}
        </div>
      </div>
    </div>
  );
}
