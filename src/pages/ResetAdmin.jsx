import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetAdmin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handReset = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/auth/reset',
        {
          email,
        }
      );

      toast.success(response.data.message);
      setTimeout(() => navigate('/admin/login'), 7000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">RESET PASSWORD</h2>
          <p className="text-slate-400 italic">
            Please enter your email address below to receive a link.
          </p>
          <div className="flex flex-col  my-5">
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
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-block btn-primary" onClick={handReset}>
              RESET MY PASSWORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetAdmin;
