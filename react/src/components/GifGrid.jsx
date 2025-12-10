import GifCard from "./GifCard.jsx";

export default function GifGrid({ gifs, onItemChange, favouriteIds = [] }) {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <GifCard
          key={gif.id}
          gif={gif}
          isFavourite={favouriteIds.includes(gif.id)}
          onChange={onItemChange}
        />
      ))}
    </div>
  );
}
