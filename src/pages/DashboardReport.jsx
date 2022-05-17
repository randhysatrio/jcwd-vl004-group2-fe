import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { DateRangePicker } from 'react-date-range';
import {
  FiCalendar,
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
  const adminToken = localStorage.getItem('adminToken');
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(new Date().setDate(1)),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const getTransaction = async (stardDate, endDate) => {
    try {
      // protect pagination
      if (activePage > totalPage || activePage < 1) {
        return;
      }

      const response = await axios.post(
        `${API_URL}/admin/report/get`,
        {
          startDate: stardDate ? stardDate : selectedDates[0].startDate,
          endDate: endDate ? endDate : selectedDates[0].endDate,
          search: searchParams.get('keyword'),
          page: activePage,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

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

  useEffect(() => {
    getTransaction();
  }, [activePage, search]);

  useEffect(() => {
    setActivePage(1);
  }, [search]);

  const isDefaultDate = () => {
    let startDate = selectedDates[0].startDate.toLocaleDateString('id');
    let endDate = selectedDates[0].endDate.toLocaleDateString('id');
    let firstDate = new Date(new Date().setDate(1)).toLocaleDateString('id');
    let today = new Date().toLocaleDateString('id');

    if (startDate === firstDate && endDate === today) {
      return true;
    }
    return false;
  };

  const resetDate = () => {
    let startDate = new Date();
    let endDate = new Date();
    setSelectedDates([{ ...selectedDates[0], startDate, endDate }]);
    setActivePage(1);
    getTransaction(startDate, endDate);
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
            {isDefaultDate() ? (
              <span>this month</span>
            ) : selectedDates[0].startDate.toLocaleDateString('id') ===
              selectedDates[0].endDate.toLocaleDateString('id') ? (
              <span>{`${selectedDates[0].startDate.toLocaleDateString(
                'id'
              )}`}</span>
            ) : (
              <span>{`${selectedDates[0].startDate.toLocaleDateString(
                'id'
              )} - ${selectedDates[0].endDate.toLocaleDateString('id')}`}</span>
            )}
          </div>
          <label
            htmlFor="date-modal"
            href="#date-modal"
            className="flex items-center gap-3 btn btn-primary hover:cursor-pointer"
          >
            <FiCalendar size={24} />
            Select date
          </label>
          <div className="ml-5">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-xs">Profit</div>
                <div className="stat-value text-xl text-primary">
                  Rp. {statistic ? statistic.profit.toLocaleString('id') : 0}
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
                      <td className="max-w-md whitespace-normal">
                        {item.name}
                      </td>
                      <td>
                        Rp. {parseInt(item.price).toLocaleString('id')}/
                        {item.unit}
                      </td>
                      <td>{item.total_sales} sales</td>
                      <td>
                        {parseInt(item.sold_volume).toLocaleString('id')}{' '}
                        {item.unit}
                      </td>
                      <td>Rp. {parseInt(item.capital).toLocaleString('id')}</td>
                      <td>
                        Rp. {parseInt(item.total_bill).toLocaleString('id')}
                      </td>
                      <td>
                        Rp.{' '}
                        {(item.total_bill - item.capital).toLocaleString('id')}
                      </td>
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
                className="mx-2 text-center focus:outline-none w-10 bg-gray-100"
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
      {/* date picker modal */}
      <input type="checkbox" id="date-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-modal max-w-full bg-gray-100 overflow-auto">
          <div className="modal-action">
            <label
              htmlFor="date-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col items-center gap-3 pt-5 w-full">
            {/* date */}
            <DateRangePicker
              className="rounded-lg overflow-hidden"
              onChange={(item) => setSelectedDates([item.selection])}
              showSelectionPreview={true}
              ranges={selectedDates}
              direction="horizontal"
            />
            <div className="flex gap-3 justify-end modal-action w-full px-5">
              <label
                htmlFor="date-modal"
                onClick={resetDate}
                className="btn btn-warning btn-md"
              >
                Reset
              </label>
              <label
                htmlFor="date-modal"
                onClick={() => {
                  setActivePage(1);
                  getTransaction();
                }}
                className="btn btn-primary btn-md"
              >
                Apply
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* detail statistic */}
      <input type="checkbox" id="detail-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-max max-w-full bg-gray-100 overflow-auto">
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
            <div className="stats shadow w-full overflow-x-hidden">
              <div className="stat">
                <div className="stat-title text-xs">Capital</div>
                <div className="stat-value text-xl">
                  Rp. {statistic ? statistic.capital.toLocaleString('id') : 0}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xs">Profit</div>
                <div className="stat-value text-xl text-primary">
                  Rp. {statistic ? statistic.profit.toLocaleString('id') : 0}
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full justify-between">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Revenue</div>
                  <div className="stat-value">
                    Rp. {statistic ? statistic.revenue.toLocaleString('id') : 0}
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
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-row items-center gap-2 mt-4 pl-2">
                <span className="font-semibold text-lg">Top 3 Most Sold</span>
                <FiAward size={24} className="text-yellow-500" />
              </div>
              <ul className="bg-white py-2 px-2 rounded-2xl shadow">
                {mostSold &&
                  mostSold.map((item, i) => {
                    return (
                      <li
                        key={item.id}
                        className={`py-3 ${
                          i === 2 ? null : 'border-b border-gray-200'
                        } flex justify-between px-2 gap-1`}
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
