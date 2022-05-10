import { AiFillStar } from 'react-icons/ai';
import { FaThumbsUp } from 'react-icons/fa';

const ReviewCard = () => {
  return (
    <div className="w-full rounded-xl flex flex-col bg-white ring-1 ring-sky-200">
      <div className="w-full flex">
        <div className="h-full w-[30%] md:w-[25%] flex flex-col items-center">
          <div className="w-full pt-5 flex justify-center items-center">
            <div className="h-12 w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-full bg-gradient-to-br from-sky-300 to-emerald-300 flex justify-center items-center">
              <div className="h-[90%] w-[90%] rounded-full bg-white"></div>
            </div>
          </div>
          <div className="w-full py-1 px-2 flex flex-col items-center">
            <span className="text-md xl:text-lg font-semibold text-gray-700 max-w-full truncate">Randhy Satrio</span>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-2 py-1 px-1 sm:px-3 lg:px-1 lg:py-2 xl:py-0 xl:px-2 bg-sky-50 rounded-lg">
              <span className="text-2xl leading-tight xl:text-3xl xl:leading-normal text-sky-600">14</span>
              <div className="flex flex-col justify-center text-xs leading-tight">
                <span>Users found this</span>
                <span>review helpful</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[70%] md:w-[75%] flex flex-col ">
          <div className="w-full flex items-center justify-between py-1">
            <span className="text-md md:text-lg xl:text-xl font-semibold">gym bro starter pack</span>
            <div className="flex items-center text-amber-300 px-5">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
          </div>
          <div className="h-full w-full pr-4">
            <div className="w-full h-28 rounded-xl bg-gray-100 p-2 text-sm lg:text-md xl:text-base">
              <span>
                cannot stop hitting the gym after I bought this. i dream of doing benchpress in my sleep now. 5/5 absolutely would buy again
              </span>
            </div>
          </div>
          <div className="w-full py-2 pr-5 flex gap-1 items-center justify-between text-xs xl:text-sm font-semibold text-gray-500">
            <div className="w-full md:w-1/2 flex justify-start items-center">
              <span>Posted: May 4th, 2022 (edited)</span>
            </div>
            <div className="px-2 md:px-3 py-1 md:py-[6px] xl:py-2 flex justify-center items-center ring-1 ring-emerald-200 rounded-lg text-xs xl:text-sm">
              <FaThumbsUp className="hover:text-green-300 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="w-[95%] h-px bg-emerald-200 mx-auto mb-1"></div>
        <div className="w-full flex justify-center md:justify-end gap-2 pt-1 md:pr-5 pb-3">
          <button className="w-32 h-8 sm:h-9 rounded-lg font-semibold text-white bg-sky-400 active:scale-95 transition hover:brightness-110 text-sm lg:text-md">
            Edit Review
          </button>
          <button className="w-32 h-8 sm:h-9 rounded-lg font-semibold text-white bg-red-400 active:scale-95 transition hover:brightness-110 text-sm lg:text-md">
            Delete Review
          </button>
        </div>
      </>
    </div>
  );
};

export default ReviewCard;
