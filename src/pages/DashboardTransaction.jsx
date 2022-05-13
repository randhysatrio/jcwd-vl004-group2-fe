import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FiCalendar, FiMinus, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';
import { useSelector } from 'react-redux';
import { startOfMonth, endOfMonth, format } from 'date-fns';

import TransactionTable from '../components/TransactionTable';

const DashboardTransaction = () => {
  const [transactions, setTransactions] = useState();
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentSortDate, setCurrentSortDate] = useState('');
  const [startDate, setStartDate] = useState(format(startOfMonth(Date.now()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(endOfMonth(Date.now()), 'yyyy-MM-dd'));
  const adminToken = localStorage.getItem('adminToken');
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const socket = useCallback(
    useSelector((state) => state.socket.instance),
    []
  );

  useEffect(() => {
    const getTransaction = async () => {
      try {
        if ((activePage > totalPage && search) || activePage < 1) {
          return;
        }

        const response = await axios.post(
          `${API_URL}/admin/transaction/get`,
          {
            page: activePage,
            startDate,
            endDate,
            search: searchParams.get('keyword'),
            sort: currentSortDate,
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
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getTransaction();
  }, [activePage, search, currentSortDate, startDate, endDate]);

  useEffect(() => {
    setActivePage(1);
  }, [search]);

  const renderTransactions = () => {
    return transactions?.map((item, i) => <TransactionTable key={item.id} item={item} i={i} startNumber={startNumber} socket={socket} />);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-3xl text-gray-700 font-bold">Transactions</h1>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="flex gap-2 items-center mr-5">
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
                <th className="bg-white border-b border-gray-200">Invoice Date</th>
                <th className="bg-white border-b border-gray-200">Details</th>
                <th className="bg-white border-b border-gray-200">Status</th>
                <th className="bg-white border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>{renderTransactions()}</tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 border-t pt-3">
            <button
              className={activePage === 1 ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}
              disabled={activePage === 1}
              onClick={() => activePage > 1 && setActivePage(activePage - 1)}
            >
              <FaArrowLeft />
            </button>
            <div>
              Page{' '}
              <input
                type="number"
                className="px-2 text-center focus:outline-none w-6 bg-gray-100"
                value={activePage}
                onChange={(e) => e.target.value <= totalPage && setActivePage(e.target.value)}
              />{' '}
              of {totalPage}
            </div>
            <button
              className={activePage === totalPage ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}
              disabled={activePage === totalPage}
              onClick={() => activePage < totalPage && setActivePage(activePage + 1)}
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
