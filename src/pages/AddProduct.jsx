import {
  FaSearch,
  FaBell,
  FaUserAlt,
  FaHome,
  FaBars,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../assets/constants";

const AddProduct = () => {
  // useState([]) is different from useState({})
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // upload image use string or null
  const [images, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const fetchCategories = async () => {
    const res = await axios.get(`http://localhost:5000/category/all`);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);

  const categoryId = useRef();
  const image = useRef();

  const [addFormData, setAddFormData] = useState({
    name: "",
    price_buy: "",
    price_sell: "",
    stock: "",
    unit: "",
    volume: "",
    description: "",
    // image: "",
    appearance: "",
    // categoryId: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    const formData = new FormData();
    const newProduct = {
      name: addFormData.name,
      price_buy: addFormData.price_buy,
      price_sell: addFormData.price_sell,
      stock: addFormData.stock,
      unit: addFormData.unit,
      volume: addFormData.volume,
      description: addFormData.description,
      appearance: addFormData.appearance,
      categoryId: parseInt(categoryId.current.value),
    };
    formData.append("productData", JSON.stringify(newProduct));
    formData.append("image", images);
    console.log(newProduct);
    try {
      await axios.post(`${API_URL}/product/add`, formData);
      navigate("/dashboard/product");
      Swal.fire({
        icon: "success",
        // title: "Oops...",
        text: "Product has been added!",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        text: error,
      });
    }
  };

  const onBtAddFile = (e) => {
    setImage(e.target.files[0]);
    let preview = document.getElementById("imgpreview");
    preview.src = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <h1 className="text-3xl text-gray-700 font-bold py-3">Add a Product</h1>
      <div>
        <div className="grid grid-cols-6 gap-4 justify-items-star">
          <div>
            {/* form always submit */}
            <label className="mr-3">Name:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <textarea
              type="text"
              name="name"
              className="h-32 w-5/6"
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Description:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <textarea
              type="text"
              name="description"
              className="h-32 w-5/6"
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Image:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <input
              type="file"
              name="image"
              required
              onChange={onBtAddFile}
              accept="image/*"
            />
          </div>
          <div className="col-start-2">
            <img id="imgpreview" />
          </div>
          <div className="col-start-1">
            <label className="mr-3">Price Buy:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <input
              type="number"
              name="price_buy"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Price Sell:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <input
              type="number"
              name="price_sell"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Unit:</label>
          </div>
          <div>
            <input
              type="text"
              name="unit"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Volume:</label>
          </div>
          <div>
            <input
              type="number"
              name="volume"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Stock:</label>
          </div>
          <div>
            <input
              type="number"
              name="stock"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Appearance:</label>
          </div>
          <div>
            <input
              type="text"
              name="appearance"
              className=""
              required
              onChange={handleAddFormChange}
            />
          </div>
          <div className="col-start-1">
            <label className="">Category:</label>
          </div>
          {/* <DropdownCategories /> */}
          <select name="categoryId" id="">
            <option value="">Choose a category</option>
            {categories.map((item, index) => (
              <option ref={categoryId} value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <button
            className="mt-8 py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3"
            onClick={handleAddFormSubmit}
          >
            Add Product
          </button>
          <button
            className="mt-8 py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 transition rounded-xl items-center"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
