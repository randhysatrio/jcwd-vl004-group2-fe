import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import BuyAgainModal from '../components/BuyAgainModal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckAll } from 'react-icons/bs';
import { FaFileInvoiceDollar, FaRegCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const HistoryItem = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-1">
      <div className="h-24 w-full flex">
        <div className="h-full w-[7%] flex justify-center items-center">
          <span className="font-semibold">{index + 1}.</span>
        </div>
        <div className="h-full w-[12%] flex justify-center items-center">
          <div className="h-12 w-12 md:h-16 md:w-16 rounded-md border flex items-center justify-center bg-white">
            <img src={`${API_URL}/${item.image}`} className="h-full object-contain" />
          </div>
        </div>
        <div className="h-full w-[36%] flex flex-col justify-center">
          <span
            onClick={() => navigate(`/products/${item.product.id}`)}
            className="text-sm md:text-md xl:text-base font-semibold text-sky-700 hover:brightness-150 transition cursor-pointer max-w-full truncate"
          >
            {item.product.name}
          </span>
          <span className="text-sm md:text-md xl:text-base font-semibold opacity-70">{item.product.category.name}</span>
        </div>
        <div className="h-full w-[14%] flex justify-center items-center text-sm md:text-md xl:text-base font-semibold">
          <span>Rp. {item.price.toLocaleString('id')}</span>
        </div>
        <div className="h-full w-[13%] flex justify-center items-center text-sm md:text-md xl:text-base font-semibold">
          <span>{item.quantity.toLocaleString('id')}</span>
          <span className="text-sm">{item.product.unit}</span>
        </div>
        <div className="flex-1 flex justify-center items-center text-sm md:text-md xl:text-base font-semibold">
          <span>Rp. {item.subtotal.toLocaleString('id')}</span>
        </div>
      </div>
      <div className="w-[95%] h-[1px] mx-auto bg-gray-200" />
    </div>
  );
};

