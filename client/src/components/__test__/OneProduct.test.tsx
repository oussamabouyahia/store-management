import { render, screen, fireEvent } from "@testing-library/react";
import OneProduct from "../OneProduct";
import "@testing-library/jest-dom";

describe("OneProduct Component", () => {
  const mockEditProduct = vi.fn();
  const product = {
    id: 1,
    name: "Sample Product",
    price: 10.99,
    quantity: 5,
    category: "Category A",
    storage_location: "Shelf 1",
  };

  test("renders product details correctly", () => {
    render(<OneProduct product={product} editProduct={mockEditProduct} />);

    expect(screen.getByText(/sample product/i)).toBeInTheDocument(); // Case-insensitive match
    expect(screen.getByText(/10.99/)).toBeInTheDocument(); // Matches numbers as string
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/category a/i)).toBeInTheDocument(); // Case-insensitive
    expect(screen.getByText(/shelf 1/i)).toBeInTheDocument(); // Case-insensitive
  });

  test("calls editProduct on button click", () => {
    render(<OneProduct product={product} editProduct={mockEditProduct} />);
    const button = screen.getByText("Edit");
    fireEvent.click(button);

    expect(mockEditProduct).toHaveBeenCalledWith(product.id);
  });
});
