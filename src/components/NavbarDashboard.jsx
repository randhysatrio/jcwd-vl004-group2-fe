import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AiOutlineClose } from 'react-icons/ai';
import { FaBell, FaSearch, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavbarDashboard = ({ onChange, value, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.instance);
  const notification = useSelector((state) => state.notification.alert);

  return (
    <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed z-[3] w-full top-0 left-0 flex items-center">
      <div className="flex justify-center items-center relative">
        <FaSearch className="absolute left-2 text-gray-400 bg-gray-100" />
        <input
          type="text"
          value={value}
          id="myInput"
          placeholder="Search..."
          onChange={onChange}
          className="search block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-7"
        />
        <AiOutlineClose className="hover cursor-pointer absolute right-2" onClick={onClick} />
      </div>

      <div className="ml-auto flex items-center">
        <div className="relative">
          <FaBell className="w-6 cursor-pointer hover:text-primary" />
          {notification && <span className="h-2 w-2 top-0 right-[3px] rounded-full bg-red-500 absolute"></span>}
        </div>

        <div className="ml-4 relative dropdown dropdown-end">
          <label tabIndex={0}>
            <FaUserAlt className="h-4 w-4 cursor-pointer object-cover hover:text-primary" />
          </label>

          <ul tabIndex={0} className="dropdown-content menu bg-gray-50 shadow-md px-1 rounded-lg w-32 divide-y">
            {/* link to admin profile here */}
            <Link to="/">
              <li className="py-1 font-semibold text-gray-600 group">
                <div className="w-full h-8 rounded-lg group-hover:bg-sky-100 group-hover:text-sky-400 transition font-semibold">
                  Profile
                </div>
              </li>
            </Link>
            <li
              onClick={() => {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('dataAdmin');
                dispatch({ type: 'ADMIN_LOGOUT' });
                socket?.disconnect();

                navigate('/admin/login', { replace: true });
              }}
              className="py-1 font-semibold text-rose-600 group"
            >
              <div className="w-full h-8 rounded-lg group-hover:bg-red-50 group-hover:text-rose-400 transition font-semibold">Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