const HistoryCard = ({ invoice, userId }) => {
  const [received, setReceived] = useState(invoice.is_received);
  const [loading, setLoading] = useState(false);
  const socket = useCallback(
    useSelector((state) => state.socket.instance),
    []
  );

  const renderItem = () => {
    return invoice.invoiceitems.map((item, index) => <HistoryItem key={item.id} item={item} index={index} />);
  };

  const receivedHandler = async () => {
    try {
      setLoading(true);

      const response = await Axios.patch(
        `${API_URL}/history/received/${invoice.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      setLoading(false);

      if (response.data.conflict) {
        toast.warning(response.data.message, { position: 'bottom-left', theme: 'colored' });
      } else {
        setReceived(response.data.received);

        socket.emit('adminNotif');

        toast.success(response.data.message, { position: 'bottom-left', theme: 'colored' });
      }
    } catch (err) {
      setLoading(false);

      toast.error('Unable to update this history status!', { position: 'bottom-left', theme: 'colored' });
    }
  };

  return (
    <div className="w-full border rounded-lg flex flex-col items-center overflow-hidden shadow">
      <div className="w-full py-2 px-4 text-sm font-semibold text-gray-500 flex items-center">
        <span className="mr-auto">#{invoice.id}</span>
        <span>{format(new Date(invoice.createdAt), 'ccc, MMM do yyyy - pp')}</span>
        {invoice.status === 'pending' && <span className="py-1 px-3 rounded-lg bg-sky-200 text-sky-600 font-semibold ml-3">Pending</span>}
        {invoice.status === 'rejected' && (
          <span className="py-1 px-3 rounded-lg bg-rose-200 text-rose-600 font-semibold ml-3">Rejected</span>
        )}
        {invoice.status === 'approved' && (
          <span className="py-1 px-3 rounded-lg bg-emerald-200 text-emerald-600 font-semibold ml-3">Approved</span>
        )}
      </div>
      <div className="w-[97%] h-[1px] rounded-lg bg-gray-200" />
      <div className="w-full p-3">
        <div className="w-full h-full bg-gray-100 rounded-xl flex flex-col">
          <div className="w-full p-2">
            <div className="w-full h-10 rounded-lg bg-gray-200 text-xs md:text-sm font-semibold text-gray-500 flex overflow-hidden">
              <div className="h-full w-[7%] flex justify-center items-center">
                <span>No.</span>
              </div>
              <div className="h-full w-[12%] flex justify-center items-center">
                <span>Image:</span>
              </div>
              <div className="h-full w-[36%] flex items-center">
                <span>Name:</span>
              </div>
              <div className="h-full w-[14%] flex justify-center items-center">
                <span>Price:</span>
              </div>
              <div className="h-full w-[13%] flex justify-center items-center">
                <span>Quantity:</span>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <span>Subtotal:</span>
              </div>
            </div>
          </div>
          <div className="w-full px-2 pb-2">
            <div className="w-full h-full rounded-lg bg-gray-50 pb-1">{renderItem()}</div>
          </div>
          <div className="w-full h-32 bg-gray-100 rounded-b-lg px-2 pb-2">
            <div className="w-full h-full flex justify-between">
              <div className="w-[65%] md:w-[60%] h-full">
                <div className="w-[98%] h-full rounded-lg flex flex-col bg-white brightness-105 relative z-[20] overflow-hidden">
                  <div className="w-full py-[6px] flex gap-6">
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                  </div>
                  <div className="w-full h-full flex px-1 md:px-2">
                    <div className="w-[65%] h-full flex p-1 border-r">
                      <div className="w-[60%] lg:w-[65%] h-full flex flex-col text-xs xl:text-sm">
                        <span className="font-semibold mb-1 line-clamp-2">{invoice.address.address}</span>
                        <span>{invoice.user.phone_number}</span>
                      </div>
                      <div className="w-[40%] lg:w-[35%] lg:pl-[2px] h-full flex flex-col text-xs xl:text-sm">
                        <span>{invoice.address.city}</span>
                        <span className="uppercase line-clamp-1">{invoice.address.province}</span>
                        <span className="uppercase">{invoice.address.country}</span>
                        <span>{invoice.address.postalcode}</span>
                      </div>
                    </div>
                    <div className="h-full w-[35%] p-2 flex flex-col text-xs">
                      <span className="font-bold">Notes:</span>
                      <span className="line-clamp-3">{invoice.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-[35%] md:w-[40%] relative">
                <div className="h-4 w-4 rounded-tr-full absolute -left-[7%] md:-left-[16px] lg:-left-[15px] 2xl:-left-[5%] -top-[7%] z-10 bg-gray-100"></div>
                <div className="bg-gray-50 w-full h-full before:h-[8px] before:w-[105%] before:bg-gray-50 before:absolute before:-top-2 before:right-0 rounded-b-lg flex flex-col pl-4 pr-2">
                  <div className="w-full border-b text-sm font-bold flex justify-end bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
                    <span>Summary:</span>
                  </div>
                  <div className="w-full my-auto flex flex-col gap-1">
                    <div className="w-full flex justify-between items-center text-[11px] sm:text-sm xl:text-base">
                      <span className="font-bold">Total:</span>
                      <span className="font-semibold">Rp. {parseInt(invoice.total).toLocaleString('id')}</span>
                    </div>
                    <div className="w-full flex items-center text-[11px] sm:text-sm xl:text-base">
                      <span className="font-bold mr-auto">Shipping:</span>
                      <span className="text-[10px] md:text-xs mr-1 font-semibold">({invoice.deliveryoption.name})</span>
                      <span className="font-semibold">Rp. {invoice.deliveryoption.cost.toLocaleString('id')}</span>
                    </div>
                    <div className="w-full flex justify-between items-center text-[11px] sm:text-sm lg:text-md xl:text-lg">
                      <span className="font-bold">Grand Total:</span>
                      <span className="font-semibold">
                        Rp. {(parseInt(invoice.total) + invoice.deliveryoption.cost).toLocaleString('id')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 px-3 flex gap-4 relative items-center">
        {invoice.invoice_path && (
          <a href={`${API_URL}/history/invoice/download?path=${invoice.invoice_path}`} target="_blank">
            <button className="h-9 w-36 xl:w-40 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold cursor-pointer hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 text-xs lg:text-sm">
              <FaFileInvoiceDollar />
              Download Invoice
            </button>
          </a>
        )}
        <a
          href={`${API_URL}/history/invoice/view/${invoice.id}`}
          target="_blank"
          className="h-9 font-semibold text-gray-700 hover:text-sky-500 active:scale-95 transition cursor-pointer px-3 rounded-lg ring-1 ring-gray-300 hover:ring-sky-300 flex items-center justify-center mr-auto text-xs lg:text-sm"
        >
          Invoice
        </a>
        {received ? (
          <div className="flex items-center gap-1 text-xs lg:text-base">
            <BsCheckAll className="text-sky-500" />
            <span className="text-gray-400">I have received this</span>
          </div>
        ) : invoice.status === 'approved' ? (
          <button
            disabled={loading}
            onClick={receivedHandler}
            className="h-10 w-32 xl:w-36 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold cursor-pointer hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 text-sm xl:text-base"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Updating..
              </>
            ) : (
              <>
                <FaRegCheckCircle />
                Arrived
              </>
            )}
          </button>
        ) : null}
        <BuyAgainModal items={invoice.invoiceitems} invoiceId={invoice.id} userId={userId} />
      </div>
    </div>
  );
};

export default HistoryCard;
