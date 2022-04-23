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

const EditProduct = () => {
  const Swal = require("sweetalert2");
  // useState([]) is different from useState({})
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImage] = useState(null);

  const id = window.location.search.substring(1);

  const fetchProductsId = async () => {
    const res = await axios.get(`${API_URL}/product/find/${id}`);
    setImage(res.data.image);
    setProducts(res.data);
  };

  console.log(products);
  console.log(images);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/category/all`);
    setCategories(res.data);
  };

  const fetchImagePreview = async () => {
    // const res = await axios.get(`${API_URL}/product/find/${id}`);
    // setImage(res.data.image);
    console.log(images);
    let preview = document.getElementById("imgpreview");
    preview.src = `${API_URL}/${images}`;
  };

  // useEffect with empty dependencies
  useEffect(() => {
    fetchImagePreview();
    fetchProductsId();
    fetchCategories();
 
  }, []);

  const navigate = useNavigate();

  const name = useRef();
  const price_buy = useRef();
  const price_sell = useRef();
  const stock = useRef();
  const unit = useRef();
  const volume = useRef();
  const description = useRef();
  const appearance = useRef();
  const categoryId = useRef();

  const handleEditFormSubmit = async (event) => {
    const formData = new FormData();
    const newProduct = {
      name: name.current.value,
      price_buy: price_buy.current.value,
      price_sell: price_sell.current.value,
      stock: stock.current.value,
      unit: unit.current.value,
      volume: volume.current.value,
      description: description.current.value,
      appearance: appearance.current.value,
      categoryId: categoryId.current.value,
    };
    formData.append("productData", JSON.stringify(newProduct));
    formData.append("image", images);
    console.log(newProduct);
    try {
      await axios.patch(`${API_URL}/product/edit/${id}`, formData);
      navigate("/dashboard");
      Swal.fire({
        icon: "success",
        // title: "Oops...",
        text: "Product has been edited!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onBtAddFile = (e) => {
    setImage(e.target.files[0]);
    let preview = document.getElementById("imgpreview");
    preview.src = URL.createObjectURL(e.target.files[0]);
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
        <h1 className="text-3xl text-gray-700 font-bold mb-3">Edit Product</h1>
        <div>
          {/* <form> */}
            <div className="grid grid-cols-6 gap-4 justify-items-star">
              <div>
                <label className="mr-3">Name:</label>
              </div>
              <div className="col-start-2 col-span-3">
                <textarea
                  type="text"
                  name="name"
                  className="h-32 w-5/6"
                  required
                  defaultValue={products.name}
                  ref={name}
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
                  defaultValue={products.description}
                  ref={description}
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
                  defaultValue={products.image}
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
                  defaultValue={products.price_buy}
                  ref={price_buy}
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
                  defaultValue={products.price_sell}
                  ref={price_sell}
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
                  defaultValue={products.unit}
                  ref={unit}
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
                  defaultValue={products.volume}
                  ref={volume}
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
                  defaultValue={products.stock}
                  ref={stock}
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
                  defaultValue={products.appearance}
                  ref={appearance}
                />
              </div>
              <div className="col-start-1">
                <label className="">Category:</label>
              </div>
              {/* <DropdownCategories /> */}
              <select name="categoryId" id="">
                <option value="">Choose a category</option>
                {categories.map((item, index) => (
                  <option ref={categoryId} value={item.id} key={item?.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <button
                className="mt-8 py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3"
                onClick={handleEditFormSubmit}
              >
                Edit Product
              </button>
              <button className="mt-8 py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 transition rounded-xl items-center">
                <a href="http://localhost:3000/dashboard/product">Cancel</a>
                {/*<Link> React-Router-dom APIURL + dashboard */}
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
