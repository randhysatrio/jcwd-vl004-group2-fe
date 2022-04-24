import { FaSearch, FaBell, FaUserAlt, FaHome, FaBars, FaShoppingBag, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../assets/constants';

const EditProduct = () => {
  const Swal = require('sweetalert2');
  // useState([]) is different from useState({})
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImage] = useState(null);
  const [category, setCategory] = useState();

  const id = window.location.search.substring(1);

  const fetchProductsId = async () => {
    const res = await axios.get(`${API_URL}/product/find/${id}`);
    setImage(res.data.image);
    setProducts(res.data);
    setCategory(res.data.categoryId);
  };

  console.log(products.categoryId);
  console.log(category);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/category/all`);
    setCategories(res.data);
  };

  const fetchImagePreview = async () => {
    console.log(images);
    let preview = document.getElementById('imgpreview');
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
      categoryId: parseInt(categoryId.current.value),
    };
    formData.append('productData', JSON.stringify(newProduct));
    formData.append('image', images);
    console.log(newProduct);

    try {
      await axios.patch(`${API_URL}/product/edit/${id}`, formData);
      navigate('/dashboard');
      Swal.fire({
        icon: 'success',
        // title: "Oops...",
        text: 'Product has been edited!',
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
      <h1 className="text-3xl text-gray-700 font-bold py-3">Edit Product</h1>
      <div>
        {/* <form> */}
        <div className="grid grid-cols-6 gap-4 justify-items-star">
          <div>
            <label className="mr-3">Name:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <textarea type="text" name="name" className="h-32 w-5/6" required defaultValue={products.name} ref={name} />
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
            <input type="file" name="image" required onChange={onBtAddFile} accept="image/*" defaultValue={products.image} />
          </div>
          <div className="col-start-2">
            <img id="imgpreview" />
          </div>
          <div className="col-start-1">
            <label className="mr-3">Price Buy:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <input type="number" name="price_buy" className="" required defaultValue={products.price_buy} ref={price_buy} />
          </div>
          <div className="col-start-1">
            <label className="">Price Sell:</label>
          </div>
          <div className="col-start-2 col-span-3">
            <input type="number" name="price_sell" className="" required defaultValue={products.price_sell} ref={price_sell} />
          </div>
          <div className="col-start-1">
            <label className="">Unit:</label>
          </div>
          <div>
            <input type="text" name="unit" className="" required defaultValue={products.unit} ref={unit} />
          </div>
          <div className="col-start-1">
            <label className="">Volume:</label>
          </div>
          <div>
            <input type="number" name="volume" className="" required defaultValue={products.volume} ref={volume} />
          </div>
          <div className="col-start-1">
            <label className="">Stock:</label>
          </div>
          <div>
            <input type="number" name="stock" className="" required defaultValue={products.stock} ref={stock} />
          </div>
          <div className="col-start-1">
            <label className="">Appearance:</label>
          </div>
          <div>
            <input type="text" name="appearance" className="" required defaultValue={products.appearance} ref={appearance} />
          </div>
          <div className="col-start-1">
            <label className="">Category:</label>
          </div>
          {/* <DropdownCategories /> */}
          <select   name="categoryId"
              ref={categoryId}
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
            {/* <option value="">Choose a category</option> */}
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
  );
};

export default EditProduct;
