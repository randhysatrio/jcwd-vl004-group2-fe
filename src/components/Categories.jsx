import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import CategoryCard from './CategoryCard';
import category1 from '../assets/images/categories/category1.jpg';
import category2 from '../assets/images/categories/category2.jpg';
import category3 from '../assets/images/categories/category3.jpg';

const Categories = () => {
  const images = [category1, category2, category3];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await Axios.get(`${API_URL}/category/all`);

      setCategories(categories.data);
    };
    fetchCategories();
  }, []);

  const renderCategories = () => {
    return categories.map((category, index) => (
      <CategoryCard key={category.id} name={category.name} img={images[index]} id={category.id} />
    ));
  };

  return (
    <div className="container py-10 px-10 sm:px-0">
      <div className="w-full">
        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          Shop by Categories
        </span>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-0 py-6 md:divide-x-2">{renderCategories()}</div>
    </div>
  );
};

export default Categories;
