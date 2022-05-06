import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { API_URL, SOCKET_URL } from '../assets/constants';
import { io } from 'socket.io-client';

import '../assets/styles/Login.css';
import { AiOutlineInfoCircle, AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiAlertTriangle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import ForgetPasswordModal from '../components/ForgetPasswordModal';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken) {
      navigate('/', { replace: true });
    } else if (adminToken) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Please enter a valid email address').required('This field cannot be empty'),
      password: Yup.string().required('This field cannot be empty'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      const response = await Axios.post(`${API_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.data.invalid) {
        setIsLoading(false);

        return setInvalid('Please check your email or password!');
      }

      if (response.data.user) {
        setIsLoading(false);

        localStorage.setItem('userToken', response.data.token);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data.user,
        });

        dispatch({
          type: 'SET_SOCKET',
          payload: io(SOCKET_URL),
        });

        navigate(-1, { replace: true });
      }
    },
  });

  return (
    <div className="flex justify-center md:justify-end items-center relative loginBody">
      <div className="absolute top-6 left-4 md:top-5 md:left-7">
        <span className="text-2xl font-bold text-sky-500 hover:brightness-110 cursor-pointer transition" onClick={() => navigate('/')}>
          Logo Here
        </span>
      </div>
      <div className="w-full overflow-y-hidden md:w-[850px] h-[500px] md:rounded-l-3xl shadow-md bg-slate-50 flex flex-col justify-center items-center md:items-start pl-2 md:pl-8 loginWrapper">
        <div className="h-[80px] w-full flex items-center md:mt-4">
          <span className="text-3xl leading-10 w-max bg-gradient-to-r from-sky-500 to-emerald-400 flex bg-clip-text font-bold text-transparent">
            Login
          </span>
        </div>
        <div className="h-[300px] w-full flex pt-4">
          <div className="h-full w-full md:w-1/2 flex flex-col">
            <form onSubmit={formik.handleSubmit}>
              <div className="h-[80px] w-full flex flex-col relative">
                <input
                  id="email"
                  type="email"
                  className={`h-11 w-[350px] border-2 ${
                    formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-slate-400'
                  } rounded-md pl-4 hover:shadow hover:shadow-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition cursor-pointer placeholder-transparent mb-1 peer`}
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-sky-400 font-bold -top-[10px] left-3 bg-slate-50 w-10 text-center peer-placeholder-shown:text-slate-300 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-lg peer-placeholder-shown:bg-transparent peer-placeholder-shown:-top-[-7px] peer-placeholder-shown:left-[19px] transition-all"
                >
                  Email
                </label>
                {formik.touched.email && formik.errors.email ? (
                  <>
                    <span className="text-xs pl-2 text-rose-400">{formik.errors.email}</span>
                    <FiAlertTriangle className="absolute top-[14px] right-[34px] text-md text-rose-400" />
                  </>
                ) : null}
              </div>
              <div className="h-[80px] w-full flex flex-col relative">
                <input
                  id="password"
                  type="password"
                  className={`h-11 w-[350px] border-2 ${
                    formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-slate-400'
                  }  rounded-md pl-4 pr-10 hover:shadow hover:shadow-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500 transition cursor-pointer placeholder-transparent mb-1 peer`}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-sky-400 font-bold -top-[10px] left-3 bg-slate-50 w-[66px] text-center peer-placeholder-shown:text-slate-300 peer-placeholder-shown:font-semibold peer-placeholder-shown:text-lg peer-placeholder-shown:bg-transparent peer-placeholder-shown:-top-[-7px] peer-placeholder-shown:left-[19px] transition-all"
                >
                  Password
                </label>
                {formik.touched.password && formik.errors.password ? (
                  <>
                    <span className="text-xs pl-2 text-rose-400">{formik.errors.password}</span>
                    <FiAlertTriangle className="absolute top-[14px] right-[34px] text-md text-rose-400" />
                  </>
                ) : null}
                <span
                  className="absolute h-max text-xl font-semibold text-sky-300 top-[12px] left-[315px] hover:brightness-110 transition cursor-pointer"
                  onClick={() => {
                    setShow(!show);
                    if (document.getElementById('password').type === 'password') {
                      document.getElementById('password').type = 'text';
                    } else {
                      document.getElementById('password').type = 'password';
                    }
                  }}
                >
                  {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="flex w-full h-11 items-center mb-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-[350px] h-full rounded-lg flex items-center justify-center gap-2 text-lg text-white font-bold ${
                    isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-sky-400 cursor-pointer hover:brightness-110 active:scale-95'
                  } transition shadow`}
                >
                  {isLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      <span>Logging in..</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </div>
            </form>
            <ForgetPasswordModal />
            <div className="flex-1 w-[350px] flex items-center justify-center relative">
              <div className="h-[2px] w-[95%] bg-slate-300 rounded-full" />
              <span className="absolute font-semibold text-sky-400 w-8 text-center bg-slate-50">Or</span>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/2 md:h-full">
            {invalid && (
              <div className="h-[90px] w-[350px] flex justify-center items-center rounded-xl gap-2 bg-rose-600 bg-opacity-80 text-white">
                <AiOutlineInfoCircle />
                <span className="font-medium">{invalid}</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-[100px] w-[350px] pt-1 flex flex-col items-center ">
          <button
            onClick={() => window.open(`${API_URL}/auth/google`, '_self')}
            className="w-[350px] h-12 rounded-lg bg-white flex items-center justify-center font-semibold gap-2 border-2 border-slate-300 hover:bg-amber-200 hover:border-amber-200 transition mb-3"
          >
            <FcGoogle />
            Login with Google
          </button>
          <span
            onClick={() => navigate('/register')}
            className="text-sm text-transparent w-[200px] bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text font-semibold text-center hover:brightness-110 cursor-pointer transition active:scale-95"
          >
            I don't have an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
