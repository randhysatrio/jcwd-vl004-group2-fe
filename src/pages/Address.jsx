import { useState, useEffect } from 'react';

import { MdOutlineAddLocationAlt } from 'react-icons/md';
import AddressCard from '../components/AddressCard';

const Address = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[80%] h-full py-8">
        <div className="w-full flex flex-col justify-center p-1">
          <div className="w-full py-1 flex justify-between items-center">
            <span className="text-3xl font-semibold bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
              My Addresses
            </span>
            <button className="h-10 w-32 rounded-lg bg-gradient-to-r from-sky-300 to-emerald-400 font-bold text-white flex justify-center items-center gap-1 focus:outline-none active:scale-95 transition">
              <MdOutlineAddLocationAlt />
              Address
            </button>
          </div>
          <div className="w-full h-[1px] my-2 bg-gray-200" />
        </div>
        <div className="w-full p-5 flex flex-col gap-8 items-center">
          <AddressCard is_default={true} />
          <AddressCard />
          <AddressCard />
        </div>
      </div>
    </div>
  );
};

export default Address;
