import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    if (token) navigate('/admin', { replace: true });
  }, []);

  const handLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('tokenAdmin', response.data.token);
      localStorage.setItem('dataAdmin', response.data.data);
      toast.success(response.data.message);
      dispatch({ type: 'AUTH_ADMIN', payload: response.data.data });
      navigate('/admin');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">LOGIN ADMIN</h2>
          <p className="text-slate-400 italic">
            Login here if you are admin of heizen berg co.
          </p>
          <div className="flex flex-col gap-y-3 my-5">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="mail"
                placeholder="example@mail.com"
                className="input input-bordered w-full max-w-xs mt-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="type password"
                  className="input input-bordered w-full max-w-xs mt-2 pr-10"
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text mr-2">Remember me</span>
                    <input type="checkbox" class="checkbox checkbox-primary" />
                  </label>
                </div>
              </div>
              <div>
                <Link to="/admin/reset" className="text-primary">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-block btn-primary" onClick={handLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
