import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import Suggestions from "./components/Suggestions";
import WordDetails from "./components/WordDetails";
import HistoryPanel from "./components/HistoryPanel";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [wordDetails, setWordDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchWordDetails = async (word) => {
    if (!word.trim()) return;
    setLoading(true);
    setError("");
    setWordDetails(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setWordDetails(data);

      setHistory((prev) => {
        const without = prev.filter((w) => w.toLowerCase() !== word.toLowerCase());
        return [word, ...without].slice(0, 5);
      });
    } catch (err) {
      setError(`No results for "${word}"`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "dark min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-50 text-gray-900"}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dictionary Search</h1>
          <ThemeToggle dark={dark} setDark={setDark} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <SearchInput
              query={query}
              setQuery={setQuery}
              fetchWordDetails={fetchWordDetails}
              setSuggestions={setSuggestions}
            />

            <WordDetails
              loading={loading}
              error={error}
              wordDetails={wordDetails}
              fetchWordDetails={fetchWordDetails}
              setQuery={setQuery}
            />

            <HistoryPanel history={history} fetchWordDetails={fetchWordDetails} setQuery={setQuery} />
          </section>

          <aside>
            <Suggestions suggestions={suggestions} setQuery={setQuery} />
          </aside>
        </main>
      </div>
    </div>
  );
}
