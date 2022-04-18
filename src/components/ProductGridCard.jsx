import { useNavigate } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const ProductGridCard = ({ product, newarrival, bestseller }) => {
  const navigate = useNavigate();

  return (
    <div className="h-[310px] w-56 flex flex-col justify-center items-center rounded-lg overflow-hidden border relative shadow-md group">
      <div className="absolute z-2 inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-30 group-hover:backdrop-blur-sm transition-all"></div>
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="h-12 w-12 rounded-full bg-white absolute z-3 my-auto mx-auto opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-sky-600 active:scale-95 cursor-pointer"
      >
        <FaSearch className="hover:brightness-125 transition" />
      </div>
      <div className="w-full h-1/2 flex justify-center items-center bg-white border-b">
        <img src={product.image} className="h-full object-contain" />
      </div>
      <div className="w-full h-1/2 bg-gray-50">
        <div className="w-full max-h-14 py-2 px-3 flex items-center">
          <span className="text-lg leading-snug font-semibold text-sky-900 cursor-pointer">
            {product.name.length > 36 ? product.name.slice(0, 36) + '...' : product.name}
          </span>
        </div>
        <div className="w-full pl-3 bg-red-200s">
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
            Rp. {product.price_sell ? product.price_sell.toLocaleString('id') : 0}
          </span>
        </div>
        <div className="w-full py-1 px-3 flex items-center gap-1 text-sm">
          <div className="flex text-amber-300">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <span className="font-semibold text-slate-700">(12)</span>
        </div>
        <div className="w-full py-1 flex gap-1 items-center px-3">
          {newarrival && (
            <span className="h-6 px-2 rounded-md bg-green-300 text-green-600 flex items-center font-semibold text-xs">New Arrival</span>
          )}
          {bestseller && (
            <span className="h-6 px-2 rounded-md bg-amber-200 text-amber-600 flex items-center font-semibold text-xs">Best Seller</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
