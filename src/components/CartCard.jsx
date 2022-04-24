import axios from 'axios';
import { useState } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { API_URL } from '../assets/constants';

function CartCard({ item, onClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  const cartGlobal = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken');

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
        const response = await axios.delete(
          `${API_URL}/cart/delete/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const cartData = await axios.get(
          `${API_URL}/cart/get/${userGlobal.id}?page=${cartGlobal.active_page}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        dispatch({ type: 'CART_LIST', payload: cartData.data });
        setIsLoading(false);
        Swal.fire(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const changeQty = async (type, custQty) => {
    try {
      setIsLoading(true);
      // set quantity
      let quantity;
      if (type === 'plus') {
        quantity = item.quantity + item.product.volume;
      } else if (type === 'min') {
        quantity = item.quantity - item.product.volume;
      } else if (type === 'custom') {
        quantity = parseInt(custQty);
      }

      // check is number?
      if (isNaN(quantity)) {
        document.getElementById(`qty-${item.id}`).value = item.product.volume;
        return toast.error('please input number');
      }

      // Compare quantity with stock
      if (item.product.stock_in_unit < quantity) {
        document.getElementById(`qty-${item.id}`).value =
          item.product.stock_in_unit;
        return toast.error(
          `Stock not enought, we just have ${item.product.stock_in_unit} ${item.product.unit}`
        );
      } else if (quantity < item.product.volume) {
        toast.error(`Quantity can not less than ${item.product.volume}`);
        quantity = item.product.volume;
      }

      // Update quantity cart
      await axios.patch(
        `${API_URL}/cart/update`,
        {
          id: item.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Get new cart data
      const cartData = await axios.get(
        `${API_URL}/cart/get/${userGlobal.id}?page=${cartGlobal.active_page}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch({ type: 'CART_LIST', payload: cartData.data });
      setIsLoading(false);
      document.getElementById(`qty-${item.id}`).value = quantity;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handCheck = async (item) => {
    try {
      setIsLoading(true);
      const { id, isChecked } = item;

      await axios.patch(
        `${API_URL}/cart/checked`,
        {
          id,
          isChecked: !isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const cartData = await axios.get(
        `${API_URL}/cart/get/${userGlobal.id}?page=${cartGlobal.active_page}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({ type: 'CART_LIST', payload: cartData.data });
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
        <input
          id={`checked-${item.id}`}
          type="checkbox"
          onChange={() => handCheck(item)}
          checked={item.isChecked}
          className="checkbox"
        />
        <div className="flex p-1">
          <img src={item.product.image} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-red-400 font-bold">
                {toIDR(item.product.price_sell)}
              </span>
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
              item.quantity <= item.product.volume
                ? 'hover:cursor-not-allowed'
                : null
            }`}
            onClick={() => changeQty('min')}
            disabled={item.quantity <= item.product.volume || isLoading}
          >
            <FiMinus />
          </button>
          <input
            id={`qty-${item.id}`}
            defaultValue={item.quantity}
            type="text"
            className="w-20 h-10 m-0 focus:outline-none border-y border-primary text-center"
            onChange={(e) =>
              setTimeout(() => changeQty('custom', e.target.value), 2000)
            }
            disabled={isLoading}
          />
          <button
            className="border border-primary w-10 h-10 flex justify-center items-center text-primary bg-sky-50 hover:bg-sky-100"
            onClick={() => changeQty('plus')}
            disabled={isLoading}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="col-span-2 flex justify-around items-center">
        <div className="flex flex-col justify-center flex-wrap items-center">
          <span>Total Price</span>
          <span className="text-red-400 font-bold text-lg">
            {toIDR(item.quantity * item.product.price_sell)}
          </span>
        </div>
        <FiTrash2
          size={24}
          className="hover:cursor-pointer"
          onClick={deleteItem}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default CartCard;
