import { Dispatch, SetStateAction, ChangeEvent } from "react";

// this is a generic function to handle input changes, it has the setState as parameter

const validateInput = (
  name: string,
  value: string | number,
  setErrors: Dispatch<
    SetStateAction<{ name: string; price: string; quantity: string }>
  >
) => {
  let errorMessage = "";

  switch (name) {
    case "name":
      if (typeof value === "string" && value.trim().length < 3) {
        errorMessage = "Enter a name with a minimum of three characters.";
      }
      break;
    case "price":
      if (typeof value === "string" && Number(value) <= 0) {
        errorMessage = "Price must be greater than 0.";
      }
      break;
    case "quantity":
      if (typeof value === "string" && Number(value) <= 0) {
        errorMessage = "Quantity must be greater than 0.";
      }
      break;
    default:
      break;
  }

  setErrors((prev) => ({
    ...prev,
    [name]: errorMessage,
  }));
};

export const handleInputChange =
  <T extends object>(
    setter: Dispatch<SetStateAction<T>>,
    setErrors: Dispatch<
      SetStateAction<{ name: string; price: string; quantity: string }>
    >
  ) =>
  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Perform validation
    validateInput(name, value, setErrors);

    // Update state
    setter((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };
