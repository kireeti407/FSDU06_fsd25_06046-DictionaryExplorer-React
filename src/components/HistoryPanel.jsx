import React from "react";

export default function HistoryPanel({ history, fetchWordDetails, setQuery }) {
  const handleClick = (word) => {
    setQuery(word);
    fetchWordDetails(word);
  };

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 shadow rounded p-4">
      <h4 className="font-semibold mb-2">Search History</h4>
      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No recent searches</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {history.map((word, i) => (
            <button
              key={i}
              onClick={() => handleClick(word)}
              className="px-2 py-1 border rounded"
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
