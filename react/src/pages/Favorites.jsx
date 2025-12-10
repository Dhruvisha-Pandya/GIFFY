import { useEffect, useState } from "react";
import GifCard from "../components/GifCard";
import { getFavoritesForUser, removeFavoriteByDocId } from "../services/favorites";

export default function Favorites({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) getFavoritesForUser(user.uid).then(setItems);
  }, [user]);

  async function handleRemove(id) {
    await removeFavoriteByDocId(id);
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Favorites</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
          gap: 12,
        }}
      >
        {items.map((it) => (
          <GifCard
            key={it.id}
            gif={it.gif}
            saved={it}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
