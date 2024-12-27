import { Dispatch, SetStateAction } from "react";
import { CardType } from "../types/productType";

const useCardLogic = (setCard: Dispatch<SetStateAction<CardType[]>>) => {
  const incrementQuantity = (id: number) => {
    setCard((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCard((prev) =>
      prev.map((item) =>
        item.productId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return { incrementQuantity, decrementQuantity };
};

export default useCardLogic;
