import { API_URL } from '../assets/constants';

const ProductTable = ({ product, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="font-medium text-center py-8">{product.id}</td>
      <td className="font-medium text-center py-8">
        <img src={`${API_URL}/${product.image}`} className="h-24 aspect-[3/2] rounded-lg object-cover border border-gray-200" />
      </td>
      <td className="font-medium text-center py-8 px-1">{product.name}</td>
      <td className="font-medium text-center py-8">Rp. {product.price_buy?.toLocaleString('id')}</td>
      <td className="font-medium text-center py-8">Rp {product.price_sell?.toLocaleString('id')}</td>
      <td className="font-medium text-center py-8">{product.stock?.toLocaleString('id')}</td>
      <td className="font-medium text-center py-8">{product.unit}</td>
      <td className="font-medium text-center py-8">{product.volume?.toLocaleString('id')}</td>
      <td className="font-medium text-center py-8">
        {product.stock_in_unit?.toLocaleString('id')} {product.unit}
      </td>
      <td className="font-medium text-center py-8">{product.appearance}</td>
      <td className="font-medium text-center py-8">{product.category?.name}</td>
      <td className="flex justify-center items-center text-center py-16">
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
