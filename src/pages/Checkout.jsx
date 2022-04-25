import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiEdit, FiMapPin, FiPhone, FiPlusSquare, FiSave, FiUser, FiXSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';
import CheckoutAddAddress from '../components/CheckoutAddAddress';
import CheckoutCard from '../components/CheckoutCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState();
  const [address, setAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [delivery, setDelivery] = useState('');
  const [phone, setPhone] = useState();
  const [editPhone, setEditPhone] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [costDelivery, setCostDelivery] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //  checkout api data
  const [notes, setNotes] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const userGlobal = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const payments = [
    {
      type: 'transfer',
      bankName: 'Bank Mandiri',
      name: 'admin heizen berg',
      noAccount: '89823437470723',
    },
    {
      type: 'transfer',
      bankName: 'BNI',
      name: 'admin heizen berg',
      noAccount: '340890220723',
    },
    {
      type: 'transfer',
      bankName: 'BCA',
      name: 'admin heizen berg',
      noAccount: '773489823509',
    },
  ];

  const getAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/address/find`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setAddressList(response.data);
      let selectedAddress = response.data.filter((item) => {
        return item.is_default === true;
      });

      setAddress(selectedAddress[0]);
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

  const getPhone = async () => {
    try {
      const response = await axios.get(`${API_URL}/checkout/phone/${userGlobal.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPhone(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    // get data user
    if (userGlobal.id) {
      getAddress();
      getDelivery();
      getPhone();
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
        let paymentData = paymentMethod;
        paymentData.bill = subtotal + costDelivery;
        paymentData.invoice = response.data.invoice;

        localStorage.removeItem('checkout-data');
        localStorage.setItem('payment-data', JSON.stringify(paymentData));

        // update new cart
        const cartData = await axios.get(`${API_URL}/cart/get/${userGlobal.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        dispatch({ type: 'CART_LIST', payload: cartData.data });

        setIsLoading(false);
        toast.success(response.data.message);
        return navigate('/payment', { replace: true });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handEditPhone = async (phone_number) => {
    try {
      setIsLoading(true);

      if (!phone_number) {
        setIsLoading(false);
        getPhone();
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

      getPhone();
      setIsLoading(false);
      setEditPhone(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handSetAddress = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${API_URL}/checkout/select-address`,
        { id, lastId: address.id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      getAddress();
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
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
      <div className="flex m-auto justify-start mt-32 pb-7 w-11/12">
        <h2 className="text-3xl">Checkout</h2>
      </div>
      <div className="flex m-auto justify-center mb-32 gap-8 w-11/12">
        <div className="w-8/12 flex flex-col gap-8">
          {/* Shipping Address */}
          <div className="border-gray-300 border rounded-md py-4 px-3 min-h-48">
            <h3 className="text-xl font-semibold">Shipping Address</h3>
            <div className="divider" />
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <FiUser size={20} />
                  <span className="font-semibold">{userGlobal.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone size={20} />
                  {editPhone ? (
                    <>
                      <input
                        defaultValue={phone}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-sm w-36 max-w-xs mr-4"
                        onChange={(e) => setPhone(e.target.value)}
                      ></input>
                      <FiSave size={24} color="#0EA5E9" className="hover:cursor-pointer" onClick={() => handEditPhone(phone)} />
                      <FiXSquare size={24} color="red" className="hover:cursor-pointer" onClick={() => setEditPhone(!editPhone)} />
                    </>
                  ) : (
                    <>
                      <span className="w-36">{phone ? phone : '-'}</span>
                      <FiEdit size={24} color="#0EA5E9" className="hover:cursor-pointer" onClick={() => setEditPhone(!editPhone)} />
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin size={20} />
                  {address ? (
                    <span>
                      {address.address}, {address.city}, {address.province}, {address.country}, {address.postalcode}
                    </span>
                  ) : (
                    <a href="#my-modal-4" className="text-primary border-primary border-b font-semibold">
                      Add Address
                    </a>
                  )}
                </div>
              </div>
              {address && (
                <a href="#my-modal-2" className="btn btn-sm">
                  Change Address
                </a>
              )}
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
                        {item.name} - {toIDR(item.cost)}
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
              return <CheckoutCard key={item.id} item={item} />;
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
              <span>{toIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{toIDR(costDelivery)}</span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <span className="font-bold text-lg">TOTAL</span>
              <span className="font-bold text-lg">{toIDR(subtotal + costDelivery)}</span>
            </div>
          </div>
          <a href="#my-modal-3" className="h-20 bg-gray-200 rounded-md flex justify-center items-center hover:cursor-pointer">
            {paymentMethod ? (
              <span className="font-semibold text-lg">
                {paymentMethod.bankName} - {paymentMethod.type}
              </span>
            ) : (
              <span className="font-semibold text-lg">Select payment method</span>
            )}
          </a>
          <textarea className="textarea my-4 h-14 bg-gray-100" placeholder="Write your note" onChange={(e) => setNotes(e.target.value)} />
          <button disabled={isLoading} className="btn btn-block btn-primary" onClick={handCheckout}>
            PLACE ORDER
          </button>
        </div>
      </div>

      {/* add address modal */}
      <CheckoutAddAddress onClick={getAddress} />

      {/* addres modal */}
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <div className="modal-action">
            <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </a>
          </div>
          <h3 className="text-lg font-bold mb-3">Select Your Address</h3>
          <a href="#my-modal-4" className="btn w-full bg-gray-300 text-gray-700 font-semibold border-0 hover:bg-gray-400 flex gap-3">
            Add Address <FiPlusSquare size={24} />
          </a>
          <div className=" flex flex-col gap-1 ">
            {addressList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`flex justify-between items-center border-b py-4 ${item.default ? 'text-primary font-semibold' : null}`}
                >
                  <div className="w-4/5">
                    <span>
                      {item.address}, {item.city}, {item.province}, {item.country}, {item.postalcode}
                    </span>
                  </div>
                  <div className="modal-action">
                    {!item.default && (
                      <a href="#" className="btn btn-sm btn-primary" onClick={() => handSetAddress(item.id)}>
                        Select
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* payment method modal */}
      <div className="modal" id="my-modal-3">
        <div className="modal-box">
          <div className="modal-action">
            <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
              ✕
            </a>
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
                    <a href="#" className="btn btn-sm btn-primary" onClick={() => setPaymentMethod(item)}>
                      Select
                    </a>
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
