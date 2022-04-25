import { AiOutlineClose } from 'react-icons/ai';
import { FaBell, FaSearch, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavbarDashboard = ({ onChange, search, onClick }) => {
  return (
    <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed w-full top-0 left-0 flex items-center">
      <div className="flex justify-center items-center relative">
        <FaSearch className="absolute left-2 text-gray-400 bg-gray-100" />
        <input
          type="text"
          value={search}
          id="myInput"
          placeholder="Search..."
          onChange={onChange}
          className="search block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-2"
        />
        <AiOutlineClose className="hover cursor-pointer" onClick={onClick} />
      </div>

      <div className="ml-auto flex items-center">
        <div>
          <FaBell className="w-6 cursor-pointer hover:text-primary" />
        </div>

        <div className="ml-4 relative">
          <div className="cursor-pointer">
            <div>
              <FaUserAlt
                id="dropdown"
                className="h-4 w-4 object-cover hover:text-primary"
              />
            </div>

            <div
              id="dropdown_content"
              className="hidden absolute z-50 mt-2 rounded-md shadow-lg w-48 right-0 py-1 bg-white"
            >
              <div className="px-4 py-2 text-xs text-gray-400">
                Manage Account
              </div>
              <Link
                to="/"
                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
              >
                Profile
              </Link>

              <div className="border-t border-gray-100"></div>
              <Link
                to="/"
                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
