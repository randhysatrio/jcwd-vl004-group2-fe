import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartCard from '../components/CartCard';
import CartPagination from '../components/CartPagination';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { API_URL } from '../assets/constants';

import { ImWarning } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';

const Cart = () => {
  const userGlobal = useSelector((state) => state.user);
  const [conflict, setConflict] = useState(false);
  const [conflictMsg, setConflictMsg] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart/user/${userGlobal.id}`);

        if (response.data.conflict) {
          setConflict(response.data.conflict);
          setConflictMsg(response.data.conflict_msg);
        }

        setCartItems(response.data.cartItems);
      } catch (error) {
        toast.error('Unable to fetch Cart Items!');
      }
    };
    fetchCartItems();
  }, [userGlobal]);

  useEffect(() => {
    setCheckoutItems(cartItems?.filter((item) => item.isChecked === true));
  }, [cartItems]);

  const rendSubtotal = () => {
    let subtotal = 0;
    checkoutItems?.forEach((item) => {
      subtotal += item.subtotal;
    });

    return subtotal;
  };

  // const handCheckout = () => {
  //   let checkoutData = {
  //     data: cartGlobal.checkoutItems,
  //     subtotal: rendSubtotal(),
  //   };
  //   cartGlobal.checkoutItems?.forEach((item, i) => {
  //     checkoutData.data[i].price = item.product.price_sell;
  //   });
  //   if (checkoutData.data.length) {
  //     localStorage.setItem('checkout-data', JSON.stringify(checkoutData));
  //     navigate('/checkout');
  //   } else {
  //     toast.error('Your cart is empty');
  //   }
  // };

  const checkoutHandler = () => {
    if (checkoutItems.length) {
      const checkoutData = {
        items: checkoutItems,
        total: rendSubtotal(),
      };

      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

      navigate('/checkout');
    } else {
      toast.warning('Please select one or more items from your cart!');
    }
  };

  const checkAllHandler = async (e) => {
    try {
      let response;

      if (e.target.checked) {
        response = await axios.patch(`${API_URL}/cart/checked-all/${userGlobal.id}`, { isChecked: true });
      } else {
        response = await axios.patch(`${API_URL}/cart/checked-all/${userGlobal.id}`, { isChecked: false });
      }

      setCartItems(response.data.cartItems);
    } catch (err) {
      toast.error('Unable to checked all Cart Items');
    }
  };

  const toIDR = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  const renderCart = () => {
    return cartItems.map((item) => (
      <CartCard
        key={item.id}
        item={item}
        setCartItems={setCartItems}
        userId={userGlobal.id}
        setConflict={setConflict}
        setConflictMsg={setConflictMsg}
      />
    ));
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col m-auto justify-center py-12 2xl:py-32 gap-8 w-11/12">
        {conflictMsg && (
          <div className="w-9/12">
            <div className="w-max py-3 px-5 flex items-center gap-2 bg-gray-300 bg-opacity-50 backdrop-blur-sm rounded-lg">
              <ImWarning className="text-amber-400" />
              <span className="text-gray-700 font-semibold">{conflictMsg}</span>
              <span onClick={() => setConflictMsg('')} className="text-sky-500 font-bold hover:brightness-125 cursor-pointer transition">
                <IoMdClose />
              </span>
            </div>
          </div>
        )}
        <div className="w-28 flex justify-start form-control">
          <label className="label cursor-pointer">
            <input
              id="checkeall"
              type="checkbox"
              checked={cartItems?.length && !cartItems?.filter((item) => item.isChecked === false).length}
              className="checkbox"
              onChange={checkAllHandler}
              disabled={isLoading || conflict || cartItems?.some((item) => item.quantity > item.product.stock_in_unit)}
            />
            <span className="label-text text-lg">Select All</span>
          </label>
        </div>
        <div className="flex m-auto justify-center gap-8 w-full">
          {/* List items */}
          {cartItems?.length ? (
            <div className="w-9/12 flex flex-col gap-8">
              {renderCart()}
              <CartPagination />
            </div>
          ) : (
            <div className="bg-gray-100 w-11/12 rounded-md h-72 flex items-center justify-center">
              <h2 className="text-3xl">Your cart is empty</h2>
            </div>
          )}
          {cartItems?.length ? (
            <div className="w-1/5 flex flex-col justify-between border-gray-300 border rounded-md h-72 p-5">
              <h2 className="font-bold text-xl">ORDER SUMMARY</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm">
                    Subtotal ({checkoutItems?.length ? checkoutItems.length : 0} {checkoutItems?.length > 1 ? 'items' : 'item'})
                  </span>
                  <span>Rp. {rendSubtotal().toLocaleString('id')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Discount</span>
                  <span>{toIDR(0)}</span>
                </div>
                <div className="border-gray-300 border-t"></div>
                <div className="flex justify-between">
                  <span className="font-bold text-lg">TOTAL</span>
                  <span className="font-bold text-lg">Rp. {rendSubtotal().toLocaleString('id')}</span>
                </div>
              </div>
              <button
                disabled={!checkoutItems?.length || conflict}
                className="btn btn-block btn-primary disabled:btn-error disabled:cursor-not-allowed"
                onClick={checkoutHandler}
              >
                PROCESS TO CHECKOUT
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
