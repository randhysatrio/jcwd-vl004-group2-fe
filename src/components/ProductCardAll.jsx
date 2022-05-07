import { useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../assets/constants';
import { useNavigate } from 'react-router-dom';

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
  AiFillStar,
  AiFillFire,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { toast } from 'react-toastify';

const ProductCardAll = ({ view, product }) => {
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  const addToCart = async () => {
    try {
      if (!userToken) {
        navigate('/login');
      } else {
        setCartLoading(true);

        const response = await Axios.post(`${API_URL}/cart/add`, {
          userId: userGlobal.id,
          productId: product.id,
          quantity: product.volume,
        });

        if (response.data.conflict) {
          setCartLoading(false);

          toast.warning(response.data.message, { theme: 'colored', position: 'bottom-left' });
        } else {
          setCartLoading(false);

          toast.success(`Added ${product.volume?.toLocaleString('id')}${product.unit} to your cart!`, {
            position: 'bottom-left',
            theme: 'colored',
          });
        }
      }
    } catch (error) {
      toast.error('Unable to add this item to your cart!', { theme: 'colored', position: 'bottom-left' });
    }
  };

  return (
    <>
      {view === 'grid' ? (
        <div className="w-[232px] h-[360px] m-2 border hover:bg-zinc-100 rounded-md flex flex-col cursor-pointer">
          <div onClick={() => navigate(`/product/${product.id}`)} className="w-full h-2/5 flex justify-center items-center">
            <div className="w-32 h-32 flex justify-center items-center rounded-lg border border-slate-300 overflow-hidden bg-white">
              <img src={product.image} className="w-full hover:scale-105 object-contain transition" />
            </div>
          </div>
          <div className="w-full h-3/5 flex flex-col pb-2 px-2">
            <div onClick={() => navigate(`/product/${product.id}`)} className="w-full h-[80%] flex flex-col">
              <span className="text-sm font-light text-slate-400">{product.category.name}</span>
              <div className="w-full h-12 flex items-center break-words overflow-hidden">
                <span className="text-base text-slate-800 font-semibold hover:text-sky-500 transition">
                  {product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}
                </span>
              </div>
              <div className="w-full flex items-center">
                <span className="text-lg font-bold w-max bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  Rp. {product.price_sell?.toLocaleString('id')}/{product.unit}
                </span>
              </div>
              <div className="flex w-full items-center gap-2 text-sm">
                <div className="flex text-amber-300 py-2">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="font-semibold text-sky-900">12 reviews</span>
              </div>
              <div className="text-sm flex items-center font-semibold text-slate-800 gap-2">
                {product.stock_in_unit ? (
                  product.stock_in_unit <= 5 * product.volume ? (
                    <>
                      <AiFillFire className="text-orange-500" />
                      <span>
                        {!Math.floor(product.stock_in_unit / product.volume)
                          ? `Last item!`
                          : `${Math.floor(product.stock_in_unit / product.volume)} remaining!`}
                      </span>
                    </>
                  ) : (
                    <>
                      <AiOutlineCheckCircle className="text-sky-400" />
                      <span>Currently in stock!</span>
                    </>
                  )
                ) : (
                  <>
                    <AiOutlineCloseCircle className="text-red-400" />
                    <span>Out of stock</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-full h-[20%] px-3">
              {!adminToken && (
                <button
                  onClick={addToCart}
                  disabled={cartLoading}
                  className="w-full h-full rounded-md mt-auto mx-auto bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold hover:brightness-110 cursor-pointer transition active:scale-95 text-sm gap-2 flex justify-center items-center shadow disabled:from-sky-300 disabled:to-sky-500 disabled:active:scale-100"
                >
                  {cartLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Adding item..
                    </>
                  ) : (
                    <>
                      <AiOutlineShoppingCart />
                      <span className="font-semibold">Add to Cart</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-60 flex border-b mb-1 border-slate-300 cursor-pointer">
          <div onClick={() => navigate(`/product/${product.id}`)} className="w-[30%] h-full flex justify-center items-center p-4">
            <div className="w-52 h-52 bg-white border rounded-lg overflow-hidden flex shadow justify-center items-center cursor-pointer">
              <img src={product.image} className="w-full object-contain hover:scale-110 transition" />
            </div>
          </div>
          <div onClick={() => navigate(`/product/${product.id}`)} className="w-[45%] h-full flex flex-col pt-4">
            <div className="w-full flex flex-col gap-1 mb-2">
              <span className="text-xl font-semibold text-zinc-800 hover:text-sky-500 transition">
                {product.name.length > 42 ? product.name.slice(0, 42) + '...' : product.name}
              </span>
              <span className="font-semibold text-slate-400">{product.category.name}</span>
              <div className="flex w-full items-center gap-2">
                <div className="flex text-md text-amber-300 py-2">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="text-md font-semibold text-sky-900">12 reviews</span>
              </div>
            </div>
            <div className="w-full overflow-hidden leading-none text-ellipsis">
              <span className="text-xs">{product.description}</span>
            </div>
          </div>
          <div className="w-[25%] h-full pt-4 pr-4">
            <div onClick={() => navigate(`/product/${product.id}`)} className="w-full flex flex-col items-end gap-2 mb-3">
              <span className="text-2xl w-max bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent font-bold">
                Rp. {product.price_sell?.toLocaleString('id')}/{product.unit}
              </span>
              <div className="text-lg flex items-center font-semibold text-slate-800 gap-2">
                {product.stock_in_unit ? (
                  product.stock_in_unit <= 5 * product.volume ? (
                    <>
                      <AiFillFire className="text-orange-500" />
                      <span>
                        {!Math.floor(product.stock_in_unit / product.volume)
                          ? `Last item!`
                          : `${Math.floor(product.stock_in_unit / product.volume)} remaining!`}
                      </span>
                    </>
                  ) : (
                    <>
                      <AiOutlineCheckCircle className="text-sky-400" />
                      <span>Currently in stock!</span>
                    </>
                  )
                ) : (
                  <>
                    <AiOutlineCloseCircle className="text-red-400" />
                    <span>Out of stock</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end">
              {!adminToken && (
                <button
                  onClick={addToCart}
                  disabled={cartLoading}
                  className="w-[75%] h-10 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold hover:brightness-110 cursor-pointer transition active:scale-95 text-md gap-2 flex justify-center items-center shadow disabled:from-sky-300 disabled:to-sky-500 disabled:active:scale-100"
                >
                  {cartLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Adding item..
                    </>
                  ) : (
                    <>
                      <AiOutlineShoppingCart />
                      <span className="font-semibold">Add to Cart</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardAll;
