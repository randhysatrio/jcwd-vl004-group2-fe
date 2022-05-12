import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaSearchPlus } from 'react-icons/fa';
import { FiCalendar, FiMinus, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';
import { useSelector } from 'react-redux';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const DashboardTransaction = () => {
  const Swal = require('sweetalert2');
  const [transactions, setTransactions] = useState();
  const [dataDetails, setDataDetails] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [paymentProof, setPaymentProof] = useState('');
  const [currentSortDate, setCurrentSortDate] = useState('');
  const [startDate, setStartDate] = useState(format(startOfMonth(Date.now()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(endOfMonth(Date.now()), 'yyyy-MM-dd'));
  const adminToken = localStorage.getItem('adminToken');

  const socket = useSelector((state) => state.socket.instance);
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  // const getTransaction = async () => {
  //   try {
  //     if ((activePage > totalPage && search) || activePage < 1) {
  //       return;
  //     }

  //     const response = await axios.post(
  //       `${API_URL}/admin/transaction/get`,
  //       {
  //         page: activePage,
  //         search: searchParams.get('keyword'),
  //         sort: currentSortDate,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${adminToken}`,
  //         },
  //       }
  //     );

  //     if (activePage > response.data.totalPage) setActivePage(1);

  //     setTransactions(response.data.data);
  //     setTotalPage(response.data.totalPage);
  //     setStartNumber(response.data.startNumber);
  //     setActivePage(1);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

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

  const rendTotal = () => {
    let total = 0;

    dataDetails.forEach((item) => {
      total += item.quantity * item.price;
    });

    return toIDR(total);
  };

  const rendDetail = () => {
    return dataDetails.map((item) => {
      return (
        <div key={item.id} className="flex gap-3 border-b mb-2 py-2">
          <img src={item.product.image} className="h-24" alt="cart product" />
          <div className="flex flex-col py-1">
            <h2 className="text-sm font-semibold mb-2">{item.product.name}</h2>
            <div className="flex gap-4">
              <span>Price : {toIDR(item.price)}</span>
              <span>Qty: {item.quantity}</span>
            </div>
            <span>Subtotal : {toIDR(item.quantity * item.price)}</span>
          </div>
        </div>
      );
    });
  };

  const toIDR = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  const dateLocal = (dateInvoice) => {
    let dateFull = new Date(dateInvoice);
    let date = dateFull.getDate();
    let month = dateFull.getMonth() + 1;
    let year = dateFull.getFullYear();
    return `${month}/${date}/${year}`;
  };

  const handleApprovedClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(
            `${API_URL}/admin/transaction/approved/${id}`,
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

          Swal.fire('Changed!', 'Status has been changed!', 'success');
          socket?.emit('userNotif', response.data.userId);

          setTransactions(response.data.data);
          setTotalPage(response.data.totalPage);
          setStartNumber(response.data.startNumber);
          setActivePage(1);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleRejectedClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.patch(
            `${API_URL}/admin/transaction/rejected/${id}`,
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
          Swal.fire('Changed!', 'Status has been changed!', 'success');
          socket?.emit('userNotif', response.data.userId);

          setTransactions(response.data.data);
          setTotalPage(response.data.totalPage);
          setStartNumber(response.data.startNumber);
          setActivePage(1);
        } catch (error) {
          console.log(error);
        }
      }
    });
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
            <tbody>
              {transactions?.map((item, i) => {
                console.log(item);
                return (
                  <tr key={item.id}>
                    <th>{startNumber + i + 1}</th>
                    <td>{item.user.name}</td>
                    <td>
                      {item.address.address}, {item.address.city}, {item.address.province}
                    </td>
                    <td>{item.deliveryoption.name}</td>
                    <td>{item.notes}</td>
                    <td>{dateLocal(item.createdAt)}</td>
                    <td>
                      <label
                        htmlFor="detail-modal"
                        href="#detail-modal"
                        onClick={() => {
                          setDataDetails(item.invoiceitems);
                          setPaymentProof(item.paymentproof?.path);
                        }}
                        className="flex gap-3 items-center hover:cursor-pointer border-b pb-1 px-1 border-primary text-primary w-20"
                      >
                        <span>Detail</span>
                        <FaSearchPlus size={20} />
                      </label>
                    </td>
                    <td>
                      <div
                        className={`badge ${item.status === 'pending' && 'badge-warning'} ${
                          item.status === 'approved' && 'badge-success'
                        } ${item.status === 'rejected' && 'badge-error'} gap-2 `}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="flex gap-3 items-center text-center ">
                      <button
                        disabled={item.status !== 'pending'}
                        type="button"
                        className="py-2.5 px-6 text-white disabled:bg-gray-400 bg-primary hover:bg-blue-400' rounded-xl items-center"
                        onClick={() => handleApprovedClick(item.id)}
                      >
                        Approve
                      </button>
                      <button
                        disabled={item.status !== 'pending'}
                        type="button"
                        className={`py-2.5 px-6 text-white ${
                          item.status === 'approved' || item.status === 'rejected' ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-400'
                        }  rounded-xl items-center`}
                        onClick={() => handleRejectedClick(item.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
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

        {/* detail transaction */}
        <input type="checkbox" id="detail-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box min-w-9/12 overflow-auto">
            <div className="modal-action">
              <label htmlFor="detail-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </label>
            </div>
            <div className="flex justify-between my-3 items-center">
              <h3 className="text-lg font-bold mb-3">Detail Transaction</h3>
              <div className="font-semibold text-lg text-red-400 flex justify-end bg-red-50 py-2 px-3 rounded-md">{rendTotal()}</div>
            </div>
            {paymentProof ? (
              <div className="flex flex-col justify-center py-4">
                <span className="font-semibold mb-4 w-28 border-b-2 border-primary">Payment Proof</span>
                <img src={`${API_URL}/public/${paymentProof}`} alt="proof of payment" />
              </div>
            ) : (
              <div className="font-semibold mb-4 text-center bg-gray-100 p-6 roundedn-md">Payment proof not available</div>
            )}
            <span className="font-semibold mb-4 pt-9 w-28 border-b-2 border-primary">Order Items</span>
            {rendDetail()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTransaction;
