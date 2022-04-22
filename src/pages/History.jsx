import { useState, Fragment } from 'react';

import BuyAgainModal from '../components/BuyAgainModal';
import { BsCheckAll } from 'react-icons/bs';
import HistoryCard from '../components/HistoryCard';

import { Dialog, Transition } from '@headlessui/react';

const History = () => {
  const [currentView, setCurrentView] = useState('all');

  return (
    <div className="w-full h-full flex flex-col items-center pt-5">
      <div className="w-5/6 rounded-xl overflow-hidden border mb-7">
        <div className="w-full h-32 rounded-b-lg border-b bg-gradient-to-r from-white to-emerald-400 flex items-end pl-6 pb-2 text-4xl font-thin text-emerald-700">
          <span>Transaction History</span>
        </div>
        <div className="h-10 bg-gradient-to-r bg-gray-50 flex justify-end items-center gap-4 px-8">
          <div className="relative">
            <div
              onClick={() => setCurrentView('all')}
              className={`font-semibold before:absolute before:top-[24px] before:left-[50%] before:h-[2px] before:bg-emerald-500  before:transition-all after:absolute after:top-[24px] after:right-[50%] after:h-[2px] after:bg-emerald-500 after:transition-all cursor-pointer ${
                currentView === 'all' ? 'before:w-[50%] after:w-[50%] text-sky-500' : 'before:w-0 after:w-0 text-emerald-600'
              }`}
            >
              All
            </div>
          </div>
          <div className="relative">
            <div
              onClick={() => setCurrentView('approved')}
              className={`font-semibold  before:absolute before:top-[24px] before:left-[50%] before:h-[2px] before:bg-emerald-500  before:transition-all after:absolute after:top-[24px] after:right-[50%] after:h-[2px] after:bg-emerald-500 after:transition-all cursor-pointer ${
                currentView === 'approved' ? 'before:w-[50%] after:w-[50%] text-sky-500' : 'before:w-0 after:w-0 text-emerald-600'
              }`}
            >
              Approved
            </div>
          </div>
          <div className="relative">
            <div
              onClick={() => setCurrentView('pending')}
              className={`font-semibold  before:absolute before:top-[24px] before:left-[50%] before:h-[2px] before:bg-emerald-500  before:transition-all after:absolute after:top-[24px] after:right-[50%] after:h-[2px] after:bg-emerald-500 after:transition-all cursor-pointer ${
                currentView === 'pending' ? 'before:w-[50%] after:w-[50%] text-sky-500' : 'before:w-0 after:w-0 text-emerald-600'
              }`}
            >
              Pending
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/6 py-2">
        <div className="w-full flex flex-col px-2">
          <div className="w-full flex items-center pr-2">
            {currentView === 'all' && (
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-200 bg-clip-text text-transparent py-1 pl-1">
                All Transactions
              </span>
            )}
            {currentView === 'approved' && (
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-200 bg-clip-text text-transparent py-1 pl-1">
                Approved Transactions
              </span>
            )}
            {currentView === 'pending' && (
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-200 bg-clip-text text-transparent py-1 pl-1">
                Pending Transactions
              </span>
            )}
            <select className="w-max h-9 ml-auto px-1 bg-gray-100 rounded-lg text-sm font-semibold focus:outline-sky-500 cursor-pointer">
              <option>Sort By:</option>
              <optgroup label="Date">
                <option>Latest</option>
              </optgroup>
            </select>
          </div>
          <div className="h-[1px] w-full bg-gray-200 rounded-full" />
        </div>
        <div className="w-full flex flex-col gap-10 py-6 px-8">
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </div>
      </div>
    </div>
  );
};

export default History;
