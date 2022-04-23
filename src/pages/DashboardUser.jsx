import {
  FaSearch,
  FaBell,
  FaUserAlt,
  FaHome,
  FaBars,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import { API_URL } from "../assets/constants";

const Dashboard = () => {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const sortOptions = ["sortlowprice", "sorthighprice"];

  const handleSort = async (e) => {
    let query = e.target.value;
    const res = await axios.get(
      `httphttp://localhost:5000/product/sortprice/?q=${query}`
    );
    setUsers(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/user/all`);
    setUsers(res.data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${API_URL}/user/all`);
      setUsers(res.data);
    };
    // if (query.length === 0 || query.length > 2) fetchUsers();
    fetchUsers();
  }, []);

  console.log(users);

  //   const handleEditClick = async (event, value) => {
  //     const id = value.id;
  //     navigate(`editproduct/?${id}`);
  //   };

  const handleStatusClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.patch(`${API_URL}/user/status/${id}`);
        } catch (error) {
          console.log(error);
        }
        Swal.fire("Changed!", "Status has been changed!", "success");
        fetchUsers();
      }
    });
  };

  //   const handleReset = () => {
  //     fetchProducts();
  //   };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed w-full top-0 left-0 flex items-center">
        <div className="flex justify-center items-center relative">
          <FaSearch className="absolute left-2 text-gray-400 bg-gray-100" />
          <input
            id="myInput"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            className="search block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-2"
          />
          <AiOutlineClose className="hover cursor-pointer" />
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
                <a
                  href="#"
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
                >
                  Profile
                </a>
                <div className="border-t border-gray-100"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 w-40 h-full bg-gray-800 shadow-md z-10">
        <div className="text-white font-bold text-base p-5 bg-gray-900">
          Heisen Berg Co.
        </div>
        <div className="py-5">
          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaHome className="w-5 mr-3" />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaShoppingBag className="w-5 mr-3" />
            Category
          </a>

          <a
            href="http://localhost:3000/dashboard/product"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaHome className="w-5 mr-3" />
            Product
          </a>

          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaUserAlt className="w-5 mr-3" />
            User
          </a>
        </div>
      </div>

      <div className="pt-16 pr-8 pl-48">
        <div className="py-7 px-10">
          <div>
            <h1 className="text-3xl text-gray-700 font-bold">User</h1>
          </div>
          <div className="flex justify-between items-center space-x-4">
            {/* <div>
              <select
                name=""
                id=""
                onChange={(e) => setCurrentCategory(+e.target.value)}
                className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl "
              >
                <option value="">Sort Category</option>
                {categories.map((value) => (
                  <CategoryList
                    ref={categoryId}
                    key={value.id}
                    category={value}
                  />
                ))}
              </select>
            </div> */}
            {/* <div>
              <select
                name=""
                id=""
                onChange={(e) => setCurrentSortPrice(e.target.value)}
                className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl"
              >
                <option value="">Sort by Status</option>
                <option value="price_sell,ASC">Lowest Price</option>
                <option value="price_sell,DESC">Highest Price</option>
              </select>
            </div> */}
          </div>
          <div className="bg-white shadow-sm mt-5 p-5">
            {/* <form action=""></form> */}
            <table className="w-full">
              <thead>
                <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                  <th className="py-4 px-4 text-center">ID</th>
                  <th className="py-4 px-4 text-center">Profile Picture</th>
                  <th className="py-4 px-4 text-center">Name</th>
                  <th className="py-4 px-4 text-center">Email</th>
                  <th className="py-4 px-4 text-center">Phone</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((value) => (
                  <UserTable
                    key={value.id}
                    user={value}
                    handleStatusClick={handleStatusClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
