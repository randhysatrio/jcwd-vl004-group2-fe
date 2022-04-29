import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsArrowRepeat } from 'react-icons/bs';
import { toast } from 'react-toastify';

const BuyAgainRow = ({ item, selected, setSelected }) => {
  return (
    <button
      disabled={item.quantity > item.product.stock_in_unit}
      onClick={() => {
        if (selected === item) {
          setSelected({});
        } else {
          setSelected(item);
        }
      }}
      className={`w-full h-20 my-2 rounded-lg hover:ring-2 hover:ring-sky-300 transition cursor-pointer flex active:scale-95 disabled:scale-100 ${
        item === selected ? 'ring-2 ring-emerald-300' : 'ring-0'
      }`}
    >
      <div className="h-full w-[22%] flex justify-center items-center">
        <div className="w-16 h-16 rounded-md border flex justify-center items-center bg-white">
          <img src={item.product.image} className="h-full object-contain" />
        </div>
      </div>
      <div className="h-full w-[52%] flex flex-col pt-[15px] items-start">
        <span className="font-semibold text-slate-700">
          {item.product.name.length > 28 ? item.product.name.slice(0, 28) + '...' : item.product.name}
        </span>
        <span className="text-sm font-semibold text-gray-400">{item.product.category.name}</span>
        {item.quantity > item.product.stock_in_unit && <span className="text-xs text-red-400">Quantity exceed current stock</span>}
      </div>
      <div className="h-full w-[26%] flex flex-col pt-[15px] items-center gap-1">
        <span className="text-xs font-extrabold text-sky-800 text-opacity-75">Quantity:</span>
        <div className="flex items-center">
          <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent font-bold">
            {item.quantity.toLocaleString('id')}
          </span>
          <span className="text-sm font-semibold text-sky-400">{item.product.unit}</span>
        </div>
      </div>
    </button>
  );
};

const BuyAgainModal = ({ items, userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const renderItems = () => {
    return items.map((item) => <BuyAgainRow key={item.id} item={item} selected={selected} setSelected={setSelected} />);
  };

  const buyAgainHandler = async () => {
    try {
      setLoading(true);

      const response = await Axios.post(`${API_URL}/cart/add`, {
        userId: userId,
        productId: selected.productId,
        quantity: selected.quantity,
      });

      setLoading(false);

      if (response.data.conflict) {
        toast.warning(response.data.message, { position: 'bottom-left', theme: 'colored' });
      } else {
        toast.success(response.data, { position: 'bottom-left', theme: 'colored' });
        setOpen(false);
        navigate('/cart');
      }
    } catch (err) {
      setLoading(false);

      toast.error('Unable to add this item to you cart!', { position: 'bottom-left', theme: 'colored' });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-10 w-36 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold hover:brightness-110 transition active:scale-95 focus:outline-none flex items-center justify-center gap-2"
      >
        <BsArrowRepeat />
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
                    setSelected({});
                    setOpen(false);
                  }}
                  className="text-2xl text-sky-500 hover:brightness-110 active:scale-95 transition absolute top-2 right-2"
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>
              <div className="w-full flex-col px-10">{renderItems()}</div>
              <div className="w-full py-5 flex justify-center">
                <button
                  disabled={!selected.id || loading}
                  onClick={buyAgainHandler}
                  className={`h-12 w-40 rounded-xl first:font-bold text-white transition bg-gradient-to-r 
                   from-sky-500 to-emerald-500 hover:brightness-110 active:scale-95 disabled:scale-100 disabled:brightness-100 disabled:from-sky-300 disabled:to-sky-300 flex items-center justify-center gap-2
                   `}
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Adding item..
                    </>
                  ) : (
                    <>Buy Again</>
                  )}
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
