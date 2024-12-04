import { useEffect, useState } from "react";
import { ProductType } from "../types/productType";
import { useNavigate } from "react-router";
import Pagination from "./Pagination";
import OneProduct from "./OneProduct";
import Search from "./Search";
const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ status: false, message: "" });
  const [page, setPage] = useState({ first: 0, last: 4 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.product);
        setLoading(false);
      })
      .catch((error) => {
        setErrors({ status: true, message: error.message });
        console.log(error);
      });
  }, []);

  const editProduct = (id: number) => {
    navigate(`/products/edit/${id}`, {
      state: products.find((product: ProductType) => product.id === id),
    });
  };
  const previousPage = () => {
    setPage((prev) => ({
      first: Math.max(prev.first - 4, 0),
      last: Math.max(prev.last - 4, 4),
    }));
  };

  const nextPage = () => {
    setPage((prev) => ({
      first: Math.min(prev.first + 4, products.length - 4),
      last: Math.min(prev.last + 4, products.length),
    }));
  };
  const categories = [...new Set(products.map((product) => product.category))];

  if (errors.status)
    return (
      <h1 className="text-3xl  text-center font-bold">
        Something went wrong:
        <h3 className=" text-xl text-center text-red-600">{errors.message}</h3>
      </h1>
    );
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">List of Products</h3>
      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="overflow-x-auto">
        <Search setSearch={setSearch} />

        <table className="table-auto w-full border-collapse border border-gray-200 shadow-sm">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-2 border border-gray-300 text-left">ID</th>
              <th className="p-2 border border-gray-300 text-left">Name</th>
              <th className="p-2 border border-gray-300 text-left">Price</th>
              <th className="p-2 border border-gray-300 text-left">Quantity</th>
              <th className="p-2 border border-gray-300 text-left">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </th>
              <th className="p-2 border border-gray-300 text-left">
                Storage Location
              </th>
              <th className="p-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => {
                if (category === "All Categories") return product;
                return product.category === category;
              })
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )

              .slice(page.first, page.last)
              .map((product) => {
                return (
                  <OneProduct
                    key={product.id}
                    product={product}
                    editProduct={editProduct}
                  />
                );
              })}
          </tbody>
        </table>
        <Pagination
          page={page}
          previousPage={previousPage}
          nextPage={nextPage}
          products={products}
        />
      </div>
    </div>
  );
};

export default Product;
