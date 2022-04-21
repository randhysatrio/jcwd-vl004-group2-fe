import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';
import { BiChevronRight } from 'react-icons/bi';

import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
  const SidebarLink = ({ children, icon, to, end }) => {
    return (
      <NavLink to={to} end={end}>
        {({ isActive }) => (
          <div className="w-full h-12 flex items-center py-1 px-2">
            <div
              className={`w-full h-full pl-3 flex items-center rounded-lg text-lg ${
                isActive ? 'hover:bg-white' : 'hover:bg-sky-400'
              } font-bold transition group`}
            >
              <span
                className={`h-2 w-2 rounded-full bg-green-400 ${
                  isActive ? 'opacity-100 translate-x-0 mx-1' : 'opacity-0 -translate-x-2'
                } transition-all absolute`}
              ></span>
              <div
                className={`flex items-center gap-2 ${
                  isActive ? 'translate-x-5 text-blue-400' : 'translate-x-0 group-hover:text-white text-slate-500'
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
        <div className="w-1/5 min-h-full bg-white py-2 flex flex-col border-r">
          <SidebarLink to={'/user'} icon={<AiOutlineUser />} end>
            Profile
          </SidebarLink>
          <SidebarLink to={'history'} icon={<AiOutlineHistory />}>
            History
          </SidebarLink>
        </div>
        <div className="w-4/5 h-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
