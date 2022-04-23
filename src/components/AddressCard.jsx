import { Fragment } from 'react';

import '../assets/styles/AddressCard.css';
import { BsThreeDotsVertical, BsBookmarkCheck } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Menu, Transition } from '@headlessui/react';

const AddressEditButton = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="h-6 w-6 rounded-full focus:outline-none hover:bg-gray-100 flex justify-center items-center text-sky-400 transition">
        <BsThreeDotsVertical />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="rounded-md bg-white absolute -left-[150px] border focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div className="w-40 h-10 p-1">
                <div
                  className={`w-full h-full pl-2 rounded-md ${
                    active ? 'bg-sky-100 bg-opacity-50 text-sky-500' : 'text-sky-400'
                  } text-opacity-75 font-semibold transition flex items-center gap-1 text-sm`}
                >
                  <BsBookmarkCheck />
                  <span>Set as Default</span>
                </div>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div className="w-40 h-10 p-1">
                <div
                  className={`w-full h-full pl-2 rounded-md ${
                    active ? 'bg-rose-100 bg-opacity-50 text-rose-500' : 'text-rose-400'
                  } text-opacity-75 font-semibold transition flex items-center gap-1 text-sm`}
                >
                  <MdDelete />
                  <span>Delete Address</span>
                </div>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const AddressCard = ({ is_default }) => {
  return (
    <div className={`w-5/6 py-4 px-6 h-40 rounded-lg flex shadow ring addressCardBody ${is_default ? 'ring-sky-300' : 'ring-gray-200'}`}>
      <div className="h-full w-4/6 flex flex-col gap-2 relative">
        {is_default && (
          <div className="h-full absolute -top-1 -left-6">
            <div className="h-2 w-[5px] rounded-tr-full bg-sky-300" />
            <div className="h-10 w-[5px] bg-sky-300" />
            <div className="h-2 w-[5px] rounded-br-full bg-sky-300" />
          </div>
        )}
        <div className="w-full flex flex-col">
          <span className="text-sm font-bold text-sky-500 text-opacity-60">Address:</span>
          <span className="text-slate-700 font-semibold">Jl. Pakubuwono VI No.68, RT03/RW03, Kebayoran Baru</span>
        </div>
        <div className="w-full flex flex-col">
          <span className="text-sm font-bold text-sky-500 text-opacity-60">City:</span>
          <span className="text-slate-700 font-semibold">Jakarta Selatan</span>
        </div>
        <div>{is_default && <span className="px-3 py-1 rounded-lg bg-sky-300 font-semibold text-sm text-white">Default Address</span>}</div>
      </div>
      <div className="h-full w-2/6 flex flex-col border-l pl-5 justify-center relative">
        <div className="w-full flex flex-col">
          <span className="text-sm font-bold text-sky-500 text-opacity-60">Province:</span>
          <span className="text-slate-700 font-semibold">DKI JAKARTA</span>
        </div>
        <div className="w-full flex flex-col">
          <span className="text-sm font-bold text-sky-500 text-opacity-60">Country:</span>
          <span className="text-slate-700 font-semibold">INDONESIA</span>
        </div>
        <div className="w-full flex flex-col">
          <span className="text-sm font-bold text-sky-500 text-opacity-60">Postal Code:</span>
          <span className="text-slate-700 font-semibold">12120</span>
        </div>
        <div className="absolute top-0 -right-3">
          <AddressEditButton />
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
