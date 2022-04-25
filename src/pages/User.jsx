import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';

import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
  const SidebarLink = ({ children, icon, to, end }) => {
    return (
      <NavLink to={to} end={end}>
        {({ isActive }) => (
          <div className="w-full h-12 flex items-center my-1 px-2">
            <div
              className={`w-full h-full pl-3 flex items-center rounded-lg text-lg ${
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
                {icon}
                <span>{children}</span>
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
        <div className="w-1/5 min-h-full bg-gradient-to-t from-white to-sky-100 py-2 flex flex-col shadow-r">
          <SidebarLink to={'/user'} icon={<AiOutlineUser />} end>
            Profile
          </SidebarLink>
          <SidebarLink to={'address'} icon={<IoLocationOutline />}>
            Address
          </SidebarLink>
          <SidebarLink to={'history'} icon={<AiOutlineHistory />}>
            History
          </SidebarLink>
        </div>
        <div className="w-4/5 min-h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
