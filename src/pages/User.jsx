import { useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdPayment } from 'react-icons/md';

const User = () => {
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification.alert);
  const history = useSelector((state) => state.notification.history);
  const awaiting = useSelector((state) => state.notification.awaiting);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (!userToken) {
      navigate('/', { replace: true });
    } else if (adminToken) {
      navigate('/dashboard', { replace: true });
    }
  }, []);

  const SidebarLink = ({ children, icon, to, end, notification }) => {
    return (
      <NavLink to={to} end={end}>
        {({ isActive }) => (
          <div className="w-full h-12 flex items-center my-1 px-2">
            <div
              className={`w-full h-full pl-3 flex items-center rounded-lg text-md lg:text-lg ${
                isActive ? 'hover:bg-sky-300 bg-white bg-opacity-80 backdrop-blur-sm' : 'hover:bg-sky-300'
              } font-bold transition group`}
            >
              <span
                className={`h-2 w-2 rounded-full bg-green-300 ${
                  isActive ? 'opacity-100 translate-x-0 mx-1' : 'opacity-0 -translate-x-2'
                } transition-all absolute`}
              ></span>
              <div
                className={`flex items-center gap-2 ${
                  isActive ? 'translate-x-5 text-sky-400 group-hover:text-white' : 'translate-x-0 group-hover:text-white text-sky-500'
                } transition`}
              >
                <div className="relative">
                  {icon}
                  {notification && <span className={`top-0 -right-[2px] absolute h-[7px] w-[7px] rounded-full bg-red-400`}></span>}
                </div>
                <div>
                  <span>{children}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex justify-end relative">
        <div className="hidden md:flex py-2 flex-col w-[22vw] xl:w-1/5 min-h-full bg-gradient-to-t from-white to-sky-100 shadow-r">
          <SidebarLink to={'/user'} icon={<AiOutlineUser />} end>
            Profile
          </SidebarLink>
          <SidebarLink to={'address'} icon={<IoLocationOutline />}>
            Address
          </SidebarLink>
          <SidebarLink to={'payment'} icon={<MdPayment />} notification={awaiting}>
            Payments
          </SidebarLink>
          <SidebarLink to={'history'} icon={<AiOutlineHistory />} notification={history}>
            History
          </SidebarLink>
          <SidebarLink to={'notification'} icon={<FiMail />} notification={notification}>
            Notifications
          </SidebarLink>
        </div>
        <div className="w-full md:w-[78vw] xl:w-5/6 min-h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
