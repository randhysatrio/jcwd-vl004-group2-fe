import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import BuyAgainModal from '../components/BuyAgainModal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckAll } from 'react-icons/bs';
import { FaRegCheckCircle } from 'react-icons/fa';
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
          <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-white">
            <img src={`${item.product.image}`} className="h-full object-contain" />
          </div>
        </div>
        <div className="h-full w-[36%] flex flex-col justify-center">
          <span
            onClick={() => navigate(`/products/${item.product.id}`)}
            className="text-md font-semibold text-sky-700 hover:brightness-150 transition cursor-pointer"
          >
            {item.product.name.length > 33 ? item.product.name.slice(0, 33) + '...' : item.product.name}
          </span>
          <span className="font-semibold opacity-70">{item.product.category.name}</span>
        </div>
        <div className="h-full w-[14%] flex justify-center items-center text-md font-semibold">
          <span>Rp. {item.price.toLocaleString('id')}</span>
        </div>
        <div className="h-full w-[13%] flex justify-center items-center text-md font-semibold">
          <span>{item.quantity.toLocaleString('id')}</span>
          <span className="text-sm">{item.product.unit}</span>
        </div>
        <div className="flex-1 flex justify-center items-center text-md font-semibold">
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
        <span className="mr-auto">#1</span>
        <span>{format(new Date(invoice.createdAt), 'ccc, MMM do yyyy - HH:mm:s aaa')}</span>
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
            <div className="w-full h-10 rounded-lg bg-gray-200 text-sm font-semibold text-gray-500 flex overflow-hidden">
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
              <div className="w-[64%] h-full">
                <div className="w-full h-full rounded-lg bg-white brightness-105 relative z-[20] overflow-hidden">
                  <div className="py-[6px] flex gap-6">
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-red-400"></span>
                    <span className="h-[6px] w-20 skew-x-[24deg] bg-blue-400"></span>
                  </div>
                  <div className="w-full h-full flex px-3">
                    <div className="flex p-2 border-r">
                      <div className="w-48 h-full flex flex-col text-sm">
                        <span className="font-semibold mb-1">
                          {invoice.address.address.length > 47 ? invoice.address.address.slice(0, 47) + '...' : invoice.address.address}
                        </span>
                        <span>{invoice.user.phone_number}</span>
                      </div>
                      <div className="w-24 h-full flex flex-col text-sm">
                        <span>{invoice.address.city}</span>
                        <span className="uppercase">
                          {invoice.address.province.length > 15 ? invoice.address.province.slice(0, 15) + '...' : invoice.address.province}
                        </span>
                        <span className="uppercase">{invoice.address.country}</span>
                        <span>{invoice.address.postalcode}</span>
                      </div>
                    </div>
                    <div className="h-full w-full p-2 flex flex-col text-xs">
                      <span className="font-bold">Notes:</span>
                      <span>{invoice.notes.length > 106 ? invoice.notes.slice(0, 106) + '...' : invoice.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-[35%] relative">
                <div className="h-4 w-4 rounded-tr-full absolute -left-[6%] 2xl:-left-[5%] -top-[7%] z-10 bg-gray-100"></div>
                <div className="bg-gray-50 w-full h-full before:h-[8px] before:w-[105%] before:bg-gray-50 before:absolute before:-top-2 before:right-0 rounded-b-lg flex flex-col pl-4 pr-2">
                  <div className="w-full border-b text-sm font-bold flex justify-end bg-gradient-to-r from-sky-400 to-emerald-500 bg-clip-text text-transparent">
                    <span>Summary:</span>
                  </div>
                  <div className="w-full flex justify-between py-[1px]">
                    <span className="font-bold">Total:</span>
                    <span className="font-semibold">Rp. {parseInt(invoice.total).toLocaleString('id')}</span>
                  </div>
                  <div className="w-full flex items-center text-sm">
                    <span className="font-bold mr-auto">Shipping:</span>
                    <span className="text-[11px] mr-1 font-semibold">({invoice.deliveryoption.name})</span>
                    <span className="font-semibold">Rp. {invoice.deliveryoption.cost.toLocaleString('id')}</span>
                  </div>
                  <div className="w-full flex items-center text-sm border-b py-[1px]">
                    <span className="font-bold mr-auto">Tax:</span>
                    <span className="text-xs mr-1 font-semibold">(5%)</span>
                    <span className="font-semibold">Rp. {(parseInt(invoice.total) * 0.05).toLocaleString('id')}</span>
                  </div>
                  <div className="w-full flex items-center py-[2px]">
                    <span className="font-bold mr-auto">Grand Total:</span>
                    <span className="font-semibold">
                      Rp. {(parseInt(invoice.total) + invoice.deliveryoption.cost + parseInt(invoice.total) * 0.05).toLocaleString('id')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 px-3 flex justify-end gap-4 relative">
        {received ? (
          <div className="flex items-center gap-1">
            <BsCheckAll className="text-sky-500" />
            <span className="text-gray-400">I have received this</span>
          </div>
        ) : invoice.status === 'approved' ? (
          <button
            disabled={loading}
            onClick={receivedHandler}
            className="h-10 w-36 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold cursor-pointer hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
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
        <BuyAgainModal items={invoice.invoiceitems} userId={userId} />
      </div>
    </div>
  );
};

export default HistoryCard;
