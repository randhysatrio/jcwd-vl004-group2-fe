import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../assets/constants';

import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Links = styled.a`
  position: relative;
  font-size: 16px; // 14px/ 16px of height in figma ??
  color: white;
  transition: color 300ms ease-in-out;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 5px;
    left: 0;
    right: 0;
    bottom: -16px;
    background-color: #0EA5E9;
    ); // bottom line in nav
    opacity: 0;
    transition: opacity 300ms ease-in-out;  
  }

  &:hover {
    color: $darkBlue;

    &::before {
      opacity: 1;
    }
  }
`;

const NavbarLink = ({ children, path }) => {
  return (
    <Link to={`${path}`}>
      <div className="relative">
        <span className="font-semibold text-md text-white hover:brightness-110 transition after:h-[2px] after:w-0 after:hover:w-full after:absolute after:top-6 after:left-0 after:bg-emerald-400 after:transition-all cursor-pointer">
          {children}
        </span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const userGlobal = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await Axios.get(`${API_URL}/category/all`);

        setCategories(categories.data);
      } catch (err) {
        toast.error('Unable to set categories', { position: 'bottom-left', theme: 'colored' });
      }
    };
    fetchCategories();
  }, []);

  const renderCategories = () => {
    return categories.map((category) => (
      <Link to={`/products?category=${category.id}`}>
        <div className="w-full py-3 px-4 flex items-center hover:bg-slate-100 border-b border-opacity-50 transition">
          <span className="text-md text-slate-600 font-semibold hover:text-sky-500 hover:brightness-110 cursor-pointer">
            {category.name}
          </span>
        </div>
      </Link>
    ));
  };

  return (
    <nav className="bg-sky-800">
      <div className="container flex">
        {/* all category */}
        <div className="px-8 py-4 bg-sky-500 flex items-center cursor-pointer relative group">
          <span className="text-white">
            <FaBars />
          </span>
          <span className="capitalize ml-2 font-semibold text-white">All Categories</span>
          <div className="absolute w-max left-0 top-full bg-white rounded-b-lg shadow-md divide-y opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
            {renderCategories()}
          </div>
        </div>
        {/* all category end */}

        {/* navbar links */}
        <div className="flex items-center flex-grow pl-12">
          <div className="flex items-center space-x-6">
            <NavbarLink path={'/'}>Home</NavbarLink>
            <NavbarLink path={'/products'}>Shop</NavbarLink>
            <NavbarLink path={'/'}>About Us</NavbarLink>
            <NavbarLink path={'/'}>Contact Us</NavbarLink>

            {/* <Links href="#">Home</Links>
            <Links href="#">Shop</Links>
            <Links href="#">About Us</Links>
            <Links href="#">Contact Us</Links> */}
          </div>
        </div>
        {/* login / register */}
        {userGlobal.name ? (
          <div className="flex items-center">
            <span className="text-md font-semibold text-white">Hello, {userGlobal.name}!</span>
          </div>
        ) : (
          <div className="flex items-center gap-4 ml-auto">
            <NavbarLink path={'/login'}>Login</NavbarLink>
            <NavbarLink path={'/register'}>Register</NavbarLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
