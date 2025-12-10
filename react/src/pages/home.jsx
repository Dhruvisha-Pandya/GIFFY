import { useEffect, useState } from "react";
import GifCard from "../components/GifCard";
import { fetchTrending } from "../api";
import { addFavorite } from "../services/favorites";

export default function Home({ user }) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrending(24)
      .then(setGifs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Trending GIFs</h2>
      {loading ? (
        <p>Loading...</p>
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
