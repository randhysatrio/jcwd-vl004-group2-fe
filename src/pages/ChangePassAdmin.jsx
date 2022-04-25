import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { API_URL } from '../assets/constants';

const ChangePassAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      newpassword: '',
      password: '',
    },

    validationSchema: Yup.object({
      newpassword: Yup.string()
        .min(6)
        .required('Required')
        .matches(
          /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
          'password must cointain capital and number'
        ),
      password: Yup.string()
        .required('Required')
        .when('newpassword', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('newpassword')],
            'Both password must same'
          ),
        }),
    }),

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.patch(
          `${API_URL}/admin/auth/change-password`,
          {
            password: values.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsLoading(false);
        toast.success('password updated');
        setTimeout(() => navigate('/admin/login'), 7000);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">CHANGE PASSWORD</h2>
          <p className="text-slate-400 italic">
            Enter a new password below to change your password.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-3 my-5">
              <div>
                <label htmlFor="newpassword">New password</label>
                <div className="relative">
                  <input
                    id="newpassword"
                    name="newpassword"
                    type={showNewPass ? 'text' : 'password'}
                    placeholder="type password"
                    className={`input input-bordered w-full max-w-xs mt-2 pr-10 ${
                      formik.touched.newpassword && formik.errors.newpassword
                        ? 'border-red-400 bg-red-50'
                        : null
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newpassword}
                  />
                  {showNewPass ? (
                    <FiEyeOff
                      size={24}
                      className="absolute right-3 top-5 hover:cursor-pointer"
                      onClick={() => setShowNewPass(false)}
                    />
                  ) : (
                    <FiEye
                      size={24}
                      className="absolute right-3 top-5 hover:cursor-pointer"
                      onClick={() => setShowNewPass(true)}
                    />
                  )}
                </div>
                {formik.touched.newpassword && formik.errors.newpassword ? (
                  <div className="text-red-400 text-sm italic mt-2">
                    {formik.errors.newpassword}
                  </div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">Re-enter password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="retype password"
                    className={`input input-bordered w-full max-w-xs mt-2 pr-10 ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-400 bg-red-50'
                        : null
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {showPass ? (
                    <FiEyeOff
                      size={24}
                      className="absolute right-3 top-5 hover:cursor-pointer"
                      onClick={() => setShowPass(false)}
                    />
                  ) : (
                    <FiEye
                      size={24}
                      className="absolute right-3 top-5 hover:cursor-pointer"
                      onClick={() => setShowPass(true)}
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400 text-sm italic mt-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                type="submit"
                className="btn btn-block btn-primary"
                disabled={isLoading}
              >
                CHANGE MY PASSWORD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassAdmin;
