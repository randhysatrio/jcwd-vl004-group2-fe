import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { FiEdit, FiMapPin, FiPhone, FiSave, FiUser, FiXSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';
import CartCard from '../components/CartCard';
import CheckoutAddAddress from '../components/CheckoutAddAddress';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState();
  const [address, setAddress] = useState({});
  const [addressList, setAddressList] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [delivery, setDelivery] = useState('');
  const [phone, setPhone] = useState('');
  const [editPhone, setEditPhone] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [costDelivery, setCostDelivery] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //  checkout api data
  const [notes, setNotes] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');
  const userGlobal = useSelector((state) => state.user);
  const socket = useSelector((state) => state.socket.instance);

  const payments = [
    {
      id: 1,
      type: 'transfer',
      bankName: 'Bank Mandiri',
      name: 'admin heizen berg',
      noAccount: '89823437470723',
    },
    {
      id: 2,
      type: 'transfer',
      bankName: 'BNI',
      name: 'admin heizen berg',
      noAccount: '340890220723',
    },
    {
      id: 3,
      type: 'transfer',
      bankName: 'BCA',
      name: 'admin heizen berg',
      noAccount: '773489823509',
    },
  ];

  const getAddress = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/address/find`,
        {
          limit: 8,
          currentPage: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setAddressList(response.data.rows);

      setAddress(
        response.data.rows.find((item) => {
          return item.is_default === true ? item : response.data.rows[0];
        })
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getDelivery = async () => {
    try {
      const response = await axios.get(`${API_URL}/checkout/delivery`);
      setDeliveryOptions(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // get data user
    if (!userToken) {
      navigate('/', { replace: true });
    } else if (!localStorage.getItem('checkout-data')) {
      navigate('/cart', { replace: true });
    } else {
      getAddress();
      getDelivery();
      setPhone(userGlobal?.phone_number);
    }

    // Get data checkout from cart
    const checkout = JSON.parse(localStorage.getItem('checkout-data'));
    if (checkout) {
      setOrderItems(checkout.data);
      setSubtotal(parseInt(checkout.subtotal));
    } else {
      navigate('/', { replace: true });
    }
  }, [userGlobal]);

  const handEditPhone = async (phone_number) => {
    try {
      setIsLoading(true);

      if (!phone_number) {
        setIsLoading(false);
        setPhone(userGlobal?.phone_number);
        setEditPhone(false);
        return toast.error('Number can not empty');
      }

      const response = await axios.patch(
        `${API_URL}/checkout/phone/edit/${userGlobal.id}`,
        { phone_number },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // getPhone();
      setIsLoading(false);
      setEditPhone(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handCheckout = async () => {
    try {
      setIsLoading(true);
      const dataCheckout = {
        userId: userGlobal.id,
        addressId: address.id,
        deliveryoptionId: parseInt(delivery),
        phoneNumber: phone,
        notes,
        orderItems,
      };

      // check delivery and payment
      if (!delivery) {
        setIsLoading(false);
        return toast.error('Please select delivery option');
      } else if (!paymentMethod) {
        setIsLoading(false);
        return toast.error('Please select payment method option');
      }

      // create checkout
      const response = await axios.post(
        `${API_URL}/checkout/add`,
        {
          dataCheckout,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response) {
        let paymentData = [paymentMethod];
        paymentData[0].bill = subtotal + costDelivery;
        paymentData[0].invoice = response.data.invoice;
        paymentData[0].createdAt = response.data.createdAt;

        // set invoice data
        let data = JSON.parse(localStorage.getItem('payment-data'));
        if (data) paymentData.push(...data);

        localStorage.removeItem('checkout-data');
        localStorage.setItem('payment-data', JSON.stringify(paymentData));

        // update new cart
        dispatch({
          type: 'CART_TOTAL',
          payload: response.data.cartTotal,
        });
        dispatch({ type: 'ALERT_NEW', payload: 'awaiting' });
        socket?.emit('newTransaction');

        setIsLoading(false);
        toast.success(response.data.message);
        return navigate(`/payment/${response.data.invoice}`, { replace: true });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex m-auto justify-start mt-20 pb-7 w-11/12">
        <h2 className="text-3xl">Checkout</h2>
      </div>
      <div className="flex m-auto justify-center mb-32 gap-8 w-11/12">
        <div className="w-8/12 flex flex-col gap-8 ">
          {/* Shipping Address */}
          <div className="border-gray-300 border rounded-md py-4 px-3 min-h-48">
            <h3 className="text-xl font-semibold">Shipping Address</h3>
            <div className="divider" />
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3">
                  <FiUser size={20} />
                  <span className="font-semibold">{userGlobal.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone size={20} />
                  {editPhone ? (
                    <>
                      <input
                        value={phone ? phone : ''}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-sm w-36 max-w-xs mr-4"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <FiSave size={24} color="#0EA5E9" className="hover:cursor-pointer" onClick={() => handEditPhone(phone)} />
                      <FiXSquare
                        size={24}
                        color="red"
                        className="hover:cursor-pointer"
                        onClick={() => {
                          setEditPhone(!editPhone);
                          setPhone(userGlobal?.phone_number);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span className="w-36">{phone ? phone : '-'}</span>
                      <FiEdit size={24} color="#0EA5E9" className="hover:cursor-pointer" onClick={() => setEditPhone(!editPhone)} />
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div className="flex gap-3 w-3/5">
                    <FiMapPin size={20} />
                    <div className="flex justify-start w-full">
                      {address ? (
                        <span className="flex flex-wrap">
                          {address.address}, {address.city}, {address.province}, {address.country}, {address.postalcode}
                        </span>
                      ) : (
                        <label
                          htmlFor="modal-add-address"
                          href="#modal-add-address"
                          className="text-primary border-primary border-b
                      font-semibold hover:cursor-pointer"
                        >
                          Add Address
                        </label>
                      )}
                    </div>
                  </div>
                  {address && (
                    <div className="flex gap-3">
                      <label htmlFor="modal-add-address" href="#modal-add-address" className="btn btn-sm">
                        Add Address
                      </label>

                      <label htmlFor="modal-change-address" href="#modal-change-address" className="btn btn-sm">
                        Change Address
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="divider" />

            {/* delivery option */}
            <div className="form-control w-full max-w-xs">
              <select
                defaultValue="Default"
                className="select select-bordered"
                onChange={(e) => {
                  setDelivery(deliveryOptions[e.target.value].id);
                  setCostDelivery(deliveryOptions[e.target.value].cost);
                }}
              >
                <option value="Default" disabled>
                  Select Delivery Option
                </option>
                {deliveryOptions.length &&
                  deliveryOptions.map((item, i) => {
                    return (
                      <option key={item.id} value={i}>
                        {item.name} - Rp. {item.cost.toLocaleString('id')}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          {/* List order items */}
          <div className="py-4 min-h-48">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">Your Order</h3>
            </div>
            <div className="divider" />
            {orderItems.map((item) => {
              return <CartCard key={item.id} item={item} checkout setIsLoading={setIsLoading} />;
            })}
          </div>
        </div>
        <div className="w-4/12 flex flex-col justify-between border-gray-300 border rounded-md h-500 p-5">
          <h2 className="font-bold text-xl">ORDER SUMMARY</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>
                Subtotal ({orderItems.length} {orderItems.length > 1 ? 'items' : 'item'})
              </span>
              <span>Rp. {subtotal.toLocaleString('id')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Rp. {costDelivery.toLocaleString('id')}</span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">TOTAL</span>
              <span className="font-bold text-lg">Rp. {(subtotal + costDelivery).toLocaleString('id')}</span>
            </div>
          </div>
          <label htmlFor="modal-payment" className="h-20 bg-gray-200 rounded-md flex justify-center items-center hover:cursor-pointer">
            {paymentMethod ? (
              <span className="font-semibold text-lg">
                {paymentMethod.bankName} - {paymentMethod.type}
              </span>
            ) : (
              <span className="font-semibold text-lg">Select payment method</span>
            )}
          </label>
          <textarea className="textarea my-4 h-14 bg-gray-100" placeholder="Write your note" onChange={(e) => setNotes(e.target.value)} />
          <button disabled={isLoading} className="btn btn-block btn-primary" onClick={handCheckout}>
            PLACE ORDER
          </button>
        </div>
      </div>

      {/* add address modal */}
      <CheckoutAddAddress onClick={getAddress} />

      {/* change addres modal */}
      <input type="checkbox" id="modal-change-address" className="modal-toggle" />
      <div className="modal" id="modal-change-address">
        <div className="modal-box">
          <div className="modal-action">
            <label htmlFor="modal-change-address" className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </label>
          </div>
          <h3 className="text-lg font-bold mb-3">Select Your Address</h3>
          <div className=" flex flex-col gap-1 ">
            {addressList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`flex justify-between items-center border-b py-4 ${address === item ? 'text-primary font-semibold' : null}`}
                >
                  <div className="w-4/5">
                    <span>
                      {item.address}, {item.city}, {item.province}, {item.country}, {item.postalcode}
                    </span>
                  </div>
                  <div className="modal-action">
                    <label
                      disabled={address === item}
                      htmlFor="modal-change-address"
                      className="btn btn-sm btn-primary"
                      onClick={() => setAddress(item)}
                    >
                      Select
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* payment method modal */}
      <input type="checkbox" id="modal-payment" className="modal-toggle" />
      <div className="modal" id="modal-payment">
        <div className="modal-box">
          <div className="modal-action">
            <label htmlFor="modal-payment" className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </label>
          </div>
          <h3 className="text-lg font-bold mb-3">Select Payment Method</h3>
          {payments.map((item) => {
            return (
              <div key={item.id} className="border-b flex flex-col gap-1 py-2">
                <div className="flex justify-start gap-10">
                  <span className="font-semibold">Type : {item.type}</span>
                  <span className="font-bold">{item.bankName}</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div>
                      <span className="text-gray-500">Account Name : </span>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Account Number : </span>
                      <span>{item.noAccount}</span>
                    </div>
                  </div>
                  <div className="modal-action">
                    <label
                      disabled={paymentMethod?.id === item.id}
                      htmlFor="modal-payment"
                      className="btn btn-sm btn-primary"
                      onClick={() => setPaymentMethod(item)}
                    >
                      Select
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
