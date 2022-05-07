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
import { useLocation, useSearchParams } from "react-router-dom";
import { API_URL } from "../assets/constants";
import AdminPagination from "../components/AdminPagination";

const Dashboard = () => {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleSort = async (e) => {
    let query = e.target.value;
    const res = await axios.get(
      `httphttp://localhost:5000/product/sortprice/?q=${query}`
    );
    setUsers(res.data);
  };

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [status, setStatus] = useState();

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/user/all`);
    setUsers(res.data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await axios.post(`${API_URL}/user/query`, {
        active: status,
        keyword: searchParams.get("keyword"),
      });
      setUsers(userList.data.users);
      setMaxPage(Math.ceil(userList.data.length / 5));
      setPage(1);
    };
    fetchUsers();
  }, [search, status]);

  console.log(users);

  const renderUsers = () => {
    const beginningIndex = (page - 1) * 5;
    const currentData = users.slice(beginningIndex, beginningIndex + 5);
    return currentData.map((value) => {
      return (
        <UserTable
          key={value.id}
          user={value}
          handleStatusClick={handleStatusClick}
        />
      );
    });
  };

  const renderPages = () => {
    const pagination = [];
    for (let i = 1; i <= maxPage; i++) {
      pagination.push(i);
    }
    return pagination.map((value) => {
      return (
        <AdminPagination key={value} pagination={value} setPage={setPage} />
      );
    });
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between py-7 px-10">
        <h1 className="text-3xl text-gray-700 font-bold">User</h1>
        <div className="flex justify-between items-center space-x-4">
          <select
            name=""
            id=""
            onChange={(e) => setStatus(e.target.value)}
            className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl"
          >
            <option value="">Filter by Status</option>
            {/*sequelize uses "1" and "0" as boolean value */}
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow-sm p-5">
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
          <tbody>{renderUsers()}</tbody>
        </table>
        <div className="mt-3 flex justify-center items-center gap-4 pt-3">
          <button onClick={prevPageHandler}>
            <FaArrowLeft />
          </button>
          <div>
            Page {page} of {maxPage}
          </div>
          <button onClick={nextPageHandler}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
