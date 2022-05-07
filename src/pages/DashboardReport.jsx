import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  FiCalendar,
  FiMinus,
  FiFilter,
  FiMoreHorizontal,
  FiAward,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';

const DashboardReport = () => {
  const [report, setReport] = useState();
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [statistic, setStatistic] = useState();
  const [mostSold, setMostSold] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const adminToken = localStorage.getItem('adminToken');

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        if ((activePage > totalPage && search) || activePage < 1) {
          return;
        }

        if (search) setActivePage(1);

        const response = await axios.post(`${API_URL}/admin/report/get`, null, {
          params: {
            page: activePage,
            startDate,
            endDate,
            search: searchParams.get('keyword'),
          },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        setReport(response.data.data);
        setMostSold(response.data.mostSold);
        setStatistic({
          sales: response.data.sales,
          profit: response.data.profit,
          capital: response.data.capital,
          revenue: response.data.revenue,
        });
        setTotalPage(response.data.totalPage);
        setStartNumber(response.data.startNumber);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getTransaction();
  }, [activePage, search, startDate, endDate]);

  const toIDR = (number) => {
    number = parseInt(number);
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-3xl text-gray-700 font-bold">Report</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 items-center mr-5">
            <FiFilter size={24} />
            {startDate ? <span>custom date</span> : <span>this month</span>}
          </div>
          <div className="flex relative items-center w-44">
            <input
              type="date"
              className="input input-bordered w-full max-w-xs mt-2 pl-11"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FiCalendar size="22" className="absolute left-3 top-5" />
          </div>
          <FiMinus size={24} />
          <div className="flex relative items-center w-44">
            <input
              type="date"
              className="input input-bordered w-full max-w-xs mt-2 pl-11"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FiCalendar size="22" className="absolute left-3 top-5" />
          </div>
          <div className="ml-5">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-xs">Profit</div>
                <div className="stat-value text-xl text-primary">
                  {statistic ? toIDR(statistic.profit) : 0}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xs">Sales</div>
                <div className="stat-value text-xl">
                  {statistic ? statistic.sales : 0}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xs">More</div>
                <div className="stat-value text-xl">
                  <label htmlFor="detail-modal" href="#detail-modal">
                    <FiMoreHorizontal
                      size={24}
                      className="hover:cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm mt-5 p-5">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-white border-b border-gray-200">No</th>
                <th className="bg-white border-b border-gray-200">
                  Product Name
                </th>
                <th className="bg-white border-b border-gray-200">Price</th>
                <th className="bg-white border-b border-gray-200">
                  Total Sales
                </th>
                <th className="bg-white border-b border-gray-200">
                  Sold Volume
                </th>
                <th className="bg-white border-b border-gray-200">Capital</th>
                <th className="bg-white border-b border-gray-200">Revenue</th>
                <th className="bg-white border-b border-gray-200">Profit</th>
              </tr>
            </thead>
            <tbody>
              {report?.map((item, i) => {
                return (
                  <>
                    <tr key={item.id}>
                      <th>{startNumber + i + 1}</th>
                      <td>{item.name}</td>
                      <td>
                        {toIDR(item.price)}/{item.unit}
                      </td>
                      <td>{item.total_sales} sales</td>
                      <td>
                        {item.sold_volume} {item.unit}
                      </td>
                      <td>{toIDR(item.capital)}</td>
                      <td>{toIDR(item.total_bill)}</td>
                      <td>{toIDR(item.total_bill - item.capital)}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 border-t pt-3">
            <button
              className={
                activePage === 1
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === 1}
              onClick={() => activePage > 1 && setActivePage(activePage - 1)}
            >
              {' '}
              <FaArrowLeft />
            </button>
            <div>
              Page{' '}
              <input
                type="number"
                className="px-2 text-center focus:outline-none w-6 bg-gray-100"
                value={activePage}
                onChange={(e) =>
                  e.target.value <= totalPage && setActivePage(e.target.value)
                }
              />{' '}
              of {totalPage}
            </div>
            <button
              className={
                activePage === totalPage
                  ? `hover:cursor-not-allowed`
                  : `hover:cursor-pointer`
              }
              disabled={activePage === totalPage}
              onClick={() =>
                activePage < totalPage && setActivePage(activePage + 1)
              }
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      {/* detail statistic */}
      <input type="checkbox" id="detail-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box min-w-9/12 bg-gray-100 overflow-auto">
          <div className="modal-action">
            <label
              htmlFor="detail-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            {/* data */}
            <div className="stats shadow w-11/12">
              <div className="stat">
                <div className="stat-title text-xs">Capital</div>
                <div className="stat-value text-2xl">
                  {statistic ? toIDR(statistic.capital) : 0}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xs">Profit</div>
                <div className="stat-value text-2xl text-primary">
                  {statistic ? toIDR(statistic.profit) : 0}
                </div>
              </div>
            </div>
            <div className="flex w-11/12 gap-3 justify-between">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Revenue</div>
                  <div className="stat-value">
                    {statistic ? toIDR(statistic.revenue) : 0}
                  </div>
                </div>
              </div>
              <div className="stats shadow bg-pink-400 text-primary-content">
                <div className="stat">
                  <div className="stat-title">Sales</div>
                  <div className="stat-value">
                    {statistic ? statistic.sales : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-11/12 gap-3 shadow">
              <div className="flex flex-row items-center gap-2 mt-4 pl-2">
                <span className="font-semibold text-lg">Top 3 Most Sold</span>
                <FiAward size={24} className="text-yellow-500" />
              </div>
              <ul className="bg-white py-2 px-2 rounded-2xl">
                {mostSold &&
                  mostSold.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="py-3 border-b border-gray-200 flex justify-between px-2 gap-1"
                      >
                        <span>{item.name}</span>
                        <span className="font-bold text-lg text-pink-400 w-20 text-right">
                          {item.total_sales} sales
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
