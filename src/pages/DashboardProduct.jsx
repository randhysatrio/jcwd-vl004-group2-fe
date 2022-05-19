import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import CategoryList from '../components/CategoryList';
import { API_URL } from '../assets/constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const [productNotFound, setProductNotFound] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSortPrice, setCurrentSortPrice] = useState('');
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(keyword, 1000);
  const debouncedCategory = useDebounce(currentCategory, 0);
  const debouncedSortPrice = useDebounce(currentSortPrice, 0);

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const fetchProducts = async () => {
    const productList = await axios.post(`${API_URL}/product/query`, {
      category: currentCategory,
      sort: currentSortPrice,
      keyword: searchParams.get('keyword'),
    });
    const categoryList = await axios.get(`${API_URL}/category/all`);
    setCategories(categoryList.data);
    // nested objects
    setProducts(productList.data.products);
    setItemsPerPage(productList.data.products.length);
    setMaxPage(Math.ceil(productList.data.length / 5));
    setPage(1);
  };

  const loadingFalse = () => {
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productList = await axios.post(`${API_URL}/product/query?keyword=${debouncedSearch}`, {
        category: debouncedCategory,
        sort: debouncedSortPrice,
        // keyword: searchParams.get("keyword"),
      });

      if (productList.data.products.length) {
        const categoryList = await axios.get(`${API_URL}/category/all`);
        setCategories(categoryList.data);
        // nested objects
        setProducts(productList.data.products);
        setItemsPerPage(productList.data.products.length);
        setMaxPage(Math.ceil(productList.data.length / 5));
        // i need to use a function to use setTimeout
        setTimeout(loadingFalse, 500);
      } else {
        setTimeout(loadingFalse, 1000);
        setProductNotFound(true);
      }
    };
    fetchData();
    // dependency uses state outside useEffect otherwise infinite loop will occur
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [debouncedSearch, debouncedCategory, debouncedSortPrice, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedCategory, debouncedSortPrice]);

  const renderProducts = () => {
    const beginningIndex = (page - 1) * 5;
    const currentData = products.slice(beginningIndex, beginningIndex + 5);
    return currentData.map((product, i) => {
      return (
        <tr className="text-sm border-b border-gray-200" key={product.id}>
          <th>{beginningIndex + i + 1}</th>
          <td className="justify-center items-center text-center p-4">
            <img
              src={`${API_URL}/${product.image}`}
              // m-auto makes img fit its container
              className="w-40 aspect-[3/2] rounded-lg border object-cover border-gray-200 m-auto"
            />
          </td>
          <td className="justify-center items-center text-center p-4">{product.name}</td>
          <td className="justify-center items-center text-center p-4">Rp. {product.price_buy?.toLocaleString('id')}</td>
          <td className="justify-center items-center text-center p-4">Rp. {product?.price_sell.toLocaleString('id')}</td>
          <td className="justify-center items-center text-center p-4">{product.stock?.toLocaleString('id')}</td>
          <td className="justify-center items-center text-center p-4">{product.unit}</td>
          <td className="justify-center items-center text-center p-4">{product.volume?.toLocaleString('id')}</td>
          <td className="justify-center items-center text-center p-4">{product.stock_in_unit?.toLocaleString('id')}</td>
          <td className="justify-center items-center text-center p-4">{product.appearance}</td>
          <td className="justify-center items-center text-center p-4">{product.category?.name}</td>
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
    });
  };

  const renderPages = () => {
    const pagination = [];
    for (let i = 1; i <= maxPage; i++) {
      pagination.push(i);
    }
    return pagination.map((value) => {
      return <option key={value}>{value}</option>;
    });
  };

  const handleEditClick = (id) => {
    navigate(`editproduct/${id}`);
  };

  const renderAlert = () => {
    Swal.fire({
      text: 'Product Not Found!',
      icon: 'question',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Okay',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setProductNotFound(false);
          // go back to current url i intended to delete all the params in the url when usings params
          setCurrentCategory('');
          setKeyword('');
          navigate(pathname);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleAddProduct = async (event, value) => {
    navigate(`addproduct`);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/product/delete/${id}`);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          fetchProducts();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="h-full w-full bg-gray-100">
      {/* Search Bar */}
      <div className="h-16 bg-white shadow-sm pl-80 pr-8 fixed z-[3] w-10 top-0 left-0 flex items-center">
        <div className="flex justify-center items-center relative">
          <FaSearch
            // onClick={() => {
            //   setSearchParams({ keyword }, { replace: true });
            // }}
            className="absolute left-2 text-gray-400 bg-gray-100 active:scale-95 transition"
          />
          <input
            type="text"
            value={keyword}
            id="myInput"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            className="search block w-72 shadow border-none rounded-3x1 focus:outline-none py-2 bg-gray-100 text-base text-gray-600 pl-11 pr-7"
          />

          <AiOutlineClose
            onClick={() => {
              setKeyword('');
              navigate(pathname);
            }}
            className="hover:brightness-110 cursor-pointer absolute right-2"
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-3xl text-gray-700 font-bold">Products</h1>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl "
            >
              <option value="">Sort Category</option>
              {categories.map((value) => (
                <CategoryList key={value.id} category={value} />
              ))}
            </select>
          </div>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setCurrentSortPrice(e.target.value)}
              className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl"
            >
              <option value="">Sort by price</option>
              <option value="price_sell,ASC">Lowest Price</option>
              <option value="price_sell,DESC">Highest Price</option>
            </select>
          </div>
          <button className="py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl" onClick={handleAddProduct}>
            Add a Product
          </button>
        </div>
      </div>
      {loading ? (
        <div className="bg-white shadow-sm p-5">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <th className="py-4 px-4 text-center">No</th>
                <th className="py-4 px-4 text-center">Image</th>
                <th className="py-4 px-4 text-center">Name</th>
                <th className="py-4 px-4 text-center">Price Buy</th>
                <th className="py-4 px-4 text-center">Price Sell</th>
                <th className="py-4 px-4 text-center">Stock</th>
                <th className="py-4 px-4 text-center">Unit</th>
                <th className="py-4 px-4 text-center">Volume</th>
                <th className="py-4 px-4 text-center">Stock in unit</th>
                <th className="py-4 px-4 text-center">Appearance</th>
                <th className="py-4 px-4 text-center">Category</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
          </table>
          <div class="flex h-screen w-full items-center justify-center">
            <button type="button" class="flex items-center rounded-lg bg-primary px-4 py-2 text-white" disabled>
              <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="font-medium"> Processing... </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm p-5">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <th className="py-4 px-4 text-center">No</th>
                <th className="py-4 px-4 text-center">Image</th>
                <th className="py-4 px-4 text-center">Name</th>
                <th className="py-4 px-4 text-center">Price Buy</th>
                <th className="py-4 px-4 text-center">Price Sell</th>
                <th className="py-4 px-4 text-center">Stock</th>
                <th className="py-4 px-4 text-center">Unit</th>
                <th className="py-4 px-4 text-center">Volume</th>
                <th className="py-4 px-4 text-center">Stock in unit</th>
                <th className="py-4 px-4 text-center">Appearance</th>
                <th className="py-4 px-4 text-center">Category</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{productNotFound ? <>{renderAlert()}</> : <>{renderProducts()}</>}</tbody>
          </table>
          <div className="mt-3 flex justify-center items-center gap-4 pt-3">
            <button
              onClick={prevPageHandler}
              className={page === 1 ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}
              disabled={page === 1}
            >
              <FaArrowLeft />
            </button>
            <div>
              Page{' '}
              <select type="number" className="bg-gray-100" value={page} onChange={(e) => setPage(+e.target.value)}>
                {renderPages()}
              </select>{' '}
              of {maxPage}
            </div>
            <button
              onClick={nextPageHandler}
              className={page === maxPage ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}
              disabled={page === maxPage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
