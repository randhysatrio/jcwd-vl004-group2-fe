const toIDR = (number) => {
  return number.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
};

function CheckoutCard({ item }) {
  return (
    <div className="grid grid-cols-12 grid-flow-col p-3 items-center border-b border-b-gray-300 my-1">
      <div className="col-span-9">
        <div className="flex">
          <img src={item.product.image} className="h-36" alt="cart product" />
          <div className="flex flex-col justify-center pl-4">
            <span className="font-bold text-lg pb-2">{item.product.name}</span>
            <div>
              <span>price : </span>
              <span className="text-sky-400 font-bold">{item.product.price_sell.toLocaleString('id')}</span>
            </div>
            <div>
              <span>appearance : </span>
              <span className="text-gray-500">{item.product.appearance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-4 items-center">
        <div>
          <span className="font-bold text-lg">Total : </span>
          <span className="text-sky-400 font-bold text-lg">Rp. {item.subtotal.toLocaleString('id')}</span>
        </div>
        <div>
          <span>Qty : </span>
          <span className="text-gray-500">
            {item.quantity.toLocaleString('id')} {item.product.unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
