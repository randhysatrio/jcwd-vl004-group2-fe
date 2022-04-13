import { FaHeart, FaSearch, FaUserAlt, FaShoppingBag } from "react-icons/fa";

const Header = () => {
  return (
    // header
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <h1 className="text-lg">Heisen Berg Co.</h1>
        {/* Searchbar */}
        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <FaSearch className="mt-1" />
          </span>
          <input
            type="text"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
            placeholder="Search"
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
            <FaHeart className="ml-2" />
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
              8
            </span>
          </a>
          <a
            href="#"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <FaShoppingBag />
            </div>
            <div className="text-xs leading-3">Cart</div>
            <span className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
              8
            </span>
          </a>
          <a
            href="#"
            className="text-center text-gray-700 hover:text-primary transition relative group"
          >
            <div className="text-2xl">
              <FaUserAlt className="ml-2" />
            </div>
            <div className="text-xs leading-3">Account</div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
