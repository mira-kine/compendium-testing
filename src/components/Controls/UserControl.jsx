import React from 'react';

export default function UserControl({ query, setQuery, setLoading }) {
  return (
    <div>
      <label>Search: </label>
      <input
        className="search"
        type="text"
        placeholder="Search Pokemon"
        value={query}
        onInput={(e) => setQuery(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => {
          setLoading(true);
        }}
      >
        Go!
      </button>
    </div>
  );
}
