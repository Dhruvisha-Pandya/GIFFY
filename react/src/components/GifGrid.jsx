import GifCard from "./GifCard.jsx";

export default function GifGrid({ gifs }) {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
}
