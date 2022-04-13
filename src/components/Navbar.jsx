import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

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

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        {/* all category */}
        <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
          <span className="text-white">
            <FaBars />
          </span>
          <span className="capitalize ml-2 text-white">All Categories</span>
          <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <span className="ml-2 text-gray-600 text-sm">APIs</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <span className="ml-2 text-gray-600 text-sm">Intermediaries</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <span className="ml-2 text-gray-600 text-sm">Additives</span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <span className="ml-2 text-gray-600 text-sm">
                Natural Extract
              </span>
            </a>
          </div>
        </div>
        {/* all category end */}

        {/* navbar links */}
        <div className="flex items-center flex-grow pl-12">
          <div className="flex items-center space-x-6 capitalize">
            <Links href="#">Home</Links>
            <Links href="#">Shop</Links>
            <Links href="#">About Us</Links>
            <Links href="#">Contact Us</Links>
          </div>
        </div>
        {/* login / register */}
        <div className="flex items-center justify-endflex-grow pl-12 space-x-6">
          <div>
            <Links>Login</Links>
          </div>
          <div>
            <Links>Register</Links>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
