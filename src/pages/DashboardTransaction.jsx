import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API_URL } from '../assets/constants';
import NavbarDashboard from '../components/NavbarDashboard';
import SidebarDashboard from '../components/SidebarDashboard';

const DashboardTransaction = () => {
  const [transactions, setTransactions] = useState();
  const [dataDetails, setDataDetails] = useState([]);
  const adminToken = localStorage.getItem('adminToken');

  const getTransaction = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/transaction/get`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setTransactions(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const rendTotal = (invoice) => {
    let total = 0;

    invoice.map((item) => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard />
      <SidebarDashboard />
      <div className="pt-16 pr-8 pl-48">
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
                  <th className="bg-white border-b border-gray-200">
                    User Name
                  </th>
                  <th className="bg-white border-b border-gray-200">Address</th>
                  <th className="bg-white border-b border-gray-200">
                    Delivery
                  </th>
                  <th className="bg-white border-b border-gray-200">Notes</th>
                  <th className="bg-white border-b border-gray-200">
                    Total Price
                  </th>
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
                        <th>{i + 1}</th>
                        <td>{item.user.name}</td>
                        <td>
                          {item.address.address}, {item.address.city},{' '}
                          {item.address.province}
                        </td>
                        <td>{item.deliveryoption.name}</td>
                        <td>{item.notes}</td>
                        <td>{rendTotal(item.invoiceitems)}</td>
                        <td>
                          <a
                            href="#detail-modal"
                            onClick={() => setDataDetails(item.invoiceitems)}
                            className="flex gap-3 items-center border-b pb-1 px-1 border-primary text-primary"
                          >
                            <span>Detail</span>
                            <FaSearchPlus size={20} />
                          </a>
                        </td>
                        <td>
                          <div
                            className={`badge ${
                              item.status === 'pending' && 'badge-warning'
                            } ${
                              item.status === 'approved' && 'badge-success'
                            } ${
                              item.status === 'rejected' && 'badge-error'
                            } gap-2 `}
                          >
                            {item.status}
                          </div>
                        </td>
                        <td className="flex items-center text-center ">
                          <button
                            type="button"
                            className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 rounded-xl items-center"
                          >
                            Decline
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* detail transaction */}
      <div className="modal" id="detail-modal">
        <div className="modal-box min-w-9/12 overflow-auto">
          <div className="modal-action">
            <a
              href="#"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </a>
          </div>
          <h3 className="text-lg font-bold mb-3">Detail Items Transaction</h3>
          {rendDetail()}
        </div>
      </div>
    </div>
  );
};

export default DashboardTransaction;
