import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { IoIosMail, IoIosMailOpen, IoIosSend } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';

const MessagesModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-11/12 h-24 rounded-lg hover:bg-gray-50 ring-1 hover:ring ring-gray-300 flex focus:outline-none transition cursor-pointer">
        <div onClick={() => setOpen(true)} className="flex h-full">
          <div className="w-20 h-full flex items-center justify-center">
            <div className="relative">
              <IoIosMail className="text-3xl text-gray-600 text-opacity-80" />
              <div className="h-[10px] w-[10px] absolute top-[2px] -right-[2px] rounded-lg bg-white flex justify-center items-center">
                <span className="h-[8px] w-[8px] rounded-full bg-red-400"></span>
              </div>
            </div>
          </div>
          <div className="w-[320px] h-full flex flex-col justify-center">
            <span className="text-lg font-bold text-zinc-700 hover:text-sky-400 hover:text-opacity-70 transition">
              Payment Approved for Invoice #1
            </span>
            {/* maxchar = 44 */}
            <span className="text-sm text-gray-500 text-opacity-70">Hi, Randhy Satrio! We have received the paym..</span>
          </div>
          <div className="h-full w-44 flex flex-col justify-center">
            <span className="text-sm text-gray-500 text-opacity-70 leading-none">From:</span>
            {/* maxchar = 17 */}
            <span className="text-md font-bold text-gray-600">Heizen Berg Admin..</span>
          </div>
          <div className="w-24 h-full flex flex-col justify-center">
            <span className="text-sm text-gray-500 text-opacity-70 leading-none">Received:</span>
            <span className="font-bold text-gray-600">12/12/2022</span>
          </div>
        </div>
        <div className="w-20 h-full pl-4 flex items-center">
          <BsTrash className="text-2xl text-gray-500 hover:text-red-500 active:scale-95 transition cursor-pointer" />
        </div>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="absolute inset-0 z-30 flex justify-center items-center" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-80 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-80 -translate-y-2"
          >
            <div className="w-[40%] bg-gray-50 rounded-lg absolute z-20 shadow">
              <div className="flex flex-col px-5 py-2">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-600 mb-[2px]">Payment Approved for Invoice #1</span>
                    <div className="flex items-center text-sm">
                      <IoIosSend className="text-emerald-300" />:<span className="text-gray-800 font-semibold ml-1">Heizen Berg Co.</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold mt-auto">May 1st, 2022</span>
                </div>
                <div className="w-full h-[1px] my-1 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto" />
              </div>
              <div className="w-full h-52 px-4 pb-3">
                <div className="w-full h-full rounded-xl p-3 bg-gray-200 bg-opacity-80 flex flex-col text-sm">
                  <span className="mb-3">Hello Randhy Satrio!,</span>
                  <span className="mb-2">We have approved the payment you made for Invoice ID:1.</span>
                  <span className="mb-2">Please wait while we packed your order and shipped it to you immediately!,</span>
                  <span>Regards,</span>
                  <span>Heizen Berg Co. Admin Team</span>
                </div>
              </div>
              <div className="flex justify-end items-center px-4 pb-3">
                <button
                  onClick={() => setOpen(false)}
                  className="h-10 w-32 bg-gradient-to-r from-sky-500 to-sky-400 hover:brightness-110 transition active:scale-95 rounded-lg font-bold text-white focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MessagesModal;
