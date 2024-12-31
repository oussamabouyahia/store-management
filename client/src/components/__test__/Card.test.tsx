import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import axios from "axios";
import Card from "../Card";
import { CardType } from "../../types/productType";

vi.mock("axios");

describe("Card Component", () => {
  const mockCard: CardType[] = [
    { productId: 1, quantity: 20, name: "product1", price: 10 },
    { productId: 2, quantity: 10, name: "product2", price: 20 },
    { productId: 3, quantity: 10, name: "product3", price: 30 },
  ];

  const mockSetCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders card items and buttons correctly", () => {
    render(<Card card={mockCard} setCard={mockSetCard} />);

    // Assert that all products are rendered
    expect(screen.getByText("product1")).toBeInTheDocument();
    expect(screen.getByText("product2")).toBeInTheDocument();
    expect(screen.getByText("product3")).toBeInTheDocument();

    // Assert buttons exist
    const incrementButtons = screen.getAllByText("+");
    const decrementButtons = screen.getAllByText("-");
    const deleteButtons = screen.getAllByText("Delete");

    expect(incrementButtons).toHaveLength(3);
    expect(decrementButtons).toHaveLength(3);
    expect(deleteButtons).toHaveLength(3);

    // Assert client name input exists
    const clientInput = screen.getByPlaceholderText("client");
    expect(clientInput).toBeInTheDocument();
  });

  test("calls incrementQuantity on + button click", () => {
    render(<Card card={mockCard} setCard={mockSetCard} />);
    const incrementButton = screen.getAllByText("+")[0];

    fireEvent.click(incrementButton);
    expect(mockSetCard).toHaveBeenCalledTimes(1);
  });

  test("calls decrementQuantity on - button click", () => {
    render(<Card card={mockCard} setCard={mockSetCard} />);
    const decrementButton = screen.getAllByText("-")[0];

    fireEvent.click(decrementButton);
    expect(mockSetCard).toHaveBeenCalledTimes(1);
  });

  test("removes item from card on Delete button click", () => {
    render(<Card card={mockCard} setCard={mockSetCard} />);
    const deleteButton = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteButton);
    expect(mockSetCard).toHaveBeenCalledWith(expect.any(Function));
  });

  test("disables 'Proceed with selling' button when client name is invalid", () => {
    render(<Card card={mockCard} setCard={mockSetCard} />);
    const proceedButton = screen.getByRole("button", {
      name: "Proceed with selling",
    });

    // Assert the button is disabled initially
    expect(proceedButton).toBeDisabled();

    const clientInput = screen.getByPlaceholderText("client");
    fireEvent.change(clientInput, { target: { value: "Valid Name" } });

    // Assert the button is enabled
    expect(proceedButton).toBeEnabled();
  });

  test("calls sellProcess on 'Proceed with selling' button click", async () => {
    axios.post.mockResolvedValue({ data: { message: "Sale successful" } });

    render(<Card card={mockCard} setCard={mockSetCard} />);
    const clientInput = screen.getByPlaceholderText("client");
    fireEvent.change(clientInput, { target: { value: "Valid Name" } });

    const proceedButton = screen.getByRole("button", {
      name: "Proceed with selling",
    });
    fireEvent.click(proceedButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/sale", {
      products: mockCard.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      clientName: "Valid Name",
    });
  });
});
