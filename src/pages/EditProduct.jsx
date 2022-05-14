import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../assets/constants';

const EditProduct = () => {
  const Swal = require('sweetalert2');
  // useState([]) is different from useState({}) findAll is array findbyPK is an object
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [images, setImage] = useState(null);
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [submitted, setSubmit] = useState(false);
  const [newName, setNewName] = useState("");
  const [priceBuy, setPriceBuy] = useState("");
  const [priceSell, setPriceSell] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newVolume, setNewVolume] = useState("");
  const [stockInUnit, setStockInUnit] = useState("");
  const [newAppearance, setAppearance] = useState("");

  const { id } = useParams();

  const fetchProductsId = async () => {
    const res = await axios.post(`${API_URL}/product/find/${id}`);
    setImage(res.data.product.image);
    setProducts(res.data.product);
    setCategory(res.data.product.categoryId);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/category/all`);
    setCategories(res.data);
  };

  const fetchImagePreview = async () => {
    let preview = document.getElementById('imgpreview');
    preview.src = `${API_URL}/${images}`;
  };

  // useEffect with empty dependencies
  useEffect(() => {
    fetchImagePreview();
    fetchProductsId();
    fetchCategories();
  }, []);

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
    event.preventDefault();
    const formData = new FormData();
    const newProduct = {
      name: name.current.value,
      price_buy: parseInt(price_buy.current.value),
      price_sell: parseInt(price_sell.current.value),
      stock: parseInt(stock.current.value),
      unit: unit.current.value,
      volume: volume.current.value,
      description: description.current.value,
      appearance: appearance.current.value,
      categoryId: parseInt(categoryId.current.value),
    };

    formData.append('productData', JSON.stringify(newProduct));

    if (images) {
      formData.append('image', images);
    }

    try {
      await axios.patch(`${API_URL}/product/edit/${id}`, formData);
      navigate('/dashboard/product');
      Swal.fire({
        icon: "success",
        text: "Product has been edited!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onBtAddFile = (e) => {
    setImage(e.target.files[0]);
    let preview = document.getElementById('imgpreview');
    preview.src = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between py-7 px-10">
        <h1 className="text-3xl text-gray-700 font-bold">Edit Product</h1>
      </div>
      <div className="bg-white shadow-sm p-8 px-10">
        <form onSubmit={handleEditFormSubmit}>
          <div className="grid grid-cols-6 gap-4 justify-items-star">
            <div>
              <label className="mr-3">Name:</label>
            </div>
            <div className="col-start-2 col-span-3">
              <textarea
                type="text"
                name="name"
                className="h-16 input input-bordered w-full max-w-xs pr-10 focus:outline-none focus:bg-white"
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
                className="h-32 w-5/6 input input-bordered max-w-xs pr-10 focus:outline-none focus:bg-white"
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
                // required
                onChange={onBtAddFile}
                accept="image/*"
              />
            </div>
            <div className="col-start-2">
              {/* profileImage ? URL.createObjectURL(profileImage) : ${API_URL}/${userData.profile_picture} */}
              <img id="imgpreview" src={`${API_URL}/${products.image}`} />
            </div>
            <div className="col-start-1">
              <label className="mr-3">Price Buy:</label>
            </div>
            <div className="col-start-2 col-span-3">
              <div className="flex">
                <span class="currencyinput">Rp</span>
                <input
                  type="number"
                  name="price_buy"
                  className="input input-bordered w-full h-8 max-w-xs pr-10 focus:outline-none focus:bg-white"
                  required
                  defaultValue={products.price_buy}
                  ref={price_buy}
                  onChange={(e) => setPriceBuy(e.target.value)}
                />
              </div>
            </div>
            <div className="col-start-1">
              <label className="">Price Sell:</label>
            </div>
            <div className="col-start-2 col-span-3">
              <div className="flex">
                <span class="currencyinput">Rp</span>
                <input
                  type="number"
                  name="price_sell"
                  className="input input-bordered w-full h-8 max-w-xs pr-10 focus:outline-none focus:bg-white"
                  required
                  defaultValue={products.price_sell}
                  ref={price_sell}
                />
              </div>
            </div>
            <div className="col-start-1">
              <label className="">Unit:</label>
            </div>
            <div className="flex justify-between">
              <div>
                <input
                  type="radio"
                  name="unit"
                  className="mr-3"
                  value="ml"
                  required
                  defaultValue={products.unit}
                  ref={unit}
                />
                <label required for="ml">
                  ml
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="unit"
                  id="g"
                  className="mr-3"
                  value="g"
                  required
                  defaultValue={products.unit}
                  ref={unit}
                />
                <label required for="unit">
                  g
                </label>
              </div>
            </div>
            <div className="col-start-1">
              <label className="">Volume:</label>
            </div>
            <div>
              <input
                type="number"
                name="volume"
                className="input input-bordered w-full h-8 max-w-xs pr-10 focus:outline-none focus:bg-white"
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
                className="input input-bordered w-full h-8 max-w-xs pr-10 focus:outline-none focus:bg-white"
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
                className="input input-bordered w-full h-8 max-w-xs pr-10 focus:outline-none focus:bg-white"
                required
                defaultValue={products.appearance}
                ref={appearance}
              />
            </div>
            <div className="col-start-1">
              <label className="">Category:</label>
            </div>
            {/* <DropdownCategories /> */}
            <select
              name="categoryId"
              required
              defaultChecked={products.categoryId}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>
              {categories.map((item, index) => (
                <option ref={categoryId} value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <button className="mt-8 py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center mr-3">
              Edit Product
            </button>
            <div
              className="mt-8 py-2.5 px-6 text-white bg-red-500 hover:bg-red-400 transition rounded-xl items-center"
              onClick={() => navigate(-1)}
            >
              {/* <a href="http://localhost:3000/dashboard/product">Cancel</a> */}
              Cancel
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
