import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import MessagesModal from '../components/MessagesModal';
import { HiMail } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Messages = () => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [totalMsg, setTotalMsg] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Axios.post(`${API_URL}/message/user/${userGlobal.id}`, {
          limit,
          currentPage,
        });

        setMessages(response.data.rows);
        setMaxPage(Math.ceil(response.data.count / limit));
        setTotalMsg(response.data.count);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        toast.error('Unable to fetch Messages!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchMessages();

    return async () => {
      try {
        dispatch({
          type: 'ALERT_CLEAR',
          payload: 'alert',
        });
        await Axios.patch(`${API_URL}/message/unnew/${userGlobal.id}`);
      } catch (err) {
        toast.error('Unable to update messages status!', { position: 'bottom-left', theme: 'colored' });
      }
    };
  }, [userGlobal, currentPage]);

  const renderMessages = () => {
    return messages?.map((message) => (
      <MessagesModal
        key={message.id}
        userId={userGlobal.id}
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
    <div className="w-full h-full">
      <div className="w-9/12 h-full mx-auto pt-5 flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-2 text-3xl pl-2 py-2 border-b">
            <HiMail className="text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent font-semibold">
              My Notifications
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center py-7 gap-6 mb-auto">{renderMessages()}</div>
        <div className="w-full h-10 flex justify-end items-center gap-2 border-t px-5">
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
    </div>
  );
};

export default Messages;
