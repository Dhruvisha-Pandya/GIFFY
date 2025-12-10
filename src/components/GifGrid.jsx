import GifCard from "./GifCard.jsx";

export default function GifGrid({ gifs, favouriteIds = [], onToggleFavourite }) {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <GifCard
          key={gif.id}
          gif={gif}
          isFavourite={favouriteIds.includes(gif.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}
