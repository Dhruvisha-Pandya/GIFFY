import { useEffect, useState } from "react";
import { useTrendingGifs } from "../hooks/useGiphyApi.js";
import GifGrid from "../components/GifGrid.jsx";
import { getFavourites, toggleFavouriteForGif } from "../utils/favourites.js";

export default function Home() {
  const { gifs, loading, error } = useTrendingGifs();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(getFavourites());
  }, []);

  const favouriteIds = favourites.map((f) => f.id);

  const handleToggleFavourite = (gif) => {
    const updated = toggleFavouriteForGif(gif);
    setFavourites(updated);
  };

  return (
    <div className="page">
      <h1>Trending GIFs</h1>
      <p className="helper-text">
        These GIFs are loaded live from the GIPHY Trending API.
      </p>

      {error && <p className="helper-text">Error: {error}</p>}
      {loading && <p>Loading trending GIFs...</p>}

      {!loading && !error && gifs.length === 0 && (
        <p className="empty-state">No GIFs found.</p>
      )}

      {!loading && !error && gifs.length > 0 && (
        <GifGrid
          gifs={gifs}
          favouriteIds={favouriteIds}
          onToggleFavourite={handleToggleFavourite}
        />
      )}
    </div>
  );
}
