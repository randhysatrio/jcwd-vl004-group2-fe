import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiCalendar, FiMinus, FiFilter } from "react-icons/fi";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { API_URL } from "../assets/constants";
import { useSelector } from "react-redux";
import { startOfDay, endOfDay, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import TransactionTable from "../components/TransactionTable";

const DashboardTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState();
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentSortDate, setCurrentSortDate] = useState("");
  const [paymentProof, setPaymentProof] = useState("");
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
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedDates, setSelectedDates] = useState({});
  const limit = 7;

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

  const loadingFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: 'ALERT_CLEAR', payload: 'history' });

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
            // search: searchParams.get("keyword"),
            sort: currentSortDate,
          },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (activePage > response.data.totalPage) setActivePage(1);

        setTransactions(response.data.data);
        setTotalPage(response.data.totalPage);
        setStartNumber(response.data.startNumber);
        setTimeout(loadingFalse, 1000);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getTransaction();

    socket?.on('newTransactionNotif', () => {
      getTransaction();
      return;
    });

    socket?.on('newPaymentNotif', () => {
      getTransaction();
      return;
    });

    return () => {
      dispatch({ type: 'ALERT_CLEAR', payload: 'history' });
    };
  }, [activePage, search, currentSortDate, startDate, endDate, selectedDates]);

  useEffect(() => {
    if (!search) {
      return;
    } else {
      setActivePage(1);
    }
  }, [search]);

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
          {/* <div className="flex gap-2 items-center mr-5">
            <FiFilter size={24} />
            {startDate === format(startOfMonth(Date.now()), 'yyyy-MM-dd') && endDate === format(endOfMonth(Date.now()), 'yyyy-MM-dd') ? (
              <span>this month</span>
            ) : (
              <span>custom date</span>
            )}
          </div>
          <div className="flex relative items-center w-44">
            <input
              type="date"
              className="input input-bordered w-full max-w-xs mt-2 pl-11"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FiCalendar size="22" className="absolute left-3 top-5" />
          </div>
          <FiMinus size={24} />
          <div className="flex relative items-center w-44">
            <input
              type="date"
              value={endDate}
              className="input input-bordered w-full max-w-xs mt-2 pl-11"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FiCalendar size="22" className="absolute left-3 top-5" />
          </div> */}
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
            <div className="w-max p-3 flex flex-col rounded-lg bg-gray-300 bg-opacity-60 backdrop-blur-sm absolute z-[40] right-3 md:right-11 top-8 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all shadow-lg">
              <DateRangePicker
                className="rounded-lg overflow-hidden"
                onChange={(date) => setRanges([date.selection])}
                showSelectionPreview={true}
                months={2}
                ranges={ranges}
                direction="horizontal"
                // preventSnapRefocus={true}
                // calendarFocus="backwards"
              />

              <div className="w-full mt-2 flex justify-center gap-3">
                <button
                  className="w-24 py-2 rounded-2xl text-white font-bold bg-rose-400 hover:brightness-110 active:scale-95 transition"
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
                  className="w-24 py-2 rounded-2xl text-white font-bold bg-emerald-400 hover:brightness-110 active:scale-95 transition"
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
              <option value="">Sort by Invoice Date</option>
              <option value="createdAt,ASC">Oldest Transaction</option>
              <option value="createdAt,DESC">Latest Transaction</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm p-5">
        <div className="overflow-x-auto">
          <table className="table w-full">
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
            <tbody>{renderTransactions()}</tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 border-t pt-3">
            <button
              className={
                activePage === 1
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            >
              <FaArrowLeft />
            </button>
            <div>
              Page{" "}
              <input
                type="number"
                className="mx-2 text-center focus:outline-none w-10 bg-gray-100"
                value={activePage}
                onChange={(e) =>
                  e.target.value <= totalPage && setActivePage(e.target.value)
                }
              />{" "}
              of {totalPage}
            </div>
            <button
              className={
                activePage === totalPage
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === totalPage}
              onClick={() => setActivePage(activePage + 1)}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransaction;
