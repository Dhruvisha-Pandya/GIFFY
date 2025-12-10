import { useState } from "react";
import GifCard from "../components/GifCard";
import { searchGifs } from "../api";
import { addFavorite } from "../services/favorites";

export default function Search({ user }) {
  const [q, setQ] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function doSearch(term) {
    setLoading(true);
    setGifs(await searchGifs(term));
    setLoading(false);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Search GIFs</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doSearch(q);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Searching...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: 12,
          }}
        >
          {gifs.map((g) => (
            <GifCard
              key={g.id}
              gif={g}
              onSave={user ? (gif) => addFavorite(user.uid, gif) : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
