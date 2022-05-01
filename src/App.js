import { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_URL, SOCKET_URL } from './assets/constants';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts';
import ChangePassword from './pages/ChangePassword';
import LoginAdmin from './pages/LoginAdmin';
import Verify from './pages/Verify';
import DashboardProduct from './pages/DashboardProduct';
import DashboardUser from './pages/DashboardUser';
import DashboardTransaction from './pages/DashboardTransaction';
import ChangePassAdmin from './pages/ChangePassAdmin';
import HomeAdmin from './pages/HomeAdmin';
import ResetAdmin from './pages/ResetAdmin';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import User from './pages/User';
import Profile from './pages/Profile';
import History from './pages/History';
import Address from './pages/Address';
import { io } from 'socket.io-client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const keepLoginAdmin = async () => {
      const token = localStorage.getItem('tokenAdmin');
      if (token) {
        const response = await Axios.post(
          `${API_URL}/admin/auth/get`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        dispatch({ type: 'AUTH_ADMIN', payload: response.data.data });
      }
    };

    const persistentLogin = async () => {
      const userToken = localStorage.getItem('userToken');

      let response;

      if (userToken) {
        response = await Axios.get(`${API_URL}/auth/persistent`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      } else {
        response = await Axios.get(`${API_URL}/auth/login/success`, {
          withCredentials: true,
        });
      }

      if (response.data.ignore) {
        return;
      } else {
        localStorage.setItem('userToken', response.data.token);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data.user,
        });

        dispatch({ type: 'CART_LIST', payload: response.data.user.carts.length });

        setSocket(io(SOCKET_URL));
      }
    };

    keepLoginAdmin();
    persistentLogin();
  }, []);

  useEffect(() => {
    if (userGlobal?.id) {
      socket?.emit('userJoin', userGlobal.id);
    }
  }, [socket, userGlobal.id]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/user" element={<User />}>
          <Route index element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="address" element={<Address />} />
        </Route>
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/reset" element={<ResetAdmin />} />
        <Route path="/admin/change-password/:token" element={<ChangePassAdmin />} />
        <Route path="/dashboard/product" element={<DashboardProduct />} />
        <Route path="/dashboard/product/addproduct" element={<AddProduct />} />
        <Route path="/dashboard/product/editproduct" element={<EditProduct />} />
        <Route path="/dashboard/transaction" element={<DashboardTransaction />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
