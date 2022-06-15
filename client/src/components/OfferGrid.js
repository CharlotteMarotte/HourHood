import React, { useContext } from 'react';
import AppContext from '../AppContext';
import OfferCard from './OfferCard';

export default function OfferGrid() {
  let offers = useContext(AppContext);

  return (
    <div>
      <a
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {offers.map((o) => (
              <OfferCard key={o.id} offer={o}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
