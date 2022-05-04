import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaSearchPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';

const DashboardTransaction = () => {
  const [transactions, setTransactions] = useState();
  const [dataDetails, setDataDetails] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [paymentProof, setPaymentProof] = useState('');
  const adminToken = localStorage.getItem('adminToken');
  const socket = useCallback(
    useSelector((state) => state.socket.instance),
    []
  );

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

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
            search: searchParams.get('keyword'),
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
  }, [activePage, search]);

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
    let moth = dateFull.getMonth();
    let year = dateFull.getFullYear();
    return `${date}/${moth}/${year}`;
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-3xl text-gray-700 font-bold">Transactions</h1>
        </div>
      </div>
      <div className="bg-white shadow-sm mt-5 p-5">
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
                return (
                  <>
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
                          for="detail-modal"
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
                          disabled={item.status === 'approved' || item.status === 'rejected'}
                          type="button"
                          className={`py-2.5 px-6 text-white ${
                            item.status === 'approved' || item.status === 'rejected' ? 'bg-gray-400' : 'bg-primary hover:bg-blue-400'
                          }  rounded-xl items-center`}
                        >
                          Approve
                        </button>
                        <button
                          disabled={item.status === 'approved' || item.status === 'rejected'}
                          type="button"
                          className={`py-2.5 px-6 text-white ${
                            item.status === 'approved' || item.status === 'rejected' ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-400'
                          }  rounded-xl items-center`}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 border-t pt-3">
            <button
              className={activePage === 1 && `hover:cursor-not-allowed`}
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
                onChange={(e) => e.target.value <= totalPage && setActivePage(e.target.value)}
              />{' '}
              of {totalPage}
            </div>
            <button
              className={activePage === totalPage && `hover:cursor-not-allowed`}
              disabled={activePage === totalPage}
              onClick={() => activePage < totalPage && setActivePage(activePage + 1)}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* detail transaction */}
      <input type="checkbox" id="detail-modal" class="modal-toggle" />
      <div className="modal">
        <div className="modal-box min-w-9/12 overflow-auto">
          <div className="modal-action">
            <label for="detail-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
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
  );
};

export default DashboardTransaction;
