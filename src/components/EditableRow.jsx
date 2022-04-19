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
import ProductAdmin from "../components/ProductTable";
import Pagination from "../components/Pagination";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleAddFormSubmit,
}) => {
  return (
    <div className="pt-24 pr-8 pl-48">
      <h1 className="text-3xl text-gray-700 font-bold mb-3">Add a Product</h1>
      <div>
        <form onSubmit={handleAddFormSubmit}>
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
                onChange={handleEditFormChange}
                value={editFormData.name}
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
                onChange={handleEditFormChange}
              />
            </div>
            <div className="col-start-1">
              <label className="">Image (URL):</label>
            </div>
            <div className="col-start-2 col-span-3">
              <textarea
                type="text"
                name="image"
                className="h-32 w-5/6"
                required
                onChange={handleEditFormChange}
                d
              />
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
                onChange={handleEditFormChange}
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
                onChange={handleEditFormChange}
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
                onChange={handleEditFormChange}
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
                onChange={handleEditFormChange}
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
                onChange={handleEditFormChange}
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
                onChange={handleEditFormChange}
              />
            </div>
            <div className="col-start-1">
              <label className="">Category ID:</label>
            </div>
            <div>
              <input
                type="number"
                name="categoryId"
                className=""
                required
                onChange={handleEditFormChange}
              />
            </div>
          </div>
          <button
            className="mt-8 py-2.5 px-6 text-white bg-primary hover:bg-blue-400 transition rounded-xl items-center"
            type="submit"
            onClick={handleAddFormSubmit}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditableRow;
