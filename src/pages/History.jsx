import { useEffect, useState } from 'react';

import HistoryCard from '../components/HistoryCard';
import { BiCalendar } from 'react-icons/bi';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const History = () => {
  const [currentView, setCurrentView] = useState('all');
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    console.log(selectedDates.gte?.toISOString());
  }, [selectedDates]);

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
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent py-1 pl-1">
                All Transactions
              </span>
            )}
            {currentView === 'approved' && (
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent py-1 pl-1">
                Approved Transactions
              </span>
            )}
            {currentView === 'pending' && (
              <span className="font-thin text-3xl bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent py-1 pl-1">
                Pending Transactions
              </span>
            )}
            <div className="relative ml-auto group">
              <div className="p-2 rounded-lg bg-gray-100  flex items-center cursor-pointer group">
                <span
                  className={`font-semibold flex items-center gap-2 text-sm ${
                    selectedDates.gte && selectedDates.lte ? 'text-sky-500' : 'text-slate-700 group-hover:hover:text-sky-600'
                  } transition`}
                >
                  <BiCalendar className="text-slate-600" />
                  {selectedDates.gte && selectedDates.lte
                    ? `${selectedDates.gte.toLocaleDateString('id')} - ${selectedDates.lte.toLocaleDateString('id')}`
                    : 'Select Date'}
                </span>
              </div>
              <div className="w-max p-3 flex flex-col rounded-lg bg-gray-300 bg-opacity-60 backdrop-blur-sm absolute z-[40] right-11 top-8 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all shadow-lg">
                <DateRangePicker
                  className="rounded-lg overflow-hidden"
                  onChange={(date) => setRanges([date.selection])}
                  showSelectionPreview={true}
                  ranges={ranges}
                />
                <div className="w-full mt-2 flex justify-center gap-3">
                  <button
                    className="w-24 py-2 rounded-2xl text-white font-bold bg-rose-400 hover:brightness-110 active:scale-95 transition"
                    onClick={() => {
                      setRanges([{ ...ranges[0], startDate: new Date(), endDate: new Date() }]);
                      setSelectedDates({});
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="w-24 py-2 rounded-2xl text-white font-bold bg-emerald-400 hover:brightness-110 active:scale-95 transition"
                    onClick={() => setSelectedDates({ gte: ranges[0].startDate, lte: ranges[0].endDate })}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
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
