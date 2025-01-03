import { useState, useEffect } from "react";

interface Sale {
  id: number;
  total_amount: number;
  client_name: string;
  total_paid: number;
  remaining_unpaid: number;
  Date: string;
}
interface Payment {
  amount_paid: number;
  payment_date: string;
}
interface PaymentDetails {
  id: number;
  total_amount: number;
  sale_date: string;
  client_name: string;
  payments: Payment[];
}

const ClientPayments = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [paymnet, setPayment] = useState<PaymentDetails[]>([]);
  const client = "new client";
  useEffect(() => {
    fetch(`http://localhost:8080/payment/${client}`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data.results);
        setPayment(data.sales);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment History
      </h1>
      <h3 className="text-xl  text-blue-800 mb-6 text-left">
        Client: {client}{" "}
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border border-gray-300">
                Sale ID
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border border-gray-300">
                Total Amount
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border border-gray-300">
                Total Paid
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border border-gray-300">
                Remaining Unpaid
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border border-gray-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.id}
                className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white"
              >
                <td className="p-3 text-sm text-gray-700 border border-gray-300">
                  {sale.id}
                </td>
                <td className="p-3 text-sm text-gray-700 border border-gray-300">
                  {sale.total_amount} TND
                </td>
                <td className="p-3 text-sm text-gray-700 border border-gray-300">
                  {sale.total_paid} TND
                </td>
                <td className="p-3 text-sm text-gray-700 border border-gray-300">
                  {sale.remaining_unpaid} TND
                </td>
                <td className="p-3 text-sm text-gray-700 border border-gray-300">
                  {new Date(sale.Date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPayments;
