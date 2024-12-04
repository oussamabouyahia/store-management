import { ProductType } from "../types/productType";

interface PaginationProps {
  page: { first: number; last: number };
  previousPage: () => void;
  products: ProductType[];
  nextPage: () => void;
}

const Pagination = ({
  page,
  previousPage,
  products,
  nextPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        disabled={page.first === 0}
        className={`px-4 py-2 rounded-md border text-sm font-medium ${
          page.first === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={previousPage}
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {Math.ceil(page.first / 4) + 1} of {Math.ceil(products.length / 4)}
      </span>
      <button
        disabled={page.last >= products.length}
        className={`px-4 py-2 rounded-md border text-sm font-medium ${
          page.last >= products.length
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
