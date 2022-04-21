const ProductTable = ({ product, handleEditClick, handleDeleteClick }) => {
  console.log(product);
  return (
    <tr>
      <td className="font-medium text-center py-8">{product.id}</td>
      <td className="font-medium text-center py-8">
        <img
          src={"http://localhost:5000/" + product.image}
          className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
        />
      </td>
      <td className="font-medium text-center py-8">{product.name}</td>
      <td className="font-medium text-center py-8">{product.price_buy}</td>
      <td className="font-medium text-center py-8">
        Rp {product?.price_sell.toLocaleString("id")}
      </td>
      <td className="font-medium text-center py-8">{product.stock}</td>
      <td className="font-medium text-center py-8">{product.unit}</td>
      <td className="font-medium text-center py-8">{product.volume}</td>
      <td className="font-medium text-center py-8">{product.stock_in_unit}</td>
      <td className="font-medium text-center py-8">{product.appearance}</td>
      <td className="font-medium text-center py-8">{product.category?.name}</td>
      <td className="flex justify-center items-center text-center py-16">
        <button
          type="button"
          className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3"
          onClick={(event) => handleEditClick(event, product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 rounded-xl items-center"
          onClick={() => handleDeleteClick(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTable;
