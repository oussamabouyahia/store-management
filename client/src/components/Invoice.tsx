import { useLocation } from "react-router";
import { CardType } from "../types/productType";
import axios from "axios";
import { useContext, useState } from "react";
import { AlertContext } from "../contexts/AlertContext";
const Invoice = () => {
  const [amount, setAmount] = useState(0); //amount to be paid by the client
  const location = useLocation();
  const { card, totalAmount, clientName, saleId } = location.state;
  const { setActiveAlert } = useContext(AlertContext);
  const payment = () => {
    try {
      axios
        .post("http://localhost:8080/payment", { amount, clientName, saleId })
        .then((res) => {
          if (res.status == 201)
            setActiveAlert({
              message: `${res.data.message} , amount paid ${res.data.payment}`,
              show: true,
              color: "green",
            });
          else
            setActiveAlert({
              message: `${res.data.message} `,
              show: true,
              color: "red",
            });
        });
    } catch (error) {
      setActiveAlert({
        message: `error occured `,
        show: true,
        color: "red",
      });
    }
  };
  return (
    <div
      id="invoice-container"
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8"
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Invoice</h1>
          <p className="text-sm text-gray-500">
            Generated on: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Client:{" "}
            <span className="font-medium text-gray-700">
              {clientName || "N/A"}
            </span>
          </p>
          <div>
            <label htmlFor="paid"> Paid</label>
            <input
              id="paid"
              className="ml-2 w-20 px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-green-500 focus:border-red-500"
              type="number"
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
      </header>

      {/* Invoice Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300 text-left text-sm font-medium text-gray-700">
              Product
            </th>
            <th className="p-3 border border-gray-300 text-center text-sm font-medium text-gray-700">
              Quantity
            </th>
            <th className="p-3 border border-gray-300 text-right text-sm font-medium text-gray-700">
              Price
            </th>
            <th className="p-3 border border-gray-300 text-right text-sm font-medium text-gray-700">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {card.map((item: CardType) => (
            <tr key={item.productId} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-300 text-left text-sm text-gray-700">
                {item.name}
              </td>
              <td className="p-3 border border-gray-300 text-center text-sm text-gray-700">
                {item.quantity}
              </td>
              <td className="p-3 border border-gray-300 text-right text-sm text-gray-700">
                {Number(item.price).toFixed(2)} TND
              </td>
              <td className="p-3 border border-gray-300 text-right text-sm text-gray-700">
                {Number(item.quantity * item.price).toFixed(2)} TND
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="flex justify-end mt-6">
        <div className="w-1/2 bg-gray-100 p-4 rounded-md shadow-md">
          <h4 className="text-lg font-bold text-gray-700">Invoice Summary</h4>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-lg font-medium text-gray-800">
              {totalAmount.toFixed(2)} TND
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">Oussama Library</p>
        <div className="flex">
          <button
            onClick={() => window.print()}
            id="printButton"
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Print Invoice
          </button>
          <button
            onClick={payment}
            id="paymentButton"
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Payment
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Invoice;
