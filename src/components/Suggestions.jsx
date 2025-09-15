import React from "react";

export default function Suggestions({ suggestions, setQuery }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
      <h4 className="font-semibold mb-2">Suggestions</h4>
      {suggestions.length === 0 && (
        <p className="text-sm text-gray-500">Start typing to see suggestions.</p>
      )}
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => setQuery(s.word)}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {s.word}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
