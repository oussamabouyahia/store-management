import { useState } from "react";
import Button from "./Button";
import { handleInputChange } from "../utils/inputHandler";
import axios from "axios";
const AddProduct = () => {
  const initialState = {
    name: "",
    price: 0,
    quantity: 0,
    category: "",
    storage_location: "",
  };
  const [product, setProduct] = useState(initialState);
  const [errors, setErrors] = useState({ name: "", price: "", quantity: "" });

  const newProduct = () => {
    axios
      .post("http://localhost:8080/product", product)
      .then((res) => {
        alert(res.data.message);
        setProduct(initialState);
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.message);
      });
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Product
      </h2>

      {/* <!-- Product Name --> */}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name
        </label>
        <input
          value={product.name}
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
          onChange={handleInputChange(setProduct, setErrors)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name}</p>
        )}
      </div>

      {/* <!-- Price --> */}
      <div className="mb-5">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          value={product.price}
          type="number"
          id="price"
          name="price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a valid product price"
          onChange={handleInputChange(setProduct, setErrors)}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-2">{errors.price}</p>
        )}
      </div>

      {/* <!-- Quantity --> */}
      <div className="mb-5">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quantity
        </label>
        <input
          value={product.quantity}
          type="number"
          id="quantity"
          name="quantity"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a valid product quantity"
          onChange={handleInputChange(setProduct, setErrors)}
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-2">{errors.quantity}</p>
        )}
      </div>

      {/* <!-- Category --> */}
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          value={product.category}
          onChange={handleInputChange(setProduct, setErrors)}
          id="category"
          name="category"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="pen">pen</option>
          <option value="chaiers">chaiers</option>
          <option value="book">book</option>
          <option value="others">others</option>
        </select>
      </div>
      {/* storage_location */}
      <div className="mb-5">
        <label
          htmlFor="storage_location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Storage Location
        </label>
        <input
          value={product.storage_location}
          onChange={handleInputChange(setProduct, setErrors)}
          type="text"
          id="storage_location"
          name="storage_location"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter storage location"
        />
      </div>
      {/* 
  // Submit Button  */}
      <Button
        text="add product"
        onClick={newProduct}
        isDisabled={
          product.name.length < 3 || product.price <= 0 || product.quantity <= 0
        }
      />
    </div>
  );
};

export default AddProduct;
