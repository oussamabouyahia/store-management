interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ setSearch }: SearchProps) => {
  return (
    <div className="relative mb-4">
      <input
        id="search"
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-2.5 right-3 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16l-4-4m0 0l4-4m-4 4h16"
        />
      </svg>
    </div>
  );
};

export default Search;
