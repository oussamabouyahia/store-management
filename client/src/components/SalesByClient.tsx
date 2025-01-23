import { useContext, useEffect, useState } from "react";
import { clientContext } from "../contexts/ClientContext";
interface SaleByClientType {
  id: number;
  total_amount: number;
  sale_date: string;
  client_name: string;
}
const SalesByClient = () => {
  const [salesByClient, setSalesByClient] = useState<SaleByClientType[]>([]);
  const { client } = useContext(clientContext);
  useEffect(() => {
    fetch(`http://localhost:8080/sale/summary/${client}`)
      .then((res) => res.json())
      .then((data) => setSalesByClient(data.summaryList))
      .catch((err) => {
        if (err.response) alert(err.message);
      });
  });
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Sales for the client: <span className="text-blue-600">{client}</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border border-gray-300 text-left">ID</th>
              <th className="p-3 border border-gray-300 text-left">
                Total Sale Amount
              </th>
              <th className="p-3 border border-gray-300 text-left">
                Sale Date
              </th>
            </tr>
          </thead>
          <tbody>
            {salesByClient.map((sale) => (
              <tr
                key={sale.id}
                className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white transition"
              >
                <td className="p-3 border border-gray-300 text-gray-700">
                  {sale.id}
                </td>
                <td className="p-3 border border-gray-300 text-gray-700">
                  {sale.total_amount} TND
                </td>
                <td className="p-3 border border-gray-300 text-gray-700">
                  {new Date(sale.sale_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesByClient;
