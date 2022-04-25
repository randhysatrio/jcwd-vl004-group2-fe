const TransactionDetail = ({ details }) => {
  return (
    <div className="modal" id="detail-modal">
      <div className="modal-box min-w-9/12 overflow-auto">
        <div className="modal-action">
          <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </a>
        </div>
        <h3 className="text-lg font-bold mb-3">Detail Items Transaction</h3>
        {console.log(details)}
        {details.map((item) => {
          return <div className=" flex flex-col gap-1 ">{item.id}</div>;
        })}
      </div>
    </div>
  );
};

export default TransactionDetail;
