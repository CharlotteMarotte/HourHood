import React from 'react';

export default function ProfileView() {
  return (
    // Code thanks to https://codepen.io/tariq01/pen/jOyLrRJ
    <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-24 lg:my-0">
        <div className="w-full lg:w-2/5">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F96%2F24%2Fa8%2F9624a8213b44121b85d6139e3dad1827.png&f=1&nofb=1"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">My Profile</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-amber-500 opacity-25"></div>

            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              About Me{' '}
            </p>
            <p className="text-sm">
              I moved to Gracia in September with my partner.
            </p>

            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              My Hobbies{' '}
            </p>
            <p className="text-sm">Crocheting, gardening, ceramics</p>

            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              My Superpower is...{' '}
            </p>
            <p className="text-sm">Planning suprise parties</p>

            <div className="pt-12 pb-8">
              <button className="bg-amber-700 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-full">
                Edit Profile{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
