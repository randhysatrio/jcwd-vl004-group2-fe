import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { MdVerified, MdAddAPhoto } from 'react-icons/md';
import { BiDiamond } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');

      if (!token) {
        navigate('/', { replace: true });
      } else {
        const user = await Axios.get(`${API_URL}/user/find-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(user.data);
      }
    };
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      username: userData.username ? userData.username : '',
      phone_number: userData.phone_number ? userData.phone_number : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9 ]*$/, 'Name cannot contain special characters')
        .required('This field cannot be empty'),
      username: Yup.string().matches(/^[a-zA-Z0-9._]*$/, 'Only alphanumeric characters, contain no spaces, (-), (_), and (.) is allowed'),
      phone_number: Yup.string().matches(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/, 'Please enter a valid phone number'),
    }),
    onSubmit: async (values) => {
      alert('hi');
      console.log(values);
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center pt-10 py-20 relative">
      <div className="w-full h-32 bg-gradient-to-b from-sky-300 to-white absolute top-0 z-0"></div>
      <div className="relative z-1 h-full flex">
        <div className="w-[35vw] h-full px-4 mr-4 bg-white rounded-xl border flex flex-col">
          <div className="w-full py-1">
            <div className="w-full flex py-2">
              <span className="text-xl font-bold bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent mr-auto">
                My Profile
              </span>
              <button
                disabled={editMode}
                onClick={() => setEditMode(true)}
                className="h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 active:scale-95 transition"
              >
                <BsThreeDots className="text-sky-500" />
              </button>
            </div>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="w-full mt-4 mb-2 px-3 py-2 rounded-box border border-emerald-200 relative flex flex-col">
            <span className="text-sm font-semibold text-sky-400 bg-white px-1 absolute -top-3 left-4">Email:</span>
            <span type="text" className="text-lg font-light text-emerald-400">
              {userData.email}
            </span>
          </div>
          <div className="w-full my-4 py-2 rounded-box border border-emerald-200 relative">
            <span className="text-sm font-semibold text-sky-400 bg-white px-1 absolute -top-3 left-4">My Bio:</span>
            <form id="update-form" onSubmit={formik.handleSubmit}>
              <div className="w-full py-1 px-3 flex flex-col">
                <label className="text-md font-semibold text-sky-500">Name:</label>
                <div className="w-full flex flex-col relative">
                  {editMode ? (
                    <>
                      <input
                        id="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your name.."
                        className="text-lg focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-lg focus:outline-none font-light text-emerald-400">{userData.name}</span>
                  )}
                  <div
                    className={`${editMode ? 'w-full' : 'w-0'} h-[1px] ${
                      formik.touched.name && formik.errors.name ? 'bg-rose-300' : 'bg-sky-300'
                    }  transition-all duration-200`}
                  />
                  {editMode && formik.touched.name && formik.errors.name ? (
                    <span className="text-xs text-red-400 py-1 pl-1">{formik.errors.name}</span>
                  ) : null}
                </div>
              </div>
              <div className="w-full py-1 px-3 flex flex-col">
                <label className="text-md font-semibold text-sky-500">Username:</label>
                <div className="w-full flex flex-col relative">
                  {editMode ? (
                    <>
                      <input
                        id="username"
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter username.."
                        className="text-lg focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-lg focus:outline-none font-light text-emerald-400">
                      {userData.username ? 'userData.username' : `You haven't filled your username`}
                    </span>
                  )}
                  <div
                    className={`${editMode ? 'w-full' : 'w-0'} h-[1px] ${
                      formik.errors.username ? 'bg-rose-300' : 'bg-sky-300'
                    } transition-all duration-200`}
                  />
                  {editMode && formik.errors.username ? (
                    <span className="text-xs text-red-400 py-1 pl-1">{formik.errors.username}</span>
                  ) : null}
                </div>
              </div>
              <div className="w-full py-1 px-3 flex flex-col">
                <label className="text-md font-semibold text-sky-500">Phone:</label>
                <div className="w-full flex flex-col relative">
                  {editMode ? (
                    <>
                      <input
                        id="phone_number"
                        type="tel"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter phone number.."
                        className="text-lg focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-lg focus:outline-none font-light text-emerald-400">
                      {userData.phone_number ? userData.phone_number : `You haven't filled your phone number`}
                    </span>
                  )}
                  <div
                    className={`${editMode ? 'w-full' : 'w-0'} h-[1px] ${
                      formik.errors.phone_number ? 'bg-rose-300' : 'bg-sky-300'
                    } transition-all duration-200`}
                  />
                  {editMode && formik.errors.phone_number ? (
                    <span className="text-xs text-rose-400 font-semibold py-1 pl-1">{formik.errors.phone_number}</span>
                  ) : null}
                </div>
              </div>
            </form>
            <div className="w-full flex justify-center gap-2">
              <button
                onClick={() => setEditMode(false)}
                className={`w-28 ${
                  editMode ? 'visible h-9 mb-1 mt-5 opacity-100' : 'h-0 invisible opacity-0'
                } rounded-lg font-semibold hover:brightness-125 active:scale-95 text-white bg-rose-500 transition-all duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="update-form"
                className={`w-28 ${
                  editMode ? 'visible h-9 mb-1 mt-5 opacity-100' : 'h-0 invisible opacity-0'
                } rounded-lg font-semibold text-white ${
                  formik.errors.name || formik.errors.username || formik.errors.phone_number
                    ? 'bg-emerald-300'
                    : 'bg-emerald-500 hover:brightness-125 active:scale-95'
                }  transition-all duration-200`}
              >
                Save
              </button>
            </div>
          </div>
          <div className="w-full h-10 rounded-box border border-emerald-100"></div>
        </div>
        <div className="w-[16vw] h-72 bg-white rounded-xl border flex flex-col">
          <div className="w-full h-52 flex justify-center items-center relative">
            <div className="w-40 h-40 rounded-full flex justify-center items-center shadow bg-blue-100">
              <div className="w-[90%] h-[90%] rounded-full flex justify-center items-center overflow-hidden bg-white">
                <img className="h-full w-full object-contain" src={userData.profile_picture} />
              </div>
              <input id="profile-input" type="file" className="absolute invisible top-0" />
              {editMode && (
                <label
                  htmlFor="profile-input"
                  className={`h-9 w-9 rounded-full bg-gray-300 text-gray-700 flex justify-center items-center text-lg absolute top-[145px] right-9 cursor-pointer hover:brightness-105 active:scale-95 transition-all ${
                    editMode ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <MdAddAPhoto />
                </label>
              )}
            </div>
          </div>
          <div className="h-[2px] w-[90%] bg-gray-100 rounded-xl mx-auto" />
          <div className="w-full h-10 flex justify-center">
            <div className="max-w-full h-full flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
                {userData.name}
              </span>
            </div>
            <div className="h-full px-1 flex items-center text-sky-400">
              <MdVerified />
            </div>
          </div>
          <div className="w-full flex justify-center gap-1 divide-x-2 text-sm  text-slate-400">
            <div className="px-1 max-w-36 flex justify-center">
              <span className="font-semibold">#{userData.id}</span>
            </div>
            <div className="px-1 flex items-center gap-1">
              <BiDiamond className="text-sky-300 brightness-110" />
              <span className="font-bold">Diamond</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
