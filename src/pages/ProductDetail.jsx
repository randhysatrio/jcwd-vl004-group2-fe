import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetailsImage from '../components/ProductDetailsImage';
import ProductDetailCarousel from '../components/ProductDetailCarousel';
import {
  AiFillStar,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
  AiFillFire,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { BsCartPlus, BsChevronRight } from 'react-icons/bs';
import { IoBagCheckOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [qtyError, setQtyError] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await Axios.get(`${API_URL}/product/find/${params.id}`);

        setProductData(response.data);

        if (response.data.stock_in_unit) {
          if (!response.data.stock) {
            setQuantity(response.data.stock_in_unit);
          } else {
            setQuantity(response.data.volume);
          }
        }
      } catch (err) {
        toast.error('Unable to fetch product data!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchProductData();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await Axios.post(`${API_URL}/product/query`, {
          category: productData.category?.name,
          limit: 8,
          offset: 0,
          exclude: productData?.id,
        });
        setRelatedProducts(response.data.products);
      } catch (err) {
        toast.error('Unable to fetch product carousel!', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchRelatedProducts();
  }, [productData]);

  useEffect(() => {
    if (!quantity && productData.stock_in_unit) {
      setQtyError('Please enter a valid amount');
    } else if (quantity > productData.stock_in_unit) {
      setQtyError('Quantity exceeds stock');
    } else {
      setQtyError('');
    }
  }, [quantity]);

  const addToCart = async () => {
    try {
      if (!userToken) {
        navigate('/login');
      } else {
        setCartLoading(true);

        const response = await Axios.post(`${API_URL}/cart/add`, {
          userId: userGlobal.id,
          productId: productData.id,
          quantity,
        });

        if (response.data.conflict) {
          setCartLoading(false);

          toast.warning(response.data.message, { theme: 'colored', position: 'bottom-left' });
        } else {
          setCartLoading(false);

          toast.success(response.data, { position: 'bottom-left', theme: 'colored' });

          if (!productData.stock) {
            setQuantity(productData.stock_in_unit);
          } else {
            setQuantity(productData.volume);
          }
        }
      }
    } catch (error) {
      toast.error('Unable to add this item to your cart!', { theme: 'colored', position: 'bottom-left' });
    }
  };

  const checkoutHandler = () => {
    if (!userToken) {
      navigate('/login');
    } else {
      const checkoutData = {
        data: [{ userId: userGlobal.id, quantity, price: productData.price_sell, product: productData }],
        subtotal: productData.price_sell * quantity,
      };

      localStorage.setItem('checkout-data', JSON.stringify(checkoutData));

      navigate('/checkout');
    }
  };

  return (
    <>
      <Header />
      <div className="h-max py-3 flex flex-col items-center">
        <div className="w-3/4 flex gap-1 items-center text-gray-700 text-sm">
          <span
            onClick={() => {
              navigate('/');
            }}
            className="hover:text-sky-500 hover:underline transition-all cursor-pointer"
          >
            Home
          </span>
          <BsChevronRight className="text-xs" />
          <span
            onClick={() => {
              navigate('/products/all');
            }}
            className="hover:text-sky-500 hover:underline transition-all cursor-pointer"
          >
            Shop
          </span>
          <BsChevronRight className="text-xs" />
          <span className="underline underline-offset-1">{productData.name}</span>
        </div>
        <div className="w-3/4 h-[570px] flex">
          <div className="w-[60%] h-full flex justify-center items-center">
            <ProductDetailsImage img={productData.image} name={productData.name} />
          </div>
          <div className="w-[2px] h-[85%] bg-slate-200 my-auto" />
          <div className="w-[40%] h-full flex flex-col justify-center pl-3">
            <div className="w-full flex flex-col">
              <div className="w-full h-12 flex items-center ">
                <span className="text-xl font-bold text-sky-800">{productData.name}</span>
              </div>
              <div className="w-full h-9 flex items-center">
                <span className="text-xl leading-snug font-bold w-max bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
                  Rp. {productData.price_sell ? productData.price_sell.toLocaleString('id') : null},-
                </span>
              </div>
              <div className="w-full h-7 flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-300">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <span className="font-semibold text-slate-600">12 Review(s)</span>
              </div>
            </div>
            <div className="w-full h-11 flex flex-col justify-center text-sm">
              <span className="font-bold">Category:</span>
              <span className="text-slate-800">{productData.category?.name}</span>
            </div>
            <div className="w-full h-[140px] flex flex-col text-sm mb-1">
              <div className="w-full h-6 flex items-center">
                <span className="font-bold">Description</span>
              </div>
              <div className="w-full h-full rounded-lg flex items-center bg-gray-100 p-1">
                <span className="text-slate-800">{productData.description}</span>
              </div>
            </div>
            <div className="w-full h-[130px] gap-2 flex items-center">
              <div className="w-1/2 h-full flex flex-col text-sm">
                <div className="w-full flex items-center border-b mb-1">
                  <span className="font-bold">Details</span>
                </div>
                <div className="w-full h-full p-2 bg-gray-100 rounded-lg flex flex-col justify-center gap-2">
                  <div className="w-full flex justify-between">
                    <span className="font-semibold text-slate-600">Volume</span>
                    <span className="font-bold text-slate-800">{productData.volume ? productData.volume.toLocaleString('id') : null}</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="font-semibold text-slate-600">Unit</span>
                    <span className="font-bold text-slate-800">{productData.unit}</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span className="font-semibold text-slate-600">Appearance</span>
                    <span className="font-bold text-slate-800">{productData.appearance}</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-full flex flex-col">
                <div className="w-full flex items-center justify-between border-b text-sm">
                  <span className="font-bold">Stock</span>
                  <div className="flex items-center gap-1 font-semibold">
                    {productData.stock_in_unit ? (
                      productData.stock_in_unit <= 5 * productData.volume ? (
                        <>
                          <AiFillFire className="text-orange-500" />
                          <span>
                            {!Math.floor(productData.stock_in_unit / productData.volume)
                              ? `Last item!`
                              : `${Math.floor(productData.stock_in_unit / productData.volume)} remaining!`}
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
                <div className="w-full flex justify-between items-center my-2">
                  <div className="flex gap-1">
                    <span className="font-semibold">{productData.stock ? productData.stock.toLocaleString('id') : 0}</span>
                    <span>{productData.unit === 'g' ? 'pack(s)' : 'bottle(s)'}</span>
                  </div>
                  <span>/</span>
                  <div className="flex gap-1">
                    <span className="font-semibold">{productData.stock_in_unit ? productData.stock_in_unit.toLocaleString('id') : 0}</span>
                    <span>{productData.unit}</span>
                  </div>
                </div>
                {!adminToken && (
                  <>
                    <div className="w-full h-12 flex">
                      <div className="h-full w-[90%] flex items-center justify-center p-1 relative">
                        <button
                          onClick={() => setQuantity(quantity - productData.volume)}
                          disabled={quantity <= productData.volume || !productData.stock_in_unit}
                          className="w-11 h-[43px] bg-transparent text-xl border-r flex items-center justify-center absolute top-[3px] left-1 group"
                        >
                          <AiOutlineMinus
                            className={`${
                              quantity <= productData.volume || !productData.stock_in_unit
                                ? 'text-slate-400'
                                : 'group-active:scale-90 group-hover:text-sky-500'
                            } transition`}
                          />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          min={0}
                          disabled={!productData.stock_in_unit}
                          onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                          }}
                          className={`w-full h-[45px] rounded-lg border border-slate-400 focus:outline-none ${
                            !productData.stock_in_unit ? 'bg-slate-200 cursor-default' : 'bg-white focus-within:border-sky-400'
                          }  transition px-12 text-center cursor-pointer font-semibold`}
                        />
                        <button
                          onClick={() => setQuantity(quantity + productData.volume)}
                          disabled={
                            quantity >= productData.stock_in_unit ||
                            quantity + productData.volume > productData.stock_in_unit ||
                            !productData.stock_in_unit
                          }
                          className="w-11 h-[43px] bg-transparent text-xl border-l flex items-center justify-center absolute top-[3px] right-1 group"
                        >
                          <AiOutlinePlus
                            className={`${
                              quantity >= productData.stock_in_unit ||
                              quantity + productData.volume > productData.stock_in_unit ||
                              !productData.stock_in_unit
                                ? 'text-slate-400'
                                : 'group-active:scale-90 group-hover:text-sky-500'
                            } transition`}
                          />
                        </button>
                      </div>
                      <div className="w-[10%] h-full flex flex-col justify-center items-center">
                        <span className="text-xs leading-none">in</span>
                        <span className="text-md font-semibold leading-none">{productData.unit}</span>
                      </div>
                    </div>
                    <div className="w-[90%] py-[1px] flex justify-center items-center leading-0">
                      {qtyError && <span className="text-xs text-red-400">{qtyError}</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
            {!adminToken && (
              <div className="w-full h-[52px] my-2 flex items-center p-1 gap-1">
                <button
                  onClick={checkoutHandler}
                  disabled={qtyError || !productData.stock_in_unit}
                  className={`h-full w-1/2 rounded-lg flex justify-center items-center gap-1 text-white font-semibold ${
                    qtyError || !productData.stock_in_unit ? 'bg-emerald-300' : 'bg-emerald-500 hover:brightness-110 active:scale-95'
                  } transition`}
                >
                  <IoBagCheckOutline />
                  Checkout
                </button>
                <button
                  onClick={addToCart}
                  disabled={qtyError || !productData.stock_in_unit || cartLoading}
                  className={`h-full w-1/2 rounded-lg flex justify-center items-center gap-1 text-white font-semibold ${
                    qtyError || !productData.stock_in_unit || cartLoading ? 'bg-sky-300' : 'bg-sky-500 hover:brightness-110 active:scale-95'
                  } transition`}
                >
                  {cartLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Adding item..
                    </>
                  ) : (
                    <>
                      <BsCartPlus />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <ProductDetailCarousel
          header={'More from'}
          category={productData.category?.name}
          relatedProducts={relatedProducts}
          navigate={navigate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
