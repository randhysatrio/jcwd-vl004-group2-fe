import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FaSearch, FaUserAlt, FaShoppingBag } from 'react-icons/fa';
import AccountButton from './AccountButton';

const Header = () => {
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.user);
  const cartGlobal = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState('');

  return (
    // header
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <h1 className="text-lg font-bold text-slate-600 hover:brightness-110 transition cursor-pointer">Heizen Berg Co.</h1>
        </Link>
        {/* Searchbar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            navigate(`/products?keyword=${keyword}`);
            setKeyword('');
          }}
        >
          <div className="w-[500px] max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
              <FaSearch className="mt-1" />
            </span>
            <input
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
              placeholder="Search"
            />
            <button
              type="submit"
              className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center space-x-4 p-1">
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <Link to="/cart">
              <div className="text-2xl mb-1">
                <FaShoppingBag />
              </div>
              <div className="text-xs leading-3">Cart</div>
              <span className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                {cartGlobal.total_data}
              </span>
            </Link>
          </div>
          {userGlobal.name ? (
            <AccountButton>{userGlobal.name}</AccountButton>
          ) : (
            <Link to="/login">
              <div className="text-center text-gray-700 hover:text-primary transition relative group">
                <div className="text-2xl mb-1">
                  <FaUserAlt className="ml-2" />
                </div>
                <div className="text-xs leading-3">Account</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
