import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const BuyAgainRow = ({ setItem, item, val }) => {
  return (
    <div
      onClick={() => {
        if (item === val) {
          setItem('');
        } else {
          setItem(val);
        }
      }}
      className={`w-full h-20 my-2 rounded-lg hover:ring-2 hover:ring-sky-300 transition cursor-pointer flex active:scale-95 ${
        item === val ? 'ring-2 ring-emerald-300' : 'ring-0'
      }`}
    >
      <div className="h-full w-[22%] flex justify-center items-center">
        <div className="w-16 h-16 rounded-md border bg-white">
          <img
            src={
              'https://image.made-in-china.com/2f0j00FpvfKjMEEzud/Iknow-High-Purity-7553-56-2-Iodine-Crystals-99-Pure-with-Fast-Delivery.webp'
            }
            className="h-full object-contain"
          />
        </div>
      </div>
      <div className="h-full w-[52%] flex flex-col justify-center">
        <span className="font-semibold text-slate-700">2-Phenoxyethanol Phenoxyetha...</span>
        <span className="text-sm font-semibold text-gray-400">Pharmaceutical Intermediate</span>
      </div>
      <div className="h-full w-[26%] flex justify-center items-center font-bold">
        <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">Rp. 1.000.000</span>
      </div>
    </div>
  );
};

const BuyAgainModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState('');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-10 w-36 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold hover:brightness-110 transition active:scale-95 focus:outline-none"
      >
        Buy Again
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" onClose={() => setOpen(false)} className="fixed inset-0 z-[25] overflow-y-auto flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-50"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-50"
          >
            <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-80 -translate-y-5"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-80 -translate-y-5"
          >
            <div className="w-[550px] h-max bg-gradient-to-r from-white to-emerald-50 rounded-xl flex flex-col z-[30] shadow">
              <div className="w-full py-6 flex justify-center text-xl font-bold relative">
                <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
                  Which item would like you to buy again?
                </span>
                <button
                  onClick={() => {
                    setItem('');
                    setOpen(false);
                  }}
                  className="text-2xl text-sky-500 hover:brightness-110 active:scale-95 transition absolute top-2 right-2"
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>
              <div className="w-full flex-col px-10">
                <BuyAgainRow item={item} setItem={setItem} val={'first'} />
                <BuyAgainRow item={item} setItem={setItem} val={'second'} />
              </div>
              <div className="w-full py-5 flex justify-center">
                <button
                  disabled={!item}
                  className={`h-12 w-40 rounded-xl first:font-bold text-white transition bg-gradient-to-r ${
                    item ? 'from-sky-500 to-emerald-500  hover:brightness-110 active:scale-95' : 'from-sky-300 to-emerald-300'
                  } `}
                >
                  Buy Again
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default BuyAgainModal;
