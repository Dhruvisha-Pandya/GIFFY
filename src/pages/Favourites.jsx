import { useEffect, useState } from "react";
import { getFavourites, saveFavourites } from "../utils/favourites.js";

export default function Favourites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  const handleRemove = (id) => {
    const updated = favs.filter((f) => f.id !== id);
    setFavs(updated);
    saveFavourites(updated);
  };

  return (
    <div className="page">
      <h1>Your Favourite GIFs</h1>
      <p className="helper-text">
        These GIFs are stored in your browser using localStorage.
      </p>

      {favs.length === 0 && (
        <p className="empty-state">
          You have no favourites yet. Add some from the Home or Search pages!
        </p>
      )}

      {favs.length > 0 && (
        <div className="gif-grid">
          {favs.map((gif) => (
            <div key={gif.id} className="gif-card">
              {gif.url && (
                <img
                  src={gif.url}
                  alt={gif.title}
                  className="gif-img"
                  loading="lazy"
                />
              )}
              <div className="gif-card-footer">
                <span className="gif-title" title={gif.title}>
                  {gif.title}
                </span>
                <button
                  className="btn"
                  onClick={() => handleRemove(gif.id)}
                  style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
