import { useTrendingGifs } from "./hooks/gif_api.js";
import GifGrid from "./components/GifGrid.jsx";
// import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
// import { getUserFavourites } from "../utils/favourites.js";

export default function Home() {
  const { gifs, loading } = useTrendingGifs();
  const { user, role } = useAuth();
  const [favouriteIds, setFavouriteIds] = useState([]);

  const refreshFavs = async () => {
    if (user) {
      const favs = await getUserFavourites(user.uid);
      setFavouriteIds(favs.map((f) => f.id));
    }
  };

  useEffect(() => {
    if (role === "user") {
      refreshFavs();
    } else {
      setFavouriteIds([]);
    }
  }, [user, role]);

  return (
    <div className="page">
      <h1>Trending GIFs</h1>
      {loading ? (
        <div>Loading trending gifs...</div>
      ) : (
        <GifGrid
          gifs={gifs}
          favouriteIds={favouriteIds}
          onItemChange={refreshFavs}
        />
      )}
    </div>
  );
}
