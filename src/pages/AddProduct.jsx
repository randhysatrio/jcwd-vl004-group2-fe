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
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

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
      categoryId: categoryId.current.value,
    };
    formData.append("productData", JSON.stringify(newProduct));
    formData.append("image", images);
    console.log(newProduct);
    try {
      await axios.post("http://localhost:5000/product/add", formData);
      console.log("test");
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
    // let preview = document.getElementById("imgpreview");
    // preview.src = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed w-full top-0 left-0 flex items-center">
        <div className="relative">
          <FaSearch className="absolute left-2 top-3 w-6 text-gray-400" />
          <input
            type="text"
            className="block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-2"
          />
        </div>

        <div className="ml-auto flex items-center">
          <div>
            <FaBell className="w-6 cursor-pointer hover:text-primary" />
          </div>

          <div className="ml-4 relative">
            <div className="cursor-pointer">
              <div>
                <FaUserAlt
                  id="dropdown"
                  className="h-4 w-4 object-cover hover:text-primary"
                />
              </div>

              <div
                id="dropdown_content"
                className="hidden absolute z-50 mt-2 rounded-md shadow-lg w-48 right-0 py-1 bg-white"
              >
                <div className="px-4 py-2 text-xs text-gray-400">
                  Manage Account
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
                >
                  Profile
                </a>
                <div className="border-t border-gray-100"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-0 w-40 h-full bg-gray-800 shadow-md z-10">
        <div className="text-white font-bold text-base p-5 bg-gray-900">
          Heisen Berg Co.
        </div>
        <div className="py-5">
          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaHome className="w-5 mr-3" />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaShoppingBag className="w-5 mr-3" />
            Category
          </a>

          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaHome className="w-5 mr-3" />
            Product
          </a>

          <a
            href="#"
            className="flex items-center my-1 px-4 py-3 text-white border-1-4 border-transparent hover:bg-primary transition"
          >
            <FaUserAlt className="w-5 mr-3" />
            User
          </a>
        </div>
      </div>

      <div className="pt-24 pr-8 pl-48">
        <h1 className="text-3xl text-gray-700 font-bold mb-3">Add a Product</h1>
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
              <label className="">Image (URL):</label>
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
              {images ? (
                <img src={URL.createObjectURL(images)} id="imgpreview" />
              ) : null}
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
            <button className="mt-8 py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 transition rounded-xl items-center">
              <a href="http://localhost:3000/dashboard">Cancel</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
