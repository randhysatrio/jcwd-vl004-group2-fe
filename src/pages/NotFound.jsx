import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import notfound from '../assets/images/notfound.jpg';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="h-[85vh] w-full bg-white flex flex-col justify-center items-center">
        <div className="flex flex-col items-center md:flex-row md:justify-center">
          <img src={notfound} className="opacity-60 w-1/2 h-auto hidden md:block" />
          <div className="flex flex-col justify-center">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center">
                <span className="text-9xl font-thin bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">404</span>
              </div>
              <div className="pl-4 pt-4 flex flex-col justify-center text-xl lg:text-2xl text-slate-700">
                <span>Page</span>
                <span>Not</span>
                <span>Found</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start text-slate-700">
              <span className="text-lg xl:text-xl font-semibold">Sorry. We couldn't find what you're looking for :(</span>
              <span className="text-md xl:text-lg">Either it's because it does not exist or it's still being built..</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
