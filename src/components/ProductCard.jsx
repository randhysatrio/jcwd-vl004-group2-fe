import { FaSearch, FaHeart, FaStar } from "react-icons/fa";
import bgImg from "../assets/images/slide-5.png";
import bgImg1 from "../assets/images/slide-6.png";
import bgImg2 from "../assets/images/slide-7.png";
import bgImg3 from "../assets/images/categories_1.jpg";

const ProductCard = () => {
  return (
    // product wrapper
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        new arrival
      </h2>
      {/* product grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* single product */}
        <div className="bg-white shadow-md rounded overflow-hidden group">
          {/* product image */}
          <div className="relative">
            <img src={bgImg} className="relative h-80 object-cover" />

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaSearch />
              </a>
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaHeart />
              </a>
            </div>
          </div>
          {/* product image end */}

          {/* product content */}
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                Panadol
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-sm text-gray-400 line-through">$55.00</p>
            </div>
            <div className="flex items-center">
              <div className="flex gap-1 text-sm text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          {/* <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to Cart
          </a> */}
          {/* product content end */}
        </div>
        {/* single product end */}
        {/* single product */}
        <div className="bg-white shadow-md rounded overflow-hidden group">
          {/* product image */}
          <div className="relative">
            <img src={bgImg1} className="relative h-80 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaSearch />
              </a>
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaHeart />
              </a>
            </div>
          </div>
          {/* product image end */}

          {/* product content */}
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                Panadol
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-sm text-gray-400 line-through">$55.00</p>
            </div>
            <div className="flex items-center">
              <div className="flex gap-1 text-sm text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          {/* <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to Cart
          </a> */}
          {/* product content end */}
        </div>
        {/* single product end */}
        {/* single product */}
        <div className="bg-white shadow-md rounded overflow-hidden group">
          {/* product image */}
          <div className="relative">
            <img src={bgImg2} className="relative h-80 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaSearch />
              </a>
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaHeart />
              </a>
            </div>
          </div>
          {/* product image end */}

          {/* product content */}
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                Panadol
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-sm text-gray-400 line-through">$55.00</p>
            </div>
            <div className="flex items-center">
              <div className="flex gap-1 text-sm text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          {/* <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to Cart
          </a> */}
          {/* product content end */}
        </div>
        {/* single product end */}
        {/* single product */}
        <div className="bg-white shadow-md rounded overflow-hidden group">
          {/* product image */}
          <div className="relative">
            <img src={bgImg3} className="relative h-80 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaSearch />
              </a>
              <a
                href="#"
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              >
                <FaHeart />
              </a>
            </div>
          </div>
          {/* product image end */}

          {/* product content */}
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                Panadol
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto">
              <p className="text-xl text-primary font-semibold">$45.00</p>
              <p className="text-sm text-gray-400 line-through">$55.00</p>
            </div>
            <div className="flex items-center">
              <div className="flex gap-1 text-sm text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="text-xs text-gray-500 ml-3">(150)</div>
            </div>
          </div>
          {/* <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to Cart
          </a> */}
          {/* product content end */}
        </div>
        {/* single product end */}
      </div>
      {/* product grid end */}
    </div>
    // product wrapper end
  );
};

export default ProductCard;
