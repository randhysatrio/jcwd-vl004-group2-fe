import { API_URL } from "../assets/constants";

const ProductTable = ({ product, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="text-sm border-b border-gray-200">
      <td className="justify-center items-center text-center p-4">
        {product.id}
      </td>
      <td className="justify-center items-center text-center p-4">
        <img
          src={`${API_URL}/${product.image}`}
          className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
        />
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.name}
      </td>
      <td className="justify-center items-center text-center p-4">
        Rp. {product.price_buy?.toLocaleString("id")}
      </td>
      <td className="justify-center items-center text-center p-4">
        Rp. {product?.price_sell.toLocaleString("id")}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.stock?.toLocaleString("id")}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.unit}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.volume?.toLocaleString("id")}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.stock_in_unit?.toLocaleString("id")}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.appearance}
      </td>
      <td className="justify-center items-center text-center p-4">
        {product.category?.name}
      </td>
      <td className="justify-center items-center text-center p-4">
        <button
          type="button"
          className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3"
          onClick={() => handleEditClick(product.id)}
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
