import { useEffect } from "react";
import Axios from "axios";
import { API_URL } from "./assets/constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ChangePassword from "./pages/ChangePassword";
import LoginAdmin from "./pages/LoginAdmin";
import Verify from "./pages/Verify";
import DashboardProduct from "./pages/DashboardProduct";
import DashboardUser from "./pages/DashboardUser";
import ChangePassAdmin from "./pages/ChangePassAdmin";
import HomeAdmin from "./pages/HomeAdmin";
import ResetAdmin from "./pages/ResetAdmin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const keepLoginAdmin = async () => {
      try {
        const token = localStorage.getItem("tokenAdmin");
        if (token.length) {
          const response = await Axios.post(
            `${API_URL}/admin/auth/get`,
            {},
            {
              headers: {
                Authorization: token,
              },
            }
          );

          dispatch({ type: "AUTH_ADMIN", payload: response.data.data });
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const persistentLogin = async () => {
      const userToken = localStorage.getItem("userToken");
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
        localStorage.setItem("userToken", response.data.token);

        dispatch({
          type: "USER_LOGIN",
          payload: response.data.user,
        });
      }
    };

    keepLoginAdmin();
    persistentLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/reset" element={<ResetAdmin />} />
        <Route
          path="/admin/change-password/:token"
          element={<ChangePassAdmin />}
        />
        <Route path="/dashboard/product" element={<DashboardProduct />} />
        <Route path="/dashboard/product/addproduct" element={<AddProduct />} />
        <Route
          path="/dashboard/product/editproduct"
          element={<EditProduct />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
