import { Dispatch, SetStateAction } from "react";
interface TableHeadProps {
  categories: string[];
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}
const TableHead = ({ categories, setCategory, category }: TableHeadProps) => {
  return (
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
        <th className="p-2 border border-gray-300 text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
