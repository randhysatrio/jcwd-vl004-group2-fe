import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai';

const ProductDetailCarousel = ({ relatedProducts, navigate }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // navigation
        modules={[Pagination]}
        className="h-[370px] w-[75%]"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id} className="flex items-center justify-center">
            <div
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
              className="h-[320px] w-[230px] rounded-xl my-3 border border-slate-300 bg-white cursor-pointer transition"
            >
              <div className="w-full h-1/2 flex items-center justify-center">
                <div className="h-[130px] w-[130px] flex justify-center items-center border border-zinc-300 bg-white overflow-hidden rounded-lg">
                  <img src={product.image} className="h-full object-contain" />
                </div>
              </div>
              <div className="w-full h-1/2 px-2">
                <div className="w-full h-12 flex items-center break-words overflow-hidden px-1">
                  <span className="text-base text-slate-700 font-semibold hover:text-sky-500 transition cursor-pointer">
                    {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                  </span>
                </div>
                <div className="w-full flex h-10">
                  <div className="w-[45%] h-full flex justify-center items-center ">
                    <span className="text-xl font-bold w-max bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                      Rp. {product.price_sell}
                    </span>
                  </div>
                  <div className="w-[55%] h-full flex-col">
                    <div className="h-full w-full flex justify-center items-center text-md text-amber-300">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <span className="text-gray-600 font-semibold ml-1">(12)</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-7">
                  <div className="w-full h-full flex items-center text-sm gap-1">
                    <AiOutlineCheckCircle className="text-sky-500" />
                    <span className="font-semibold text-slate-700">Currently in stock!</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductDetailCarousel;
