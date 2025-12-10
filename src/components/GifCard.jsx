export default function GifCard({ gif, isFavourite, onToggleFavourite }) {
  const imageUrl =
    gif.images?.fixed_width?.url ||
    gif.images?.downsized_medium?.url ||
    gif.images?.original?.url;

  const title = gif.title || "GIF";

  return (
    <div className="gif-card">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="gif-img" loading="lazy" />
      )}
      <div className="gif-card-footer">
        <span className="gif-title" title={title}>
          {title}
        </span>
        <button
          className={`fav-button ${isFavourite ? "fav-active" : ""}`}
          onClick={() => onToggleFavourite(gif)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <span>{isFavourite ? "★" : "☆"}</span>
        </button>
      </div>
    </div>
  );
}
