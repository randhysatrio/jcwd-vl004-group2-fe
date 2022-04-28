import {
  FaHome,
  FaShoppingBag,
  FaUserAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarDashboard = () => {
  return (
    <div className="fixed left-0 top-0 w-40 h-full bg-gray-800 shadow-md z-10">
      <div className="text-white font-bold text-base p-5 bg-gray-900">
        Heisen Berg Co.
      </div>
      <div className="py-5">
        <Link
          to="/"
          className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
        >
          <FaHome className="w-5 mr-3" />
          Dashboard
        </Link>

        <Link
          to="/"
          className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
        >
          <FaShoppingBag className="w-5 mr-3" />
          Category
        </Link>

        <Link
          to="/dashboard/product"
          className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
        >
          <FaHome className="w-5 mr-3" />
          Product
        </Link>

        <Link
          to="/dashboard/user"
          className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
        >
          <FaUserAlt className="w-5 mr-3" />
          User
        </Link>

        <Link
          to="/dashboard/transaction"
          className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
        >
          <FaShoppingCart className="w-5 mr-3" />
          Transaction
        </Link>
      </div>
    </div>
  );
};

export default SidebarDashboard;
