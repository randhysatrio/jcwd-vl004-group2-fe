import { useNavigate } from 'react-router-dom';

import BuyAgainModal from '../components/BuyAgainModal';
import { BsCheckAll } from 'react-icons/bs';

const HistoryItem = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-1">
      <div className="h-24 w-full flex">
        <div className="h-full w-[7%] flex justify-center items-center">
          <span>1.</span>
        </div>
        <div className="h-full w-[12%] flex justify-center items-center">
          <div className="h-16 w-16 rounded-md bg-green-500">
            <img
              src={
                'https://image.made-in-china.com/2f0j00FpvfKjMEEzud/Iknow-High-Purity-7553-56-2-Iodine-Crystals-99-Pure-with-Fast-Delivery.webp'
              }
              className="h-full object-contain"
            />
          </div>
        </div>
        <div className="h-full w-[36%] flex flex-col justify-center">
          {/* maxchar = 33 */}
          <span className="text-md font-semibold text-sky-700 hover:brightness-150 transition cursor-pointer">
            Primo E White Steroids Powder Me3...
          </span>
          <span>Biochemical</span>
        </div>
        <div className="h-full w-[14%] flex justify-center items-center text-md font-semibold">
          <span>Rp. 10.000.000</span>
        </div>
        <div className="h-full w-[13%] flex justify-center items-center text-md font-semibold">
          <span>1.200.000(g)</span>
        </div>
        <div className="flex-1 flex justify-center items-center text-md font-semibold">
          <span>Rp. 1.200.000.000</span>
        </div>
      </div>
      <div className="w-[95%] h-[1px] mx-auto bg-gray-200" />
    </div>
  );
};

const HistoryCard = () => {
  return (
    <div className="w-full border rounded-lg flex flex-col items-center overflow-hidden shadow">
      <div className="w-full py-2 px-4 text-sm font-semibold text-gray-500 flex items-center">
        <span className="mr-auto">#1</span>
        <span>April 20th, 2022 - 20:24:36</span>
        {/* <span className="py-1 px-3 rounded-lg bg-rose-200 text-rose-600 font-semibold ml-3">Rejected</span> */}
        {/* <span className="py-1 px-3 rounded-lg bg-sky-200 text-sky-600 font-semibold ml-3">Pending</span> */}
        <span className="py-1 px-3 rounded-lg bg-emerald-200 text-emerald-600 font-semibold ml-3">Approved</span>
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
            <div className="w-full h-full rounded-lg bg-gray-50 pb-1">
              <HistoryItem />
              <HistoryItem />
            </div>
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
                        <span className="font-semibold mb-1">Jl. Pakubuwono VI No.68, RT03/RW03, Kebayoran Baru</span>
                        <span>081294203353</span>
                      </div>
                      <div className="w-24 h-full flex flex-col text-sm">
                        <span>Jakarta Selatan</span>
                        {/* max char = 15 */}
                        <span>DKI JAKARTA</span>
                        <span>INDONESIA</span>
                        <span>12120</span>
                      </div>
                    </div>
                    <div className="h-full w-full p-2 flex flex-col text-sm">
                      <span className="font-bold">Notes:</span>
                      {/* max char = 106 */}
                      <span className="text-xs">
                        rumahnya yg warna putih, di lapis emas, pagernya banyak batu zamrudnya udh kyk di surga coy alig mewah bet...
                      </span>
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
                    <span className="font-semibold">Rp. 2.400.000.000</span>
                  </div>
                  <div className="w-full flex items-center text-sm">
                    <span className="font-bold mr-auto">Shipping:</span>
                    <span className="text-[11px] mr-1 font-semibold">(Indah Logistik)</span>
                    <span className="font-semibold">Rp. 23.000</span>
                  </div>
                  <div className="w-full flex items-center text-sm border-b py-[1px]">
                    <span className="font-bold mr-auto">Tax:</span>
                    <span className="text-xs mr-1 font-semibold">(5%)</span>
                    <span className="font-semibold">Rp. 120.000.000</span>
                  </div>
                  <div className="w-full flex items-center py-[2px]">
                    <span className="font-bold mr-auto">Grand Total:</span>
                    <span className="font-semibold">Rp. 2.520.023.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 px-3 flex justify-end gap-2 relative">
        <div className="flex items-center gap-1">
          <BsCheckAll className="text-sky-500" />
          <span className="text-gray-400 font-light">I have received this</span>
        </div>
        <BuyAgainModal />
      </div>
    </div>
  );
};

export default HistoryCard;
