import { useNavigate } from 'react-router-dom';

import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineMail, AiFillStar, AiFillFire } from 'react-icons/ai';

const ProductCardAll = ({ view, product }) => {
  const navigate = useNavigate();

  return (
    <>
      {view === 'grid' ? (
        <div className="w-[232px] h-96 m-2 border hover:bg-zinc-100 rounded-md flex flex-col cursor-pointer">
          <div className="w-full h-36 flex justify-center items-center">
            <div className="w-32 h-32 flex justify-center items-center rounded-lg border border-slate-300 overflow-hidden bg-white">
              <img src={product.image} className="w-full hover:scale-105 object-contain transition" />
            </div>
          </div>
          <div className="w-full h-60 flex flex-col pb-2 px-2">
            <span className="text-sm font-light text-slate-400">{product.category.name}</span>
            <div className="w-full h-12 flex items-center break-words overflow-hidden">
              <span
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-base text-slate-800 font-semibold hover:text-sky-500 transition"
              >
                {product.name.length > 40 ? product.name.slice(0, 40) + '...' : product.name}
              </span>
            </div>
            <div className="w-full flex items-center">
              <span className="text-lg font-bold w-max bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                Rp. {product.price_sell ? product.price_sell.toLocaleString('id') : null}/{product.unit}
              </span>
            </div>
            <div className="flex w-full items-center gap-2 text-sm">
              <div className="flex text-amber-300 py-2">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <span className="font-semibold text-sky-900">12 reviews</span>
            </div>
            <div className="text-sm flex items-center font-semibold text-slate-800 gap-2">
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
            <button className="w-[90%] h-9 rounded-md mt-auto mx-auto bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold hover:brightness-110 cursor-pointer transition active:scale-95 text-sm gap-2 flex justify-center items-center shadow">
              <AiOutlineMail />
              <span className="font-semibold">Send Inquiry</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-60 flex border-b mb-1 border-slate-300">
          <div className="w-[30%] h-full flex justify-center items-center p-4">
            <div className="w-52 h-52 bg-white border rounded-lg overflow-hidden flex shadow justify-center items-center cursor-pointer">
              <img src={product.image} className="w-full object-contain hover:scale-110 transition" />
            </div>
          </div>
          <div className="w-[45%] h-full flex flex-col pt-4">
            <div className="w-full flex flex-col gap-1 mb-2">
              <span
                onClick={() => navigate(`/products/${product.id}`)}
                className="text-xl font-semibold text-zinc-800 hover:text-sky-500 transition cursor-pointer"
              >
                {product.name.length > 42 ? product.name.slice(0, 42) + '...' : product.name}
              </span>
              <span className="font-semibold text-slate-400">{product.category.name}</span>
              <div className="flex w-full items-center gap-2">
                <div className="flex text-md text-amber-300 py-2">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="text-md font-semibold text-sky-900">12 reviews</span>
              </div>
            </div>
            <div className="w-full overflow-hidden leading-none text-ellipsis">
              <span className="text-xs">{product.description}</span>
            </div>
          </div>
          <div className="w-[25%] h-full pt-4 pr-4">
            <div className="w-full flex flex-col items-end gap-2 mb-3">
              <span className="text-2xl w-max bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent font-bold">
                Rp. {product.price_sell ? product.price_sell.toLocaleString('id') : null}/{product.unit}
              </span>
              <div className="text-lg flex items-center font-semibold text-slate-800 gap-2">
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
            <div className="w-full flex justify-end">
              <button
                onClick={() => alert('Inquiry send')}
                className="w-[75%] h-10 rounded-lg bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold hover:brightness-110 cursor-pointer transition active:scale-95 text-md gap-2 flex justify-center items-center shadow"
              >
                <AiOutlineMail />
                <span className="font-semibold">Send Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardAll;
