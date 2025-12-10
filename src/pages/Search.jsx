import { useEffect, useState } from "react";
import GifGrid from "../components/GifGrid.jsx";
import { searchGifs } from "../hooks/useGiphyApi.js";
import { getFavourites, toggleFavouriteForGif } from "../utils/favourites.js";

export default function Search() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  const favouriteIds = favourites.map((f) => f.id);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError("");
      const data = await searchGifs(query.trim(), 24);
      setGifs(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error searching gifs");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavourite = (gif) => {
    const updated = toggleFavouriteForGif(gif);
    setFavourites(updated);
  };

  return (
    <div className="page">
      <h1>Search GIFs</h1>
      <p className="helper-text">
        Search the GIPHY API and save your favourite results.
      </p>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for cats, memes, anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="helper-text">Error: {error}</p>}

      {gifs.length === 0 && !loading && !error && (
        <p className="empty-state">
          Try searching for something like <strong>"cakes"</strong> or{" "}
          <strong>"dancing girl"</strong> or <strong>"anime"</strong>.
        </p>
      )}

      {gifs.length > 0 && (
        <GifGrid
          gifs={gifs}
          favouriteIds={favouriteIds}
          onToggleFavourite={handleToggleFavourite}
        />
      )}
    </div>
  );
}
