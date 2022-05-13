import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { AiFillStar, AiFillFire, AiOutlineCloseCircle, AiOutlineArrowRight, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

const ProductDetailCarousel = ({ header, category, relatedProducts, navigate }) => {
  const renderStars = (score) => {
    let stars = 0;
    const renderedStars = [];

    if (Number.isInteger(score)) {
      stars = score;
    } else {
      stars = Math.floor(score);
    }

    for (let i = 0; i < stars; i++) {
      renderedStars.push(<AiFillStar />);
    }

    return renderedStars;
  };

  return (
    <div className="w-10/12 sm:w-11/12 lg:w-10/12 xl:w-2/3 flex flex-col items-center">
      <div className="w-full py-2 flex items-center gap-2 border-b cursor-default text-xl md:text-2xl font-bold">
        <span className=" text-slate-700">{header}</span>
        {category && <span className="text-sky-500">{category}</span>}
      </div>
      <div className="relative w-full">
        <button className="absolute z-20 top-44 -right-2 h-7 w-7 rounded-full bg-white ring-1 ring-blue-400 ring-offset-2 ring-inset cursor-pointer text-sm font-bold text-blue-400 transition-all flex justify-center items-center hover:-right-4 active:scale-95 hover:bg-sky-50 nextSlide">
          <BsChevronRight />
        </button>
        <button className="absolute z-20 top-44 -left-2 h-7 w-7 rounded-full bg-white ring-1 ring-blue-400 ring-offset-2 ring-inset cursor-pointer text-sm font-bold text-blue-400 transition-all flex justify-center items-center hover:-left-4 active:scale-95 hover:bg-sky-50 prevSlide">
          <BsChevronLeft />
        </button>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.nextSlide',
            prevEl: '.prevSlide',
            disabledClass: 'text-gray-400 bg-gray-200 ring-gray-300 invisible',
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="h-[370px]"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id} className="flex items-center justify-center">
              <div
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}
                className="h-[89%] w-[220px] sm:w-full md:w-[97%] rounded-xl border border-slate-300 bg-white cursor-pointer shadow transition"
              >
                <div className="w-full h-1/2 flex items-center justify-center">
                  <div className="h-[140px] w-[140px] md:h-[120px] md:w-[120px] lg:h-[140px] lg:w-[140px] flex justify-center items-center border border-zinc-300 bg-white overflow-hidden rounded-lg">
                    <img src={product.image} className="h-full object-contain" />
                  </div>
                </div>
                <div className="w-full h-1/2 px-2">
                  <div className="w-full flex items-center">
                    <span className="max-h-12 w-full text-slate-700 font-semibold hover:text-sky-500 transition cursor-pointer line-clamp-2">
                      {product.name}
                    </span>
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="w-full py-[2px] flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                        Rp. {product.price_sell ? product.price_sell.toLocaleString('id') : null}
                      </span>
                      <span className="text-sm font-semibold text-sky-600 mt-1">/{product.unit}</span>
                    </div>
                    {product.totalReviews ? (
                      <div className="w-full py-[2px] flex items-center text-md text-amber-300">
                        {renderStars(product.avgRating)}
                        <span className="text-gray-600 font-semibold text-sm ml-1">({product.totalReviews})</span>
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full py-[2px] flex items-center font-semibold text-gray-700 text-sm gap-1">
                    {product.stock_in_unit ? (
                      product.stock_in_unit <= 5 * product.volume ? (
                        <>
                          <AiFillFire className="text-orange-500" />
                          <span>
                            {!Math.floor(product.stock_in_unit / product.volume)
                              ? `Last item!`
                              : `${Math.floor(product.stock_in_unit / product.volume)} remaining!`}
                          </span>
                        </>
                      ) : (
                        <>
                          <AiOutlineCheckCircle className="text-sky-400" />
                          <span>Currently in stock!</span>
                        </>
                      )
                    ) : (
                      <>
                        <AiOutlineCloseCircle className="text-red-400" />
                        <span>Out of stock</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="flex justify-center items-center">
            <div
              onClick={() => navigate(`/products/${category}`)}
              className="h-[330px] w-[220px] sm:w-[200px] rounded-xl flex flex-col justify-center border bg-gradient-to-b from-sky-200 to-white cursor-pointer shadow relative"
            >
              <div className="w-full flex flex-col gap-1 px-6 text-xl font-bold absolute z-10">
                <span className="text-sky-700">See</span>
                <span className="text-sky-700">All</span>
                <div className="flex flex-col gap-2 group">
                  <span className="text-sky-400 group-hover:brightness-125 transition">{category}?</span>
                  <AiOutlineArrowRight className="text-xl text-sky-400 group-hover:brightness-150 group-hover:translate-x-4 transition-all" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetailCarousel;
