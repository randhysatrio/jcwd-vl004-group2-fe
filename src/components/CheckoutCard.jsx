import { API_URL } from '../assets/constants';

const CheckoutCard = ({ item }) => {
  const toIDR = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="grid grid-cols-12 grid-flow-col items-center border-b border-b-gray-300 mb-2">
      <div className="col-span-10">
        <div className="flex">
          <img src={`${API_URL}/${item.product.image}`} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-red-400 font-bold">{toIDR(item.product.price_sell)}</span>
            </div>
            <div>
              <span>appearence : </span>
              <span className="text-gray-500">{item.product.appearance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4 items-center">
        <div>
          <span className="font-bold text-lg">Total : </span>
          <span className="text-red-400 font-bold text-lg">{toIDR(item.price)}</span>
        </div>
        <div>
          <span>Qty : </span>
          <span className="text-gray-500">
            {item.quantity} {item.product.unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
