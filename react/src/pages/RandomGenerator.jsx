import { useState } from "react";
import GifCard from "../components/GifCard";
import { fetchRandom } from "../api";
import { addFavorite } from "../services/favorites";

export default function RandomGenerator({ user }) {
  const [gif, setGif] = useState(null);
  const [tag, setTag] = useState("");

  async function genRandom() {
    setGif(await fetchRandom(tag));
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Random GIF Generator</h2>
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="tag (optional)"
      />
      <button onClick={genRandom}>Generate</button>
      {gif && (
        <GifCard
          gif={gif}
          onSave={user ? (gif) => addFavorite(user.uid, gif) : null}
        />
      )}
    </div>
  );
}
