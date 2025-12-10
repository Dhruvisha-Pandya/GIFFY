export default function GifCard({ gif, onSave, onRemove, saved }) {
  const url =
    gif.images?.fixed_height?.url || gif.images?.original?.url || gif.url;

  return (
    <div style={{ border: "1px solid #eee", padding: 8, borderRadius: 8, textAlign: "center" }}>
      <img src={url} alt={gif.title} style={{ width: "100%", borderRadius: 6 }} />
      <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
        {!saved && onSave && <button onClick={() => onSave(gif)}>Save</button>}
        {saved && onRemove && <button onClick={() => onRemove(saved.id)}>Remove</button>}
        <a href={gif.url || url} target="_blank" rel="noreferrer">Open</a>
      </div>
    </div>
  );
}
