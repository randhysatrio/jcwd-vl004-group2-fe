import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartCard from '../components/CartCard';
import CartPagination from '../components/CartPagination';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { API_URL } from '../assets/constants';

const Cart = () => {
  const userGlobal = useSelector((state) => state.user);
  const cartGlobal = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const rendSubtotal = () => {
    let subtotal = 0;
    cartGlobal.checkoutItems?.forEach((item) => {
      subtotal += item.subtotal;
    });

    return subtotal;
  };

  const handCheckout = () => {
    let checkoutData = {
      data: cartGlobal.checkoutItems,
      subtotal: rendSubtotal(),
    };

    cartGlobal.checkoutItems?.forEach((item, i) => {
      checkoutData.data[i].price = item.product.price_sell;
    });

    if (checkoutData.data.length) {
      localStorage.setItem('checkout-data', JSON.stringify(checkoutData));
      navigate('/checkout');
    } else {
      toast.error('Your cart is empty');
    }
  };

  const handCheckAll = async () => {
    try {
      setIsloading(true);
      await axios.patch(
        `${API_URL}/cart/checkedall`,
        {
          userId: userGlobal.id,
          isCheckedAll: cartGlobal.isCheckedAll,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const cartData = await axios.get(
        `${API_URL}/cart/get/${userGlobal.id}?page=${cartGlobal.active_page}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch({ type: 'CART_LIST', payload: cartData.data });
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
    }
  };

  const toIDR = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col m-auto justify-center my-32 gap-8 w-11/12">
        <div className="flex justify-start w-44 px-7 form-control">
          <label className="label cursor-pointer">
            <input
              id="checkeall"
              type="checkbox"
              checked={cartGlobal.isCheckedAll}
              className="checkbox"
              onChange={handCheckAll}
              disabled={isLoading}
            />
            <span className="label-text text-lg">Select All</span>
          </label>
        </div>
        <div className="flex m-auto justify-center gap-8 w-full">
          <div className="w-9/12 flex flex-col gap-8">
            {/* List items */}
            {cartGlobal.cartList.length ? (
              cartGlobal.cartList.map((item) => {
                return <CartCard key={item.id} item={item} />;
              })
            ) : (
              <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center">
                <h2 className="text-3xl">Your cart is empty</h2>
              </div>
            )}
            <CartPagination />
          </div>
          <div className="w-1/5 flex flex-col justify-between border-gray-300 border rounded-md h-72 p-5">
            <h2 className="font-bold text-xl">ORDER SUMMARY</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {cartGlobal.checkoutItems
                    ? cartGlobal.checkoutItems.length
                    : 0}{' '}
                  {cartGlobal.checkoutItems?.length > 1 ? 'items' : 'item'})
                </span>
                <span>{toIDR(rendSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>{toIDR(0)}</span>
              </div>
              <div className="border-gray-300 border-t"></div>
              <div className="flex justify-between">
                <span className="font-bold text-lg">TOTAL</span>
                <span className="font-bold text-lg">
                  {toIDR(rendSubtotal())}
                </span>
              </div>
            </div>
            <button
              className="btn btn-block btn-primary"
              onClick={handCheckout}
            >
              PROCESS TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
