import { Dispatch, SetStateAction } from "react";
import { CardType } from "../types/productType";

interface CardProps {
  card: CardType[];
  setCard: Dispatch<SetStateAction<CardType[]>>;
  setQuantity: Dispatch<SetStateAction<number>>;
}
const Card = ({ card, setCard, setQuantity }: CardProps) => {
  const incrementQuantity = (id: number) => {
    setCard((prev) =>
      prev.map((item: CardType) => {
        if (item.productId === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };
  const decrementQuantity = (id: number) => {
    setCard((prev) =>
      prev.map((item: CardType) => {
        if (item.productId === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 transition duration-300">
      {card.map((product) => (
        <div key={product.productId}>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          {/* <p className="text-sm text-gray-600">ID: {product.productId}</p> */}
          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
          <div className="flex space-x-2 mt-3 mb-3">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
              onClick={() => incrementQuantity(product.productId)}
            >
              +
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
              onClick={() => decrementQuantity(product.productId)}
            >
              -
            </button>
            <button
              className="px-4 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition"
              onClick={() =>
                setCard((prev) =>
                  prev.filter((item) => item.productId !== product.productId)
                )
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Card;
