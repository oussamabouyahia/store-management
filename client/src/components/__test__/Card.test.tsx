import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import axios from "axios";
import { vi } from "vitest";
import Card from "../Card";
import { CardType } from "../../types/productType";
import { SetStateAction, Dispatch } from "react";

describe("Card Component", () => {
  test("renders form correctly", () => {
    const card: CardType[] = [
      { productId: 1, quantity: 20, name: "product1", price: 10 },
      { productId: 2, quantity: 10, name: "product2", price: 20 },
      { productId: 3, quantity: 10, name: "product3", price: 30 },
    ];
    const setCard: Dispatch<SetStateAction<CardType[]>> = () =>
      void render(<Card card={card} setCard={setCard} />);

    // Assert that all component elements are exist
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "product1"
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "product2"
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "product3"
    );
    expect(screen.getByRole("button")).toHaveTextContent("+");
    expect(screen.getByRole("button")).toHaveTextContent("-");
    expect(screen.getByRole("button")).toHaveTextContent("Delete");

    expect(screen.getByPlaceholderText("client")).toBeInTheDocument();
  });
});
