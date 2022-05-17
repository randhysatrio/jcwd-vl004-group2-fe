import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiCalendar, FiMinus, FiFilter } from "react-icons/fi";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_URL } from "../assets/constants";
import { useSelector } from "react-redux";
import { startOfDay, endOfDay, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Swal from "sweetalert2";
import TransactionTable from "../components/TransactionTable";

const DashboardTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productNotFound, setProductNotFound] = useState(false);
  const [transactions, setTransactions] = useState();
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentSortDate, setCurrentSortDate] = useState("");
  const [currentSortStatus, setCurrentSortStatus] = useState("");
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(
    format(startOfDay(Date.now()), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(
    format(endOfDay(Date.now()), "yyyy-MM-dd")
  );
  const adminToken = localStorage.getItem("adminToken");
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedDates, setSelectedDates] = useState({});

  console.log(selectedDates.startDate);

  const socket = useSelector((state) => state.socket.instance);

  console.log(transactions);

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

  const debouncedSearch = useDebounce(keyword, 1000);

  useEffect(() => {
    dispatch({ type: "ALERT_CLEAR", payload: "history" });

    const getTransaction = async () => {
      try {
        if (activePage > totalPage || !activePage) {
          return;
        }
        setLoading(true);
        const response = await axios.post(
          `${API_URL}/admin/transaction/get?keyword=${debouncedSearch}`,
          {
            page: activePage,
            startDate: selectedDates.startDate,
            endDate: selectedDates.endDate,
            sort: currentSortDate,
            status: currentSortStatus,
            limit: 5,
          },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setTransactions(response.data.data);
        setTotalPage(response.data.totalPage);
        setStartNumber(response.data.startNumber);
        setTimeout(setLoading(false), 500);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getTransaction();

    socket?.on("newTransactionNotif", () => {
      getTransaction();
      return;
    });

    socket?.on("newPaymentNotif", () => {
      getTransaction();
      return;
    });

    return () => {
      dispatch({ type: "ALERT_CLEAR", payload: "history" });
    };
  }, [
    activePage,
    currentSortDate,
    startDate,
    endDate,
    selectedDates,
    debouncedSearch,
    currentSortStatus,
    socket,
  ]);

  const renderTransactions = () => {
    return transactions?.map((item, i) => (
      <TransactionTable
        key={item.id}
        item={item}
        i={i}
        startNumber={startNumber}
        socket={socket}
      />
    ));
  };

  const renderAlert = () => {
    Swal.fire({
      text: "Product Not Found!",
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setProductNotFound(false);
          // go back to current url i intended to delete all the params in the url
          setKeyword("");
          navigate(pathname);
          setCurrentSortStatus("");
          if (selectedDates.startDate !== undefined) {
            setRanges([
              {
                ...ranges[0],
                startDate: new Date(),
                endDate: new Date(),
              },
            ]);
            setSelectedDates({});
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const renderPages = () => {
    const pagination = [];
    for (let i = 1; i <= totalPage; i++) {
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
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
    }
  };

  const prevPageHandler = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
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
        <div>
          <h1 className="text-3xl text-gray-700 font-bold">Transactions</h1>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="relative ml-auto group">
            <div className="p-2 rounded-lg text-white bg-primary flex items-center cursor-pointer group">
              <span
                className={`font-semibold flex items-center gap-2 text-sm ${
                  selectedDates.gte && selectedDates.lte
                    ? "text-sky-500"
                    : "text-white group-hover:hover:text-sky-600"
                } transition`}
              >
                <FiFilter className="text-white" />
                {selectedDates.gte && selectedDates.lte
                  ? `${selectedDates.gte.toLocaleDateString(
                      "id"
                    )} - ${selectedDates.lte.toLocaleDateString("id")}`
                  : "Select Date"}
              </span>
            </div>
            <div className="w-max p-3 flex flex-col rounded-lg bg-gray-300 backdrop-blur-sm absolute z-[40] right-3 md:right-11 top-8 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all shadow-lg">
              <DateRangePicker
                className="rounded-lg overflow-hidden"
                onChange={(date) => setRanges([date.selection])}
                showSelectionPreview={true}
                months={1}
                ranges={ranges}
                direction="horizontal"
                // preventSnapRefocus={true}
                // calendarFocus="backwards"
              />

              <div className="w-full mt-2 flex justify-center gap-3">
                <button
                  className="w-24 py-2 rounded-2xl text-white font-bold bg-warning hover:brightness-110 active:scale-95 transition"
                  onClick={() => {
                    setRanges([
                      {
                        ...ranges[0],
                        startDate: new Date(),
                        endDate: new Date(),
                      },
                    ]);
                    setSelectedDates({});
                  }}
                >
                  Reset
                </button>
                <button
                  className="w-24 py-2 rounded-2xl text-white font-bold bg-primary hover:brightness-110 active:scale-95 transition"
                  onClick={() =>
                    setSelectedDates({
                      startDate: startOfDay(ranges[0].startDate),
                      endDate: endOfDay(ranges[0].endDate),
                    })
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setCurrentSortDate(e.target.value)}
              className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl"
            >
              {/* updatedAt vs createdAt */}
              <option value="" selected>
                Sort by Invoice Date
              </option>
              <option value="createdAt,ASC">Oldest Transaction</option>
              <option value="createdAt,DESC">Latest Transaction</option>
            </select>
          </div>
          <div>
            <select
              name=""
              id="statusSelector"
              onChange={(e) => setCurrentSortStatus(e.target.value)}
              className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl"
            >
              {/* updatedAt vs createdAt */}
              <option value="">Sort by Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="awaiting">Awaiting Payment</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="bg-white shadow-sm p-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-white border-b border-gray-200">No</th>
                <th className="bg-white border-b border-gray-200">User Name</th>
                <th className="bg-white border-b border-gray-200">Address</th>
                <th className="bg-white border-b border-gray-200">Delivery</th>
                <th className="bg-white border-b border-gray-200">Notes</th>
                <th className="bg-white border-b border-gray-200">
                  Invoice Date
                </th>
                <th className="bg-white border-b border-gray-200">Details</th>
                <th className="bg-white border-b border-gray-200">Status</th>
                <th className="bg-white border-b border-gray-200">Actions</th>
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
              <tr>
                <th className="bg-white border-b border-gray-200">No</th>
                <th className="bg-white border-b border-gray-200">User Name</th>
                <th className="bg-white border-b border-gray-200">Address</th>
                <th className="bg-white border-b border-gray-200">Delivery</th>
                <th className="bg-white border-b border-gray-200">Notes</th>
                <th className="bg-white border-b border-gray-200">
                  Invoice Date
                </th>
                <th className="bg-white border-b border-gray-200">Details</th>
                <th className="bg-white border-b border-gray-200">Status</th>
                <th className="bg-white border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productNotFound ? (
                <>{renderAlert()}</>
              ) : (
                <>{renderTransactions()}</>
              )}
            </tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 pt-3">
            <button
              onClick={prevPageHandler}
              className={
                activePage === 1
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === 1}
            >
              <FaArrowLeft />
            </button>
            <div>
              Page{" "}
              <select
                type="number"
                className="mx-2 text-center focus:outline-none w-10 bg-gray-100"
                value={activePage}
                onChange={(e) => setActivePage(+e.target.value)}
              >
                {renderPages()}
              </select>{" "}
              of {totalPage}
            </div>
            <button
              onClick={nextPageHandler}
              className={
                activePage === totalPage
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === totalPage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTransaction;
