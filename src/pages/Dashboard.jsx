import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-16 bg-white shadow-sm px-8 fixed w-full top-0 left-0 flex items-center">
        <div className="relative">
          <FaSearch className="absolute left-2 top-2 w-6 text-gray-400" />
          <input
            type="text"
            className="block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
