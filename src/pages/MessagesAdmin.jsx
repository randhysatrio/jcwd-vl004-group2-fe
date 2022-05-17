import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import MessagesModal from '../components/MessagesModal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const MessagesAdmin = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [totalMsg, setTotalMsg] = useState(0);
  const limit = 7;

  const socket = useCallback(
    useSelector((state) => state.socket.instance),
    []
  );

  useEffect(() => {
    dispatch({
      type: 'ALERT_CLEAR',
      payload: 'alert',
    });

    const fetchAdminMsg = async () => {
      try {
        const response = await Axios.post(`${API_URL}/message/admin`, {
          limit,
          currentPage,
          keyword: searchParams.get('keyword'),
        });

        setMessages(response.data.rows);
        setMaxPage(response.data.maxPage);
        setTotalMsg(response.data.count);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        toast.error('Unable to fetch Admin Messages', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchAdminMsg();

    socket?.on('newAdminNotif', () => {
      fetchAdminMsg();
      return;
    });

    socket?.on('newPaymentNotif', () => {
      fetchAdminMsg();
      return;
    });

    return async () => {
      try {
        dispatch({
          type: 'ALERT_CLEAR',
          payload: 'alert',
        });
        await Axios.patch(`${API_URL}/message/unnew-admin`);
      } catch (err) {
        toast.error('Unable to update messages status!', { position: 'bottom-left', theme: 'colored' });
      }
    };
  }, [currentPage, search, socket]);

  useEffect(() => {
    if (currentPage === 1) {
      return;
    } else if (totalMsg <= currentPage * limit - limit) {
      setCurrentPage(currentPage - 1);
    }
  }, [totalMsg]);

  const renderMessages = () => {
    return messages?.map((message) => (
      <MessagesModal
        key={message.id}
        message={message}
        limit={limit}
        currentPage={currentPage}
        setMessages={setMessages}
        setMaxPage={setMaxPage}
        setTotalMsg={setTotalMsg}
      />
    ));
  };

  return (
    <div className="h-full w-full flex flex-col px-10">
      <div className="w-full pt-4">
        <span className="text-3xl font-thin">Notifications</span>
        <div className="w-full h-[1px] my-1 bg-gray-300"></div>
      </div>
      <div className="w-full py-5 flex flex-col gap-6 pl-10 mb-auto">{renderMessages()}</div>
      <div className="w-full flex justify-end items-center gap-2 border-t py-2 px-5">
        <span className="text-sm text-gray-400 italic">
          Showing {currentPage * limit - limit + 1} to {currentPage * limit - limit + messages.length} from {totalMsg}
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="hover:text-sky-500 disabled:text-gray-300 active:scale-95 disabled:active:scale-100 transition"
          >
            <FiChevronLeft />
          </button>
          <button
            disabled={currentPage === maxPage}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className="hover:text-sky-500 disabled:text-gray-300 active:scale-95 disabled:active:scale-100 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesAdmin;
