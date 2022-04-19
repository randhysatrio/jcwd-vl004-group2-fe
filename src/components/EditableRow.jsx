const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="text-sm text-gray-700">{editFormData.id}</td>
      <td>
        <input
          type="text"
          required
          name="name"
          defaultValue={editFormData.name}
          onChange={handleEditFormChange}
          className="text-sm text-gray-700"
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="number"
          name="price_buy"
          defaultValue={editFormData.price_buy}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="number"
          name="price_sell"
          defaultValue={editFormData.price_sell}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="number"
          name="stock"
          defaultValue={editFormData.stock}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="text"
          name="unit"
          defaultValue={editFormData.unit}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="number"
          name="volume"
          defaultValue={editFormData.volume}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">{editFormData.stock_in_unit}</td>
      <td className="text-sm text-gray-700">{editFormData.stock_in_unit}</td>
      <td className="text-sm text-gray-700">
        <input
          type="text"
          name="description"
          defaultValue={editFormData.description}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="text"
          name="unit"
          defaultValue={editFormData.image}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="text"
          name="appearance"
          defaultValue={editFormData.appearance}
          onChange={handleEditFormChange}
          required
        />
      </td>
      <td className="text-sm text-gray-700">
        <input
          type="number"
          name="categoryId"
          defaultValue={editFormData.categoryId}
          onChange={handleEditFormChange}
          required
        />
      </td>

      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
