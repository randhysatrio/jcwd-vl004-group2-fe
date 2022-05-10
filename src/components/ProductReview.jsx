import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import ReviewCard from './ReviewCard';
import AddReviewModal from './AddReviewModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductReview = ({ productId, userId, setTotalReviews, setAvgRating }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 5;

  useEffect(() => {}, []);

  return (
    <div className="w-screen py-3 flex flex-col items-center">
      <div className="w-2/3 h-14 flex items-center border-b">
        <span className="font-bold text-2xl text-sky-400">Product Reviews</span>
      </div>
      <div className="w-2/3 flex flex-col lg:flex-row">
        <div className="w-full xl:w-[80%] flex flex-col items-center gap-4 lg:gap-5 py-3 sm:px-2 xl:px-5">
          {/* <div className="w-full h-60 md:h-72 lg:h-96 full flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-thin text-gray-700">No reviews yet..</span>
            <span className="font-thin text-gray-700">Be the first to write reviews!</span>
          </div> */}
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <div className="w-full flex items-center justify-end gap-1 text-sm text-gray-400 border-t py-1">
            <span>{currentPage}</span>
            <span>of</span>
            <span>{maxPage}</span>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="disabled:text-gray-300 active:scale-95 hover:brightness-110 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              disabled={currentPage === maxPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="disabled:text-gray-300 active:scale-95 hover:brightness-110 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[20%] lg:py-3 flex justify-center">
          <AddReviewModal productId={productId} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
