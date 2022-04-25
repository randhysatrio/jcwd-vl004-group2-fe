import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { FaMapMarkerAlt } from 'react-icons/fa';
import AddressCard from '../components/AddressCard';
import NewAddressModal from '../components/NewAddressModal';

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userToken = localStorage.getItem('userToken');

        const response = await Axios.get(`${API_URL}/address/find`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setAddresses(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddresses();
  }, []);

  const renderAddresses = () => {
    return addresses.map((address) => <AddressCard key={address.id} address={address} setAddresses={setAddresses} />);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[80%] h-full py-8">
        <div className="w-full flex flex-col justify-center p-1">
          <div className="w-full py-1 flex justify-between items-center">
            <div className="flex gap-2 items-center text-3xl">
              <FaMapMarkerAlt className="text-emerald-300" />
              <span className="font-semibold bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">My Addresses</span>
            </div>
            <NewAddressModal setAddresses={setAddresses} />
          </div>
          <div className="w-full h-[1px] my-2 bg-gray-200" />
        </div>
        <div className="w-full p-5 flex flex-col gap-8 items-center">{renderAddresses()}</div>
      </div>
    </div>
  );
};

export default Address;
