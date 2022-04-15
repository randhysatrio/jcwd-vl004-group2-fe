import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { AiOutlineCloseCircle } from 'react-icons/ai';

const ProductDetailsImage = ({ img, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-[80%] h-[80%] flex justify-center items-center bg-white border overflow-hidden rounded-lg cursor-zoom-in group"
      >
        <img src={img} className="w-full object-contain group-hover:scale-110 transition" />
      </div>

      <Transition as={Fragment} appear show={open}>
        <Dialog
          as="div"
          className="fixed flex justify-center items-center inset-0 z-20 bg-black bg-opacity-75"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-60 -translate-y-5"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-60 -translate-y-5"
          >
            <div className="w-max h-max pt-4 px-4 bg-white rounded-xl flex flex-col justify-center relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute h-7 w-7 rounded-full -top-[11px] -right-[11px] flex justify-center items-center bg-white text-slate-300 hover:text-sky-500 transition group"
              >
                <AiOutlineCloseCircle className="text-2xl group-active:scale-90 transition" />
              </button>
              <div className="h-[540px] w-max rounded-sm border overflow-hidden">
                <img src={img} className="h-full w-full object-contain" />
              </div>
              <div className="w-full py-3 flex justify-center items-center">
                <span className="text-lg font-bold text-slate-700">{name}</span>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductDetailsImage;
