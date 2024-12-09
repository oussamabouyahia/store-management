// import "./App.css";

import { Route, Routes } from "react-router";
import Product from "./components/Product";
import ProductEdit from "./components/ProductEdit";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />}>
            <Route index element={<Product />} />
            <Route path="edit/:id" element={<ProductEdit />} />
            <Route path="addProduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
