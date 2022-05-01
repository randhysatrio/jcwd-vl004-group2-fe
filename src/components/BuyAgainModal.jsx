import { useState, Fragment, useEffect } from 'react';
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
      disabled={item.quantity > item.product.stock_in_unit || item.product.deletedAt}
      onClick={() => {
        if (selected === item) {
          setSelected({});
        } else {
          setSelected(item);
        }
      }}
      className={`w-full h-20 my-2 rounded-lg hover:ring-2 hover:ring-sky-300 transition cursor-pointer flex active:scale-95 disabled:active:scale-100 disabled:hover:ring-0 disabled:cursor-default relative overflow-hidden ${
        item === selected ? 'ring-2 ring-emerald-300' : 'ring-0'
      }`}
    >
      {item.quantity > item.product.stock_in_unit || item.product.deletedAt ? (
        <div className="absolute inset-0 bg-gray-400 bg-opacity-40 z-50" />
      ) : null}
      <div className="h-full w-[22%] flex justify-center items-center">
        <div className="w-16 h-16 rounded-md border flex justify-center items-center bg-white">
          <img src={item.product.image} className="h-full object-contain" />
        </div>
      </div>
      <div className="h-full w-[52%] flex flex-col justify-center items-start">
        <span className="font-semibold text-slate-700">
          {item.product.name.length > 28 ? item.product.name.slice(0, 28) + '...' : item.product.name}
        </span>
        <span className="text-sm font-semibold text-gray-400">{item.product.category.name}</span>
        {item.quantity > item.product.stock_in_unit || item.product.deletedAt ? (
          <span className="text-xs text-red-400 relative z-[51]">
            {item.quantity > item.product.stock_in_unit && item.product.deletedAt
              ? 'This item is not available anymore'
              : item.quantity > item.product.stock_in_unit
              ? 'Quantity exceeds stock'
              : 'This item is not available anymore'}
          </span>
        ) : null}
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

const BuyAgainModal = ({ invoiceId, userId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [itemLoading, setItemLoading] = useState(false);
  const [refetch, setRefetch] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemLoading(true);

        const items = await Axios.get(`${API_URL}/history/repeat/${invoiceId}`);
        setItemsList(items.data);

        setItemLoading(false);
      } catch (error) {
        setItemLoading(false);

        toast.error('Unable to fetch Invoice Items!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchItems();
  }, [refetch]);

  const renderItems = () => {
    return itemsList.map((item) => <BuyAgainRow key={item.id} item={item} selected={selected} setSelected={setSelected} />);
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
        onClick={() => {
          setRefetch(refetch + 1);
          setOpen(true);
        }}
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
                    setItemLoading(false);
                    setOpen(false);
                  }}
                  className="text-2xl text-sky-500 hover:brightness-110 active:scale-95 transition absolute top-2 right-2"
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>
              <div className="w-full relative min-h-16 flex-col px-10">
                {itemLoading ? (
                  <div className="absolute inset-0 mx-10 rounded-lg z-[55] bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center gap-2 text-lg text-slate-500">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    <span className="font-bold">Loading..</span>
                  </div>
                ) : null}
                {renderItems()}
              </div>
              <div className="w-full py-5 flex justify-center">
                <button
                  disabled={!selected.id || loading}
                  onClick={buyAgainHandler}
                  className={`h-12 w-40 rounded-xl first:font-bold text-white transition bg-gradient-to-r 
                   from-sky-500 to-emerald-500 hover:brightness-110 active:scale-95 disabled:scale-100 disabled:brightness-100 disabled:from-sky-300 disabled:to-emerald-300 flex items-center justify-center gap-2
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
