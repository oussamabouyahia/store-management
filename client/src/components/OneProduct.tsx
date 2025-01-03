import { ProductType } from "../types/productType";
import { Dispatch, SetStateAction } from "react";
interface OneProductProps {
  product: ProductType;
  editProduct: (id: number) => void;
  sellProduct: (id: number) => void;
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
}
const OneProduct = ({
  product,
  editProduct,
  sellProduct,
  setQuantity,
  quantity,
}: OneProductProps) => {
  return (
    <tr className="even:bg-gray-50 hover:bg-gray-100">
      <td className="p-2 border border-gray-300">{product.id}</td>
      <td className="p-2 border border-gray-300">
        {product.name.toLowerCase()}
      </td>
      <td className="p-2 border border-gray-300">{product.price}</td>
      <td className="p-2 border border-gray-300">{product.quantity}</td>
      <td className="p-2 border border-gray-300">{product.category}</td>
      <td className="p-2 border border-gray-300">
        {product?.storage_location}
      </td>
      <td className="p-2 border border-gray-300 text-center">
        <button
          onClick={() => editProduct(product.id)}
          className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => sellProduct(product.id)}
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          add to card
        </button>

        <input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
          min="0"
          className="ml-2 w-20 px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-green-500 focus:border-red-500"
        />
      </td>
    </tr>
  );
};

export default OneProduct;
