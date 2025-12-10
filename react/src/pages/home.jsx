import { useTrendingGifs } from "../hooks/gif_api.js";
import GifGrid from "../components/GifGrid.jsx";
import { useState } from "react";

export default function Home() {
  const { gifs, loading, error } = useTrendingGifs();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="page">
      <h1>Trending GIFs</h1>
      
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => setShowSearch(!showSearch)}>
          Search
        </button>
        <button className="nav-btn" onClick={() => alert('Random GIF feature coming soon!')}>
          Random GIF
        </button>
        <button className="nav-btn" onClick={() => alert('Favorite GIFs feature coming soon!')}>
          Favorite GIFs
        </button>
      </div>

      {showSearch && (
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search for GIFs..." 
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>
      )}

      {loading ? (
        <div>Loading trending gifs...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <GifGrid gifs={gifs} />
      )}
    </div>
  );
}
