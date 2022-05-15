import { useEffect, useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import AwaitingPaymentCard from '../components/AwaitingPayment';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AwaitingPayment = () => {
  const userToken = localStorage.getItem('userToken');
  const [invoices, setInvoices] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchAwaiting = async () => {
      try {
        const response = await Axios.post(
          `${API_URL}/history/user/awaiting`,
          {
            limit,
            currentPage,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setInvoices(response.data.rows);
        setMaxPage(response.data.maxPage);
        setTotalData(response.data.count);
      } catch (err) {
        toast.error('Unable to fetch invoices!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchAwaiting();
  }, []);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    } else if (totalData < currentPage * limit - limit) {
      setCurrentPage(currentPage - 1);
    }
  }, [totalData]);

  const renderInvoices = () => {
    return invoices?.map((invoice) => (
      <AwaitingPaymentCard
        key={invoice.id}
        invoice={invoice}
        setInvoices={setInvoices}
        setMaxPage={setMaxPage}
        setTotalData={setTotalData}
        currentPage={currentPage}
        limit={limit}
      />
    ));
  };

  return (
    <div className="h-full flex justify-center py-3 lg:py-5">
      <div className="h-full w-[90%] sm:w-[85%] md:w-[90%] lg:w-[80%] xl:w-[75%] flex flex-col items-center">
        <div className="w-full flex items-center py-2">
          <span className="text-3xl font-semibold leading-10 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Awaiting Payment
          </span>
        </div>
        <div className="h-px w-full bg-gray-100" />
        <div className="w-full flex flex-col items-center py-4 gap-6">{renderInvoices()}</div>
        <div className="w-full xl:w-[85%] mt-auto flex items-center justify-end py-1 border-t">
          <div className="flex items-center gap-1">
            <span>{currentPage}</span>
            <span>to</span>
            <span>{maxPage}</span>
            <span>from</span>
            <span>{totalData}</span>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <FiChevronLeft />
            </button>
            <button>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwaitingPayment;
