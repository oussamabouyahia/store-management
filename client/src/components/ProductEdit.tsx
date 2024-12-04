import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ProductType } from "../types/productType";
import axios from "axios";

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: ProductType = location.state; // Get the product from state

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    category: product?.category || "",
    storage_location: product?.storage_location || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/product/${product.id}`, formData)
      .then((response: any) => {
        if (response.ok) {
          alert("Product updated successfully!");
          navigate("/products");
        } else {
          alert("Failed to update the product.");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Product: {product?.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Storage Location
          </label>
          <input
            type="text"
            name="storage_location"
            value={formData.storage_location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          disabled={
            Number(formData.price) <= 0 || Number(formData.quantity) < 0
          }
          type="submit"
          className={`w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
            Number(formData.price) <= 0 || Number(formData.quantity) < 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
