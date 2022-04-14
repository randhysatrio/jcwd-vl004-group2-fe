import { useRef } from "react";

const EditableRow = () => {
  const name = useRef();
  const price_buy = useRef();
  const price_sell = useRef();
  const stock = useRef();
  const unit = useRef();
  return (
    <tr>
      <td>
        <input type="text" ref={name} className="ml-8" required />
      </td>
      <td>
        <input type="number" ref={price_buy} className="ml-8" required />
      </td>
      <td>
        <input type="number" ref={price_sell} className="ml-8" required />
      </td>
      <td>
        <input type="number" ref={stock} className="ml-8" required />
      </td>
      <td>
        <input type="number" ref={unit} className="ml-8" required />
      </td>
    </tr>
  );
};

export default EditableRow;
