// import "./App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router";
import Product from "./components/Product";
import ProductEdit from "./components/ProductEdit";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import AddProduct from "./components/AddProduct";
import Alert from "./components/Alert";
import { AlertContext } from "./contexts/AlertContext";
import Header from "./components/Header";
import Invoice from "./components/Invoice";
import "./App.css";
import ClientPayments from "./components/ClientPayments";
import Clients from "./components/Clients";
import ProtectedRoute from "./components/ProtectedRoute";
import { clientContext } from "./contexts/ClientContext";
function App() {
  const { activeAlert } = useContext(AlertContext);
  const { client } = useContext(clientContext);
  return (
    <>
      <div>
        <Header />
        {activeAlert.show && (
          <div className="container mx-auto p-4">
            <Alert message={activeAlert.message} color={activeAlert.color} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                children={<ClientPayments />}
                condition={client.length > 0}
              />
            }
          />
          <Route path="products" element={<Products />}>
            <Route index element={<Product />} />
            <Route path="edit/:id" element={<ProductEdit />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="clients" element={<Clients />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
