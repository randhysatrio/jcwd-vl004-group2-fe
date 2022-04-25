import axios from 'axios';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart/user/${userGlobal.id}`);

        setCartItems(response.data.carts);
      } catch (error) {
        toast.error('Unable to fetch Cart Items!');
      }
    };
    fetchCartItems();
  }, [userGlobal]);

  const rendSubtotal = () => {
    let subtotal = 0;
    cartItems?.forEach((item) => {
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

  const checkAllHandler = async (e) => {
    try {
      let response;

      if (e.target.checked) {
        response = await axios.patch(`${API_URL}/cart/checked-all/${userGlobal.id}`, { isChecked: true });
      } else {
        response = await axios.patch(`${API_URL}/cart/checked-all/${userGlobal.id}`, { isChecked: false });
      }

      setCartItems(response.data);
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
    return cartItems.map((item) => <CartCard key={item.id} item={item} setCartItems={setCartItems} userId={userGlobal.id} />);
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
              checked={cartItems?.length && !cartItems?.filter((item) => item.isChecked === false).length}
              className="checkbox"
              onChange={checkAllHandler}
              disabled={isLoading}
            />
            <span className="label-text text-lg">Select All</span>
          </label>
        </div>
        <div className="flex m-auto justify-center gap-8 w-full">
          <div className="w-9/12 flex flex-col gap-8">
            {/* List items */}
            {cartItems?.length ? (
              renderCart()
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
                  Subtotal ({cartItems?.length ? cartItems.length : 0} {cartItems?.length > 1 ? 'items' : 'item'})
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
                <span className="font-bold text-lg">{toIDR(rendSubtotal())}</span>
              </div>
            </div>
            <button className="btn btn-block btn-primary" onClick={handCheckout}>
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
