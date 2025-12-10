export default function GifCard({ gif }) {
  const imageUrl =
    gif.images?.fixed_width?.url || gif.images?.downsized_medium?.url;
  const title = gif.title || "GIF";

  return (
    <div className="gif-card">
      {imageUrl && <img src={imageUrl} alt={title} className="gif-img" />}
      <div className="gif-card-footer">
        <span className="gif-title" title={title}>
          {title}
        </span>
      </div>
    </div>
  );
}
