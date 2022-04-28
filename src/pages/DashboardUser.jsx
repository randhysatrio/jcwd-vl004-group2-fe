import {
  FaSearch,
  FaBell,
  FaUserAlt,
  FaHome,
  FaBars,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/constants';
import NavbarDashboard from '../components/NavbarDashboard';
import SidebarDashboard from '../components/SidebarDashboard';

const Dashboard = () => {
  const Swal = require('sweetalert2');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const sortOptions = ['sortlowprice', 'sorthighprice'];

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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.patch(`${API_URL}/user/status/${id}`);
        } catch (error) {
          console.log(error);
        }
        Swal.fire('Changed!', 'Status has been changed!', 'success');
        fetchUsers();
      }
    });
  };

  //   const handleReset = () => {
  //     fetchProducts();
  //   };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onClick={() => setQuery('')}
      />
      <SidebarDashboard />

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
