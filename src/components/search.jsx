import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // 🔍 Ikonka

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm); 
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Qidirish..."
        className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch className="absolute right-3 top-3 text-gray-500" />
    </div>
  );
}

export default Search;
