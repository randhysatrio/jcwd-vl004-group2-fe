import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/constants';
import { debounce } from 'throttle-debounce';

function CartCard({ item, setCartItems, userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const debounceQty = useCallback(
    debounce(1500, async (quantity) => {
      await axios.patch(`${API_URL}/cart/quantity/${item.id}`, {
        quantity,
      });
    }),
    []
  );

  useEffect(() => {
    if (!quantity || quantity > item.product.stock_in_unit) {
      return;
    } else {
      debounceQty(quantity);
    }
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
        const response = await axios.post(`${API_URL}/cart/destroy/${item.id}`, {
          userId,
        });

        setCartItems(response.data);
        setIsLoading(false);
        Swal.fire('Cart deleted successfully!');
      } else {
        return;
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const checkedHandler = async (e) => {
    try {
      let response;

      if (e.target.checked) {
        response = await axios.patch(`${API_URL}/cart/checked-one/${item.id}`, { isChecked: true, userId });
      } else {
        response = await axios.patch(`${API_URL}/cart/checked-one/${item.id}`, { isChecked: false, userId });
      }

      setCartItems(response.data);
    } catch (error) {
      toast.error('Unable to checked this Cart Item');
    }
  };

  return (
    <div className="grid grid-cols-12 grid-flow-col border-gray-300 border rounded-md py-2 px-3">
      <div className="col-span-7">
        <input id={`checked-${item.id}`} type="checkbox" onChange={checkedHandler} checked={item.isChecked} className="checkbox" />
        <div className="flex p-1">
          <img src={item.product.image} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-red-400 font-bold">{item.product?.price_sell.toLocaleString('id')}</span>
            </div>
            <div>
              <span>appearance : </span>
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
              item.quantity <= item.product.volume ? 'hover:cursor-not-allowed' : null
            }`}
            onClick={() => {
              setQuantity(quantity - item.product.volume);
            }}
            disabled={quantity <= item.product.volume || isLoading}
          >
            <FiMinus />
          </button>
          <input
            id={`qty-${item.id}`}
            value={quantity}
            type="number"
            className="w-20 h-10 m-0 focus:outline-none border-y border-primary text-center"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            disabled={isLoading}
          />
          <button
            className="border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100"
            onClick={() => setQuantity(quantity + item.product.volume)}
            disabled={quantity === item.product.stock_in_unit || quantity + item.product.volume > item.product.stock_in_unit || isLoading}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="col-span-2 flex justify-around items-center">
        <div className="flex flex-col justify-center flex-wrap items-center">
          <span>Total Price</span>
          <span className="text-red-400 font-bold text-lg">{item.subtotal?.toLocaleString('id')}</span>
        </div>
        <FiTrash2 size={24} className="hover:cursor-pointer" onClick={deleteItem} disabled={isLoading} />
      </div>
    </div>
  );
}

export default CartCard;
