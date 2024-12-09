const AddProduct = () => {
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
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
        />
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
          type="number"
          id="price"
          name="price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product price"
        />
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
          type="number"
          id="quantity"
          name="quantity"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product quantity"
        />
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
          id="category"
          name="category"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="other">Other</option>
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
          type="text"
          id="storage_location"
          name="storage_location"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter storage location"
        />
      </div>
      {/* 
  // Submit Button  */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
