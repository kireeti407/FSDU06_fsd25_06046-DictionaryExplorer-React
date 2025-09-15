import React from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchInput({ query, setQuery, fetchWordDetails, setSuggestions }) {
  const fetchSuggestions = async (text) => {
    if (!text.trim()) return setSuggestions([]);
    const res = await fetch(`https://api.datamuse.com/sug?s=${text}`);
    const data = await res.json();
    setSuggestions(data.slice(0, 8));
  };

  useDebounce(() => fetchSuggestions(query), [query], 350);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWordDetails(query);
      setSuggestions([]);
    }
  };

  return (
    <input
      id="search-input"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type a word and press Enter..."
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:border-gray-700"
    />
  );
}
