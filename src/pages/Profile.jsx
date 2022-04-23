import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { AiOutlineEye, AiOutlineEyeInvisible, AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdVerified, MdAddAPhoto } from 'react-icons/md';
import { BiDiamond } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
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
      username: Yup.string()
        .matches(/^[a-zA-Z0-9._]*$/, 'Only alphanumeric characters, contain no spaces, (-), (_), and (.) is allowed')
        .nullable(),
      phone_number: Yup.string()
        .matches(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/, 'Please enter a valid phone number')
        .nullable(),
    }),
    onSubmit: async (values) => {
      try {
        setProfileLoading(true);

        const formData = new FormData();

        formData.append('data', JSON.stringify(values));

        if (profileImage) {
          formData.append('profile_picture', profileImage);
        }

        const response = await Axios.post(`${API_URL}/user/update-profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileLoading(false);

        if (response.data.conflict) {
          return toast.warning(response.data.message);
        }

        setUserData(response.data.user);
        document.getElementById('profile-picture').src = `${API_URL}/${response.data.user.profile_picture}`;

        toast.success(response.data.message, { position: 'bottom-left', theme: 'colored' });

        setEditMode(false);
      } catch (err) {
        setProfileLoading(false);

        toast.error('Unable to update profile', { position: 'bottom-left', theme: 'colored' });
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required('This field is required'),
      new_password: Yup.string()
        .matches(
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{6,}$/,
          'Password must consist of min. 6 characters, with 1 uppercase character, 1 number and no spaces'
        )
        .required('This field is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Please check your confirmation password')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      try {
        setPasswordLoading(true);

        const response = await Axios.post(
          `${API_URL}/user/update-password`,
          {
            password: values.current_password,
            newPass: values.new_password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPasswordLoading(false);

        if (response.data.conflict) {
          return toast.warning(response.data.message, { position: 'bottom-left', theme: 'colored' });
        }

        toast.success(response.data, { position: 'bottom-left', theme: 'colored' });
        formikPassword.resetForm();
      } catch (err) {
        setPasswordLoading(false);

        toast.error('Unable to change password');
      }
    },
  });

  return (
    <div className="w-full h-max flex flex-col items-center py-11 relative">
      <div className="w-full h-32 bg-gradient-to-b from-sky-200 to-white absolute top-0 z-0"></div>
      <div className="relative z-1 h-full flex">
        <div className="w-[35vw] h-max px-4 mr-4 bg-white rounded-box border flex flex-col">
          <div className="w-full py-1">
            <div className="w-full flex py-2">
              <span className="text-xl font-bold bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent mr-auto">
                My Profile
              </span>
              <button
                disabled={editMode}
                onClick={() => setEditMode(true)}
                className={`h-7 w-7 flex justify-center items-center rounded-full ${
                  editMode ? 'bg-gray-200 cursor-default' : 'bg-white hover:bg-gray-200 active:scale-95'
                }  transition`}
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
                        className="text-xl focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-xl focus:outline-none font-light text-emerald-400">{userData.name}</span>
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
                        className="text-xl focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-xl focus:outline-none font-light text-emerald-400">
                      {userData.username ? userData.username : `You haven't filled your username`}
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
                        className="text-xl focus:outline-none font-light placeholder:text-emerald-400 text-emerald-400"
                      />
                    </>
                  ) : (
                    <span className="text-xl focus:outline-none font-light text-emerald-400">
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
                onClick={() => {
                  setEditMode(false);
                  setProfileImage(null);
                  formik.resetForm();
                }}
                className={`w-28 ${
                  editMode ? 'visible h-10 mb-1 mt-5 opacity-100' : 'h-0 invisible opacity-0'
                } rounded-lg font-semibold hover:brightness-125 active:scale-95 text-white bg-rose-500 transition-all duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="update-form"
                disabled={
                  (formik.values.name === userData.name &&
                    (formik.values.username === userData.username || formik.values.username === '') &&
                    (formik.values.phone_number === userData.phone_number || formik.values.phone_number === '') &&
                    !profileImage) ||
                  profileLoading
                }
                className={`w-28 ${
                  editMode ? 'visible h-10 mb-1 mt-5 opacity-100' : 'h-0 invisible opacity-0'
                } rounded-lg font-semibold text-white ${
                  formik.errors.name ||
                  formik.errors.username ||
                  formik.errors.phone_number ||
                  (formik.values.name === userData.name &&
                    (formik.values.username === userData.username || formik.values.username === '') &&
                    (formik.values.phone_number === userData.phone_number || formik.values.phone_number === '') &&
                    !profileImage) ||
                  profileLoading
                    ? 'bg-emerald-200 cursor-default'
                    : 'bg-emerald-500 hover:brightness-125 active:scale-95'
                }  transition-all flex items-center justify-center gap-1 duration-200`}
              >
                {profileLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Updating..
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>
          <div className="w-full mt-2 mb-4 pt-3 px-1 rounded-box border border-emerald-200 relative flex flex-col">
            <span className="text-sm font-semibold text-sky-400 bg-white px-1 absolute -top-3 left-4">Change Password:</span>
            <form onSubmit={formikPassword.handleSubmit}>
              {formikPassword.touched.current_password || formikPassword.touched.new_password || formikPassword.touched.confirm_password ? (
                <button
                  onClick={formikPassword.resetForm}
                  className="font-bold flex flex-col items-center text-red-400 transition hover:brightness-110 active:scale-95 absolute top-4 right-6"
                >
                  <AiFillCloseCircle className="text-lg" />
                  <span className="text-xs">Cancel</span>
                </button>
              ) : null}
              <div className="w-full py-2 flex gap-2">
                <div className="w-36 pt-[2px] flex justify-end">
                  <label className="text-sm font-semibold text-sky-400">Current Password:</label>
                </div>
                <div className="flex flex-col relative">
                  <div
                    onClick={() => {
                      if (document.getElementById('current_password').type === 'password') {
                        document.getElementById('current_password').type = 'text';
                      } else {
                        document.getElementById('current_password').type = 'password';
                      }
                      setShowOld(!showOld);
                    }}
                    className="absolute right-1 top-1 text-sky-500 hover:brightness-125 cursor-pointer"
                  >
                    {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                  <input
                    id="current_password"
                    type="password"
                    value={formikPassword.values.current_password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    className={`w-52 border-b ${
                      formikPassword.touched.current_password && formikPassword.errors.current_password
                        ? 'border-red-300'
                        : 'border-sky-300 focus:border-emerald-300'
                    }  focus:outline-none mb-1`}
                  />
                  {formikPassword.touched.current_password && formikPassword.errors.current_password ? (
                    <span className="text-[11px] w-52 text-rose-400">{formikPassword.errors.current_password}</span>
                  ) : null}
                </div>
              </div>
              <div className="w-full py-2 flex gap-2">
                <div className="w-36 pt-[2px] flex justify-end">
                  <label className="text-sm font-semibold text-sky-400">New Password:</label>
                </div>
                <div className="flex flex-col relative">
                  <div
                    onClick={() => {
                      if (document.getElementById('new_password').type === 'password') {
                        document.getElementById('new_password').type = 'text';
                      } else {
                        document.getElementById('new_password').type = 'password';
                      }
                      setShowNew(!showNew);
                    }}
                    className="absolute right-1 top-1 text-sky-500 hover:brightness-125 cursor-pointer mb-1"
                  >
                    {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                  <input
                    id="new_password"
                    type="password"
                    value={formikPassword.values.new_password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    className={`w-52 border-b ${
                      formikPassword.touched.new_password && formikPassword.errors.new_password
                        ? 'border-red-300'
                        : 'border-sky-300 focus:border-emerald-300'
                    } mb-1 focus:outline-none`}
                  />
                  {formikPassword.touched.new_password && formikPassword.errors.new_password ? (
                    <span className="text-[11px] w-52 text-rose-400">{formikPassword.errors.new_password}</span>
                  ) : null}
                </div>
              </div>
              <div className="w-full py-2 flex gap-2">
                <div className="w-36 pt-[2px] flex justify-end">
                  <label className="text-sm font-semibold text-sky-400">Confirm Password:</label>
                </div>
                <div className="flex flex-col relative">
                  <div
                    onClick={() => {
                      if (document.getElementById('confirm_password').type === 'password') {
                        document.getElementById('confirm_password').type = 'text';
                      } else {
                        document.getElementById('confirm_password').type = 'password';
                      }
                      setShowConf(!showConf);
                    }}
                    className="absolute right-1 top-1 text-sky-500 hover:brightness-125 cursor-pointer"
                  >
                    {showConf ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                  <input
                    id="confirm_password"
                    type="password"
                    value={formikPassword.values.confirm_password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    className={`w-52 border-b ${
                      formikPassword.touched.confirm_password && formikPassword.errors.confirm_password
                        ? 'border-red-300'
                        : 'border-sky-300 focus:border-emerald-300'
                    } mb-1 focus:outline-none`}
                  />
                  {formikPassword.touched.confirm_password && formikPassword.errors.confirm_password ? (
                    <span className="text-[11px] text-rose-400">{formikPassword.errors.confirm_password}</span>
                  ) : null}
                </div>
              </div>
              <div className="w-full flex justify-center py-3">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className={`h-10 w-44 rounded-xl bg-gradient-to-r ${
                    formikPassword.errors.current_password ||
                    formikPassword.errors.new_password ||
                    formikPassword.errors.confirm_password ||
                    passwordLoading
                      ? 'from-sky-300 to-emerald-300 cursor-default'
                      : 'from-sky-500 to-emerald-500 active:scale-95 hover:brightness-110'
                  } font-semibold text-white transition`}
                >
                  {passwordLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Updating..
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[16vw] h-72 bg-white rounded-xl border flex flex-col">
          <div className="w-full h-52 flex justify-center items-center relative">
            <div className="w-40 h-40 rounded-full flex justify-center items-center shadow bg-blue-100">
              <div className="w-[90%] h-[90%] rounded-full flex justify-center items-center overflow-hidden bg-white">
                <img
                  id="profile-picture"
                  className="h-full object-cover"
                  src={profileImage ? URL.createObjectURL(profileImage) : `${API_URL}/${userData.profile_picture}`}
                />
              </div>
              <input
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                }}
                id="profile-input"
                type="file"
                accept="image/*"
                className="absolute invisible top-0"
              />
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
            {userData.is_verified === 'verified' ? (
              <div className="h-full px-1 flex items-center text-sky-400">
                <MdVerified />
              </div>
            ) : null}
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
