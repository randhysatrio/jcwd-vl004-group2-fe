import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';

import Axios from 'axios';
import { API_URL } from '../assets/constants';

const ForgetPasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <div className="w-[350px] h-9 flex justify-center items-center">
        <span
          onClick={() => {
            setOpen(!open);
          }}
          className="text-sm font-semibold text-slate-400 hover:text-sky-500 transition cursor-pointer"
        >
          Forgot your password?
        </span>
      </div>

      <Transition as={Fragment} show={open}>
        <Dialog
          as="div"
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
          className="fixed flex justify-center z-10 items-center inset-0 overflow-y-auto"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-50 -translate-y-20"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-50 -translate-y-20"
          >
            <div className="w-[600px] h-[300px] rounded-lg bg-white z-20 flex flex-col justify-center items-center border-2 border-sky-400 ring ring-offset-2 ring-sky-400 forgetModalBody relative">
              <button
                className="font-bold text-xl text-bold absolute top-3 right-3 text-sky-500 outline-none hover:rotate-180 transition duration-300 active:scale-90"
                onClick={() => {
                  setError('');
                  setEmail('');
                  setOpen(!open);
                }}
              >
                <AiOutlineClose />
              </button>
              <div className="w-max h-max flex justify-center bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text mb-1">
                {sent ? (
                  <span className="text-2xl font-bold text-transparent">Almost there..!</span>
                ) : (
                  <span className="text-2xl font-bold text-transparent">Please enter your email address..</span>
                )}
              </div>
              <div className="w-full h-[90px] flex flex-col pt-5 items-center">
                {sent ? (
                  <span className="text-md font-semibold text-sky-500">
                    Please follow the link on the email we've send you to continue this process
                  </span>
                ) : (
                  <>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-2/3 h-10 px-4 rounded-lg focus:outline-none border-2 ${
                        error ? 'border-red-400' : 'border-slate-400'
                      } focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition cursor-pointer mb-1`}
                    />
                    {error && <span className="text-sm text-red-400">{error}</span>}
                  </>
                )}
              </div>
              <div className="w-full flex justify-center">
                {sent ? (
                  <button
                    className="py-2 px-10 bg-sky-400 rounded-xl hover:brightness-110 text-lg text-slate-50 font-semibold transition cursor-pointer active:scale-95"
                    onClick={() => setOpen(!open)}
                  >
                    Ok, got it!
                  </button>
                ) : (
                  <button
                    className="py-2 px-10 bg-sky-400 rounded-xl hover:brightness-110 text-lg text-slate-50 font-semibold transition cursor-pointer active:scale-95"
                    onClick={async () => {
                      setError('');

                      if (!email) {
                        setError('This field is required');
                      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                        setError('Please enter a valid email address!');
                      } else {
                        try {
                          const response = await Axios.post(`${API_URL}/auth/passwordlink`, {
                            email,
                          });

                          if (response.data.userNotFound) {
                            setError(response.data.userNotFound);
                          }

                          if (response.data.sent) {
                            setSent(!sent);
                          }
                        } catch (err) {
                          toast.error('Server Error', { position: 'bottom-left', theme: 'colored' });
                        }
                      }
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgetPasswordModal;
