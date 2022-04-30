import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/constants';
import { debounce } from 'throttle-debounce';

function CartCard({ item, setCartItems, setCheckoutItems, setConflictChecked, setConflictUnchecked }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [error, setError] = useState('');

  const debouncedQty = useCallback(
    debounce(1250, async (quantity) => {
      if (!quantity) {
        return;
      } else if (quantity > item.product.stock_in_unit) {
        return;
      } else {
        const response = await axios.patch(`${API_URL}/cart/quantity/${item.id}`, {
          quantity,
          userId: item.userId,
        });

        setCartItems(response.data.cartItems);
        setCheckoutItems(response.data.checkoutItems);
      }
    }),
    []
  );

  useEffect(() => {
    debouncedQty(quantity);
  }, [quantity]);

  useEffect(() => {
    if (!quantity && !item.product.deletedAt) {
      setError('Please enter a valid amount');
      if (item.isChecked) {
        setConflictChecked(true);
      } else {
        setConflictUnchecked(true);
      }
    } else if (quantity > item.product.stock_in_unit && !item.product.deletedAt) {
      setError('Quantity cannot exceed stock');
      if (item.isChecked) {
        setConflictChecked(true);
      } else {
        setConflictUnchecked(true);
      }
    } else {
      setError('');
      if (item.isChecked) {
        setConflictChecked(false);
      } else {
        setConflictUnchecked(false);
      }
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
          userId: item.userId,
        });

        setCartItems(response.data.cartItems);
        setCheckoutItems(response.data.checkoutItems);

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
      const response = await axios.patch(`${API_URL}/cart/checked-one/${item.id}`, { isChecked: e.target.checked, userId: item.userId });

      setCartItems(response.data.cartItems);
      setCheckoutItems(response.data.checkoutItems);
    } catch (error) {
      toast.error('Unable to checked this Cart Item');
    }
  };

  return (
    <div className="grid grid-cols-12 grid-flow-col border-gray-300 border rounded-md py-2 px-3">
      <div className="col-span-7">
        <div className="flex items-center py-2 gap-2">
          <input
            disabled={quantity > item.product.stock_in_unit || !quantity || item.product.deletedAt}
            type="checkbox"
            onChange={checkedHandler}
            checked={item.isChecked}
            className="checkbox"
          />
          {item.quantity > item.product.stock_in_unit || item.product.deletedAt ? (
            <span className="text-md font-semibold text-red-300">
              {item.product.deletedAt
                ? 'This item is not available anymore. Please remove item from cart'
                : item.quantity > item.product.stock_in_unit
                ? 'This cart item is unprocessable. Please adjust this cart item quantity'
                : null}
            </span>
          ) : null}
        </div>
        <div className="flex p-1">
          <img src={item.product.image} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-red-400 font-bold">{item.product.price_sell.toLocaleString('id')}</span>
            </div>
            <div>
              <span>appearance : </span>
              <span className="text-gray-500">{item.product.appearance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col pt-11 items-center">
        <span className="italic pb-3 text-sm">unit : {item.product.unit}</span>
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <button
              className={`border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100 
               disabled:hover:cursor-not-allowed disabled:bg-gray-100`}
              onClick={() => {
                setQuantity(quantity - item.product.volume);
              }}
              disabled={quantity <= item.product.volume || isLoading || item.product.deletedAt}
            >
              <FiMinus />
            </button>
            <input
              id={`qty-${item.id}`}
              value={quantity}
              type="number"
              className="w-20 h-10 m-0 focus:outline-none border-y border-primary text-center disabled:bg-gray-100"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              disabled={isLoading || item.product.deletedAt}
              min={0}
            />
            <button
              className="border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100 disabled:hover:cursor-not-allowed disabled:bg-gray-100"
              onClick={() => setQuantity(quantity + item.product.volume)}
              disabled={
                quantity === item.product.stock_in_unit ||
                quantity + item.product.volume > item.product.stock_in_unit ||
                isLoading ||
                item.product.deletedAt
              }
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <div className="flex justify-center">{error && <span className="text-sm font-semibold text-rose-300 py-1">{error}</span>}</div>
        <div className="flex justify-center gap-2 py-2">
          <span className="font-bold">Available:</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{item.product.stock.toLocaleString('id')}</span>
            <span>{item.product.unit === 'g' ? 'pack' : 'bottle'}</span>
          </div>
          <span>/</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{item.product?.stock_in_unit.toLocaleString('id')}</span>
            <span>{item.product.unit}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-around items-center">
        <div className="flex flex-col justify-center flex-wrap items-center">
          <span>Total Price</span>
          <span className="text-red-400 font-bold text-lg">
            {quantity * item.product.price_sell ? (quantity * item.product.price_sell).toLocaleString('id') : 0}
          </span>
        </div>
        <FiTrash2 size={24} className="hover:cursor-pointer" onClick={deleteItem} disabled={isLoading} />
      </div>
    </div>
  );
}

export default CartCard;
