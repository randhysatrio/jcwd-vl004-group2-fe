import { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangePassAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(6)
        .required('Required')
        .matches(
          /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
          'password must cointain capital and number'
        ),
    }),

    onSubmit: async (values) => {
      try {
        await axios.patch(
          `http://localhost:5000/admin/auth/change-password`,
          {
            password: values,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        toast.success('password updated');
        setTimeout(() => navigate('/admin/login'), 7000);
      } catch (error) {
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
            <div className="flex flex-col my-5">
              <div>
                <label htmlFor="password">New password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="type password"
                    className="input input-bordered w-full max-w-xs mt-2 pr-10"
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
              <button type="submit" className="btn btn-block btn-primary">
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
