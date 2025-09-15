import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
    const data = await res.json();
    setBooks(data.docs.slice(0, 12)); // show top 12 results
  };

  return (
    <div className="text-center p-6 w-full max-w-4xl">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-8 drop-shadow-lg">
        📚 Book Finder
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-l-lg border border-gray-300 w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={searchBooks}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-r-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center hover:shadow-xl transition"
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded-md mb-3">
                ❌ No Cover
              </div>
            )}
            <h2 className="font-semibold text-sm text-center">{book.title}</h2>
            <p className="text-gray-600 text-xs text-center">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
