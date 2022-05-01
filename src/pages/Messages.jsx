import React from 'react';
import { HiMail } from 'react-icons/hi';

import MessagesModal from '../components/MessagesModal';

const Messages = () => {
  return (
    <div className="w-full h-full">
      <div className="w-9/12 h-full mx-auto pt-6">
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-2 text-3xl pl-2 py-2 border-b">
            <HiMail className="text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent font-semibold">
              My Notifications
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-center py-5">
          <MessagesModal />
        </div>
      </div>
    </div>
  );
};

export default Messages;
