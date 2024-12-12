import { render, screen, fireEvent } from "@testing-library/react";
import AddProduct from "../AddProduct";
import "@testing-library/jest-dom";
import axios from "axios";
import { vi } from "vitest";

// Mock axios
vi.mock("axios", () => {
  return {
    post: vi.fn(() =>
      Promise.resolve({
        data: { message: "Product added successfully" },
      })
    ),
  };
});

describe("AddProduct Component", () => {
  const product = {
    name: "Sample Product",
    price: 10.99,
    quantity: 5,
    category: "Category A",
    storage_location: "Shelf 1",
  };

  test("renders form correctly", () => {
    render(<AddProduct />);

    // Assert that all form fields are rendered
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Storage Location")).toBeInTheDocument();
  });

  test("disables the button for invalid inputs", () => {
    render(<AddProduct />);

    const button = screen.getByRole("button", { name: /add product/i });
    const nameInput = screen.getByLabelText("Product Name");
    const priceInput = screen.getByLabelText("Price");
    const quantityInput = screen.getByLabelText("Quantity");

    // Assert the button is disabled initially
    expect(button).toBeDisabled();

    // Enter invalid values
    fireEvent.change(nameInput, { target: { value: "a" } }); // Name < 3 characters
    fireEvent.change(priceInput, { target: { value: "0" } }); // Price <= 0
    fireEvent.change(quantityInput, { target: { value: "-1" } }); // Quantity <= 0

    // Assert that the button remains disabled
    expect(button).toBeDisabled();

    // Enter valid values
    fireEvent.change(nameInput, { target: { value: "Valid Name" } }); // Name >= 3 characters
    fireEvent.change(priceInput, { target: { value: "10" } }); // Price > 0
    fireEvent.change(quantityInput, { target: { value: "5" } }); // Quantity > 0

    // Assert that the button is now enabled
    expect(button).toBeEnabled();
  });

  test("calls API on valid form submission", async () => {
    render(<AddProduct />);

    // Fill the form
    fireEvent.change(screen.getByLabelText("Product Name"), {
      target: { value: product.name },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: product.price },
    });
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: product.quantity },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: product.category },
    });
    fireEvent.change(screen.getByLabelText("Storage Location"), {
      target: { value: product.storage_location },
    });

    // Click the button
    const button = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(button);

    // Assert the axios.post call
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/product", {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      storage_location: product.storage_location,
    });
  });
});
