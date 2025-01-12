import { Dispatch, SetStateAction, useContext, useState } from "react";
import { CardType } from "../types/productType";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";
import { AlertContext } from "../contexts/AlertContext";
import useCardLogic from "../custom Hooks/useCardLogic";
import { useNavigate } from "react-router";
import Button from "./Button";
import { clientContext } from "../contexts/ClientContext";

interface CardProps {
  card: CardType[];
  setCard: Dispatch<SetStateAction<CardType[]>>;
}

const Card = ({ card, setCard }: CardProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [clientName, setClientName] = useState("");
  const { setActiveAlert } = useContext(AlertContext);
  const { incrementQuantity, decrementQuantity } = useCardLogic(setCard);
  const navigate = useNavigate();
  const { setClient } = useContext(clientContext);
  const totalAmount = card.reduce((t, item) => {
    t += item.quantity * item.price;
    return Number(t.toFixed(2));
  }, 0);
  const sellProcess = () => {
    axios
      .post("http://localhost:8080/sale", {
        products: card.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        clientName,
      })
      .then((res) => {
        setClient(clientName);
        setActiveAlert({
          message: res.data.message,
          color: "green",
          show: true,
        });
        const saleId = res.data.saleId;
        navigate("/Products/invoice", {
          state: { card, totalAmount, clientName, saleId },
        });
      })
      .catch((error) => {
        setActiveAlert({ message: error.message, color: "red", show: true });
      });
  };

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-lg bg-gray-50 w-1/2 mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Cart</h2>
      <input
        type="text"
        value={clientName}
        className="m-2 px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-green-500 focus:border-red-500"
        placeholder="client"
        onChange={(e) => setClientName(e.target.value)}
      />
      {card.map((product) => (
        <div
          key={product.productId}
          className="mb-1 p-4 bg-blue-50 rounded-md shadow-md "
        >
          <h3 className="text-lg font-semibold text-gray-700">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-sm text-gray-600">
                Quantity:{" "}
                <span className="font-medium">{product.quantity}</span>
              </p>
              <p className="text-sm text-gray-600">
                Price: <span className="font-medium">${product.price}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
                onClick={() => incrementQuantity(product.productId)}
              >
                +
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition"
                onClick={() => decrementQuantity(product.productId)}
              >
                -
              </button>
              <button
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition"
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
        </div>
      ))}
      <div className="mt-6 p-4 bg-gray-200 rounded-md">
        <h4 className="text-lg font-semibold text-gray-700">
          Total Amount:{" "}
          <span className="text-green-600">{totalAmount.toFixed(2)} TND</span>
        </h4>

        <Button
          text="Proceed with selling"
          isDisabled={clientName.length < 5}
          onClick={() => setShowDialog(true)}
        />
        {showDialog && (
          <ConfirmDialog
            title="selling process"
            message="are you sure to proceed to sell with this card"
            onConfirm={sellProcess}
            onCancel={() => setShowDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
