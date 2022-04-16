import "../assets/styles/editableRow.css";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="text-sm font-semibold text-left">{editFormData.id}</td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="text"
          name="unit"
          value={editFormData.image}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="text"
          required
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="number"
          name="price_buy"
          value={editFormData.price_buy}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="number"
          name="price_sell"
          value={editFormData.price_sell}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="number"
          name="stock"
          value={editFormData.stock}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="text"
          name="unit"
          value={editFormData.unit}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="number"
          name="volume"
          value={editFormData.volume}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        {editFormData.stock_in_unit}
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="text"
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="text"
          name="appearance"
          value={editFormData.appearance}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm font-semibold text-left">
        <textarea
          type="number"
          name="categoryId"
          value={editFormData.categoryId}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="flex text-center py-8">
        <button
          className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center"
          type="submit"
        >
          Save
        </button>
        <button
          className="py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 transition rounded-xl items-center"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
