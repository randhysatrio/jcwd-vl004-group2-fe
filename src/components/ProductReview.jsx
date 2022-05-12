import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import ReviewCard from './ReviewCard';
import AddReviewModal from './AddReviewModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ProductReview = ({ productId, setTotalReviews, setAvgRating }) => {
  const adminToken = localStorage.getItem('adminToken');
  const userId = useSelector((state) => state.user.id);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.post(`${API_URL}/review/product/${productId}`, {
          currentPage,
          limit,
        });

        setReviews(response.data.rows);
        setMaxPage(response.data.maxPage);
      } catch (err) {
        toast.err('Unable to fetch Reviews!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchReviews();
  }, [currentPage, productId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productId]);

  const renderReviews = () => {
    return reviews.map((review) => (
      <ReviewCard
        key={review.id}
        userId={userId}
        data={review}
        setTotalReviews={setTotalReviews}
        setAvgRating={setAvgRating}
        setReviews={setReviews}
        setCurrentPage={setCurrentPage}
        setMaxPage={setMaxPage}
        limit={limit}
      />
    ));
  };

  return (
    <div id="product-review" className="w-full py-3 flex flex-col items-center">
      <div className="w-10/12 sm:w-11/12 lg:w-10/12 xl:w-2/3 h-14 flex items-center border-b">
        <span className="font-bold text-xl md:text-2xl text-sky-400">Product Reviews</span>
      </div>
      <div className="w-10/12 sm:w-11/12 lg:w-10/12 xl:w-2/3 flex flex-col lg:flex-row">
        <div className="w-full xl:w-[80%] flex flex-col items-center gap-4 lg:gap-5 py-3 sm:px-2 xl:px-5">
          {reviews?.length ? (
            renderReviews()
          ) : (
            <div className="w-full h-60 md:h-72 lg:h-96 full flex flex-col items-center justify-center gap-1">
              <span className="text-3xl font-thin text-gray-700">No reviews yet..</span>
              <span className="font-thin text-gray-700">Be the first to write reviews!</span>
            </div>
          )}
          {reviews?.length ? (
            <div className="w-full flex items-center justify-end gap-1 text-sm text-gray-400 border-t py-1">
              <span>{currentPage}</span>
              <span>of</span>
              <span>{maxPage}</span>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="disabled:text-gray-300 active:scale-95 hover:brightness-110 disabled:hover:brightness-100 transition"
              >
                <FaChevronLeft />
              </button>
              <button
                disabled={currentPage === maxPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="disabled:text-gray-300 active:scale-95 hover:brightness-110 disabled:hover:brightness-100 transition"
              >
                <FaChevronRight />
              </button>
            </div>
          ) : null}
        </div>
        {!adminToken ? (
          <div className="w-full lg:w-[20%] lg:py-3 flex justify-center">
            <AddReviewModal
              productId={productId}
              userId={userId}
              setTotalReviews={setTotalReviews}
              setAvgRating={setAvgRating}
              setMaxPage={setMaxPage}
              setReviews={setReviews}
              setCurrentPage={setCurrentPage}
              limit={limit}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductReview;
