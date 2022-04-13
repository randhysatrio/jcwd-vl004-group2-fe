import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [delivery, setDelivery] = useState(4000);

  const getCart = async () => {
    const cartData = await axios.get('http://localhost:5000/cart');
    setCarts(cartData);
  };
  useEffect(() => {
    getCart();
  }, []);

  const rendCart = () => {
    return carts.map((item) => {
      return (
        <div className="grid grid-cols-12 grid-flow-col border-gray-300 border rounded-md py-2 px-3">
          <div className="col-span-8">
            <div className="flex p-1">
              <img
                src={item.product.image}
                className="h-36"
                alt="cart product"
              />
              <div className="flex flex-col justify-center pl-4">
                <span className="font-bold text-lg pb-2">
                  {item.product.name}
                </span>
                <div>
                  <span>price : </span>
                  <span className="text-red-400 font-bold">
                    {item.product.price}
                  </span>
                </div>
                <span>appearence : {item.product.appearence}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-center items-center">
            <span className="italic pb-3 text-sm">
              unit : {item.product.unit}
            </span>
            <div className="flex justify-center items-center">
              <button className="border w-10 h-10 hover:bg-sky-50 flex justify-center items-center">
                <FiMinus />
              </button>
              <input
                defaultValue={item.quantity}
                type="text"
                className="w-10 h-10 m-0 focus:outline-none border-y text-center"
              />
              <button className="border w-10 h-10 hover:bg-sky-50 flex justify-center items-center">
                <FiPlus />
              </button>
            </div>
          </div>
          <div className="col-span-2 flex justify-around items-center">
            <div className="flex flex-col justify-center flex-wrap items-center">
              <span>Total Price</span>
              <span className="text-red-400 font-bold text-lg">
                {item.quantity * item.product.price}
              </span>
            </div>
            <FiTrash2 size={24} className="hover:cursor-pointer" />
          </div>
        </div>
      );
    });
  };

  const rendSubtotal = () => {
    let subtotal = 0;
    carts.forEach((item) => {
      subtotal += item.product.price * item.quantity;
    });
    return subtotal;
  };

  //   const rendPagination = () => {
  //     for (let i = 0; i < carts.total_page; i++) {
  //       return (
  //         <>
  //           <button class="btn">{i}</button>
  //         </>
  //       );
  //     }
  //   };

  return (
    <div className="flex m-auto justify-center my-32 gap-8 w-11/12">
      <div className="w-9/12 flex flex-col gap-8">
        {/* List items */}
        {rendCart()}
      </div>
      <div className="w-1/5 flex flex-col justify-between border-gray-300 border rounded-md h-72 p-5">
        <h2 className="font-bold text-xl">ORDER SUMMARY</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{rendSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Deliery</span>
            <span>{delivery}</span>
          </div>
          <div className="border-gray-300 border-t"></div>
          <div className="flex justify-between">
            <span className="font-bold text-lg">TOTAL</span>
            <span className="font-bold text-lg">
              {rendSubtotal() + delivery}
            </span>
          </div>
        </div>
        <button className="btn btn-block btn-primary">
          PROCESS TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
