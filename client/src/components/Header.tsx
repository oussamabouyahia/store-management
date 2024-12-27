import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="hover:text-gray-300">
            Library Store Management
          </NavLink>
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Payments
          </NavLink>
          <NavLink
            to="/products/addProduct"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Add Product
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            Reports
          </NavLink>
        </nav>

        {/* Profile/Settings */}
        <div>
          <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
