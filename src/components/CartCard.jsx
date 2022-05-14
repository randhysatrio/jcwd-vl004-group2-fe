import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { debounce } from 'throttle-debounce';
import { API_URL } from '../assets/constants';

function CartCard({ item, setCart, page, handCheck, isLoading, setIsLoading }) {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');
  const [quantity, setQuantity] = useState(item.quantity);

  const changeQty = useCallback(
    debounce(1000, async (quantity) => {
      try {
        setIsLoading(true);

        // check is number? / quantity < 1
        if (isNaN(quantity)) {
          setQuantity(item.product.volume);
          setIsLoading(false);
          return;
        }

        // Compare quantity with stock
        if (item.product.stock_in_unit < quantity) {
          setQuantity(item.product.stock_in_unit);
          setIsLoading(false);
          return;
        } else if (quantity < 1) {
          setQuantity(1);
          setIsLoading(false);
          return;
        }

        // Update quantity cart
        const response = await axios.patch(
          `${API_URL}/cart/update`,
          {
            id: item.id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: {
              page,
            },
          }
        );

        // Get new cart data
        setCart(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    }),
    []
  );

  useEffect(() => {
    changeQty(quantity);
  }, [quantity]);

  const deleteItem = async () => {
    try {
      setIsLoading(true);
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${API_URL}/cart/delete/${item.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            page,
          },
        });

        setCart(response.data);
        dispatch({
          type: 'CART_TOTAL',
          payload: response.data.cartTotal,
        });
        setIsLoading(false);
        Swal.fire(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const toIDR = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="grid grid-cols-12 grid-flow-col border-gray-300 border rounded-md py-2 px-3">
      <div className="col-span-7">
        <input id={`checked-${item.id}`} type="checkbox" onChange={handCheck} checked={item.isChecked} className="checkbox" />
        <div className="flex p-1">
          <img src={`${API_URL}/${item.product.image}`} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-red-400 font-bold">{toIDR(item.product.price_sell)}</span>
              <span> / {item.product.unit}</span>
            </div>
            <div>
              <span>appearence : </span>
              <span className="text-gray-500">{item.product.appearance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center">
        <span className="italic pb-3 text-sm">unit : {item.product.unit}</span>
        <div className="flex justify-center items-center">
          <button
            className={`border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100 ${
              item.quantity <= 1 ? 'hover:cursor-not-allowed' : null
            }`}
            onClick={() => setQuantity(item.quantity - item.product.volume)}
            disabled={item.quantity <= 1 || isLoading}
          >
            <FiMinus />
          </button>
          <input
            id={`qty-${item.id}`}
            value={quantity}
            type="text"
            className="w-20 h-10 m-0 focus:outline-none border-y border-primary text-center"
            onChange={(e) => (!e.target.value ? setQuantity(null) : setQuantity(parseInt(e.target.value)))}
            disabled={isLoading}
          />
          <button
            className={`border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100 ${
              item.quantity === item.product.stock_in_unit ? 'hover:cursor-not-allowed' : null
            }`}
            onClick={() => setQuantity(item.quantity === 1 ? item.product.volume : item.quantity + item.product.volume)}
            disabled={item.quantity === item.product.stock_in_unit || isLoading}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="col-span-2 flex justify-around items-center">
        <div className="flex flex-col justify-center flex-wrap items-center">
          <span>Total Price</span>
          <span className="text-red-400 font-bold text-lg">{toIDR(item.quantity * item.product.price_sell)}</span>
        </div>
        <FiTrash2 size={24} className="hover:cursor-pointer" onClick={deleteItem} disabled={isLoading} />
      </div>
    </div>
  );
}

export default CartCard;
