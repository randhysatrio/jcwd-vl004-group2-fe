import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import '../assets/styles/Register.css';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineInfoCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate(-1, { replace: true });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9 ]*$/, 'Name cannot contain special characters')
        .required('This field is required'),
      email: Yup.string().email('Please enter a valid email address').required('This field is required'),
      password: Yup.string()
        .matches(
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{6,}$/,
          'Password must consist of min. 6 characters, with 1 uppercase character, 1 number and no spaces'
        )
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      const response = await Axios.post(`${API_URL}/auth/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.data.errMsg) {
        return setErrMsg(response.data.errMsg);
      } else {
        localStorage.setItem('userToken', response.data.token);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data.user,
        });

        navigate('/', { replace: true });
      }
    },
  });

  return (
    <div className="flex justify-center relative overflow-y-hidden registerBody">
      <div className="absolute top-5 left-8">
        <span className="text-2xl font-bold text-orange-100 hover:brightness-110 cursor-pointer transition" onClick={() => navigate('/')}>
          Logo Here
        </span>
      </div>
      <div className={`h-full w-1/3 flex-col items-center ${errMsg ? 'pt-0' : 'pt-4'} shadow-md registerWrapper`}>
        <div className="h-[75px] w-max bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text mx-auto pt-5">
          <span className="text-[27px] text-transparent font-bold">Create Account</span>
        </div>
        {errMsg && (
          <div className="h-[85px] w-full mb-1 py-2 flex justify-center">
            <div className="w-9/12 h-full bg-rose-600 bg-opacity-80 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-white">
              <AiOutlineInfoCircle />
              <span>{errMsg}</span>
            </div>
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full h-max flex flex-col items-center">
            <div className="w-9/12 h-[90px] flex flex-col">
              <label htmlFor="name" className="text-md font-bold text-sky-400 mb-[3px] cursor-pointer">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Insert your name.."
                  className={`h-11 pl-3 rounded-lg border-2 w-full ${
                    formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-gray-300 '
                  } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-300 transition placeholder:text-sky-300 placeholder:font-semibold mb-[3px] cursor-pointer`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <AiOutlineInfoCircle className="text-red-400 text-lg absolute top-3 right-3" />
                ) : null}
              </div>
              {formik.touched.name && formik.errors.name ? <span className="text-xs text-red-400 pl-2">{formik.errors.name}</span> : null}
            </div>
            <div className="w-9/12 h-[90px] flex flex-col">
              <label htmlFor="email" className="text-md font-bold text-sky-400 mb-[3px] cursor-pointer">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Insert your email.."
                  className={`h-11 w-full pl-3 rounded-lg border-2 ${
                    formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 '
                  } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-300 transition placeholder:text-sky-300 placeholder:font-semibold mb-[3px] cursor-pointer`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <AiOutlineInfoCircle className="text-red-400 text-lg absolute top-3 right-3" />
                ) : null}
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className="text-xs text-red-400 pl-2">{formik.errors.email}</span>
              ) : null}
            </div>
            <div className="w-9/12 h-[102px] flex flex-col">
              <label htmlFor="password" className="text-md font-bold text-sky-400 mb-[3px] cursor-pointer">
                Password
              </label>
              <div className="relative">
                <span
                  className="absolute h-fit top-[14px] left-3 cursos-pointer text-lg text-sky-300 hover:text-sky-200 transition cursor-pointer"
                  onClick={() => {
                    if (document.getElementById('password').type === 'password') {
                      document.getElementById('password').type = 'text';
                    } else {
                      document.getElementById('password').type = 'password';
                    }
                    setShow(!show);
                  }}
                >
                  {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="Insert your password.."
                  className={`h-11 w-full pl-9 rounded-lg ${
                    formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300 '
                  } border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-300 transition placeholder:text-sky-300 placeholder:font-semibold mb-[3px] cursor-pointer`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <AiOutlineInfoCircle className="text-red-400 text-lg absolute top-3 right-3" />
                ) : null}
              </div>
              {formik.touched.password && formik.errors.password ? (
                <span className="text-xs text-red-400 pl-2">{formik.errors.password}</span>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-9/12 h-11 mt-2 rounded-lg text-white font-semibold bg-sky-400 hover:brightness-110 transition cursor-pointer active:scale-95 shadow-sm"
            >
              Sign-up
            </button>
            <div className="w-9/12 flex gap-1 text-sm justify-center mt-2">
              <span>By signing-up I agrees to our</span>
              <span className="font-semibold text-sky-400 hover:brightness-125 transition cursor-pointer">Terms and Condition</span>
            </div>
          </div>
        </form>
        <div className="w-full h-8 relative flex items-center justify-center my-2">
          <div className="h-[2px] w-9/12 bg-slate-300 mx-auto" />
          <span className="w-8 bg-white font-semibold text-sky-400 text-center absolute">Or</span>
        </div>
        <div className="w-full h-24 flex flex-col items-center">
          <button
            className="w-[75%] h-12 rounded-lg flex items-center justify-center gap-2 border-2 bg-white border-slate-300 hover:bg-amber-200 hover:border-amber-200 transition font-semibold active:scale-95 mb-3"
            onClick={() => {
              window.open(`${API_URL}/auth/google`, '_self');
            }}
          >
            {' '}
            <FcGoogle />
            Sign-in with Google
          </button>
          <span
            onClick={() => navigate('/login')}
            className="text-sm text-transparent w-[200px] bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text font-semibold text-center hover:brightness-110 cursor-pointer transition active:scale-95"
          >
            I already have an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
