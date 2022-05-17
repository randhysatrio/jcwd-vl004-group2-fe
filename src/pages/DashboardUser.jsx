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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

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
  const [userNotFound, setUserNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const fetchUsers = async () => {
    const userList = await axios.post(`${API_URL}/user/query`, {
      active: status,
      keyword: searchParams.get("keyword"),
    });
    setUsers(userList.data.users);
    setMaxPage(Math.ceil(userList.data.length / 5));
    setPage(1);
  };

  const debouncedSearch = useDebounce(keyword, 1000);

  const loadingFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const userList = await axios.post(
        `${API_URL}/user/query?keyword=${debouncedSearch}`,
        {
          active: status,
        }
      );
      if (userList.data.length) {
        setUsers(userList.data.users);
        setMaxPage(Math.ceil(userList.data.length / 5));
        setTimeout(loadingFalse, 500);
      } else {
        setTimeout(loadingFalse, 1000);
        setUserNotFound(true);
      }
    };
    fetchUsers();
  }, [debouncedSearch, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

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
        // <AdminPagination key={value} pagination={value} setPage={setPage} />
        <option key={value}>{value}</option>
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

  const renderAlert = () => {
    Swal.fire({
      text: "User Not Found!",
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setUserNotFound(false);
          // go back to current url i intended to delete all the params in the url when using params
          setKeyword("");
          navigate(pathname);
          setStatus("");
        } catch (error) {
          console.log(error);
        }
        fetchUsers();
      }
    });
  };

  return (
    <div className="h-full w-full bg-gray-100">
      {/* Search Bar */}
      <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed z-[3] w-10 top-0 left-0 flex items-center">
        <div className="flex justify-center items-center relative">
          <FaSearch
            // onClick={() => {
            //   setSearchParams({ keyword }, { replace: true });
            // }}
            className="absolute left-2 text-gray-400 bg-gray-100 active:scale-95 transition"
          />
          <input
            type="text"
            value={keyword}
            id="myInput"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            className="search block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-7"
          />

          <AiOutlineClose
            onClick={() => {
              setKeyword("");
              navigate(pathname);
            }}
            className="hover:brightness-110 cursor-pointer absolute right-2"
          />
        </div>
      </div>
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
      {loading ? (
        <div className="bg-white shadow-sm p-5">
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
          </table>
          <div class="flex h-screen w-full items-center justify-center">
            <button
              type="button"
              class="flex items-center rounded-lg bg-primary px-4 py-2 text-white"
              disabled
            >
              <svg
                class="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="font-medium"> Processing... </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm p-5">
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
              {userNotFound ? <>{renderAlert()}</> : <>{renderUsers()}</>}
            </tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 pt-3">
            <button
              onClick={prevPageHandler}
              className={
                page === 1 ? `hover:cursor-not-allowed` : `hover:cursor-pointer`
              }
              disabled={page === 1}
            >
              <FaArrowLeft />
            </button>
            <div>
              Page{" "}
              {/* eventhough the type is number the value of the option still could be a string make sure add +e.target.value */}
              <select
                type="number"
                className="bg-gray-100"
                value={page}
                onChange={(e) => setPage(+e.target.value)}
              >
                {renderPages()}
              </select>{" "}
              of {maxPage}
            </div>
            <button
              onClick={nextPageHandler}
              className={
                page === maxPage
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={page === maxPage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
