import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import LoginAdmin from './pages/LoginAdmin';
import Verify from './pages/Verify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
