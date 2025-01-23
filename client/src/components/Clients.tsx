import { useEffect, useState } from "react";

const Clients = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/sale/clients")
      .then((data) => data.json())
      .then((res) => {
        setClients(res.clients);
      })
      .catch((err) => {
        if (err.response) alert(err.message);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center m-10 font-bold uppercase text-blue-900">
        List of clients
      </h1>
      <table className="min-w-1200 mx-auto bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
              Client Name
            </th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
              Sales
            </th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold uppercase">
              Payments
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition duration-300"
            >
              <td className="px-6 py-4 text-gray-900 font-medium">{client}</td>
              <td className="px-6 py-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  See Sales
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                  See Payments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
