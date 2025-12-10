import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs";

function buildUrl(path, params = {}) {
  const url = new URL(path, BASE_URL);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

export function useTrendingGifs(limit = 24) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoading(true);
        setError("");
        const url = buildUrl("/trending", { limit });
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch trending gifs");
        const data = await res.json();
        setGifs(data.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching trending gifs");
      } finally {
        setLoading(false);
      }
    }

    if (!API_KEY) {
      setError("Missing GIPHY API key. Set VITE_GIPHY_API_KEY in your .env file.");
      setLoading(false);
      return;
    }

    fetchTrending();
  }, [limit]);

  return { gifs, loading, error };
}

export async function searchGifs(query, limit = 24) {
  if (!API_KEY) {
    throw new Error("Missing GIPHY API key. Set VITE_GIPHY_API_KEY in your .env file.");
  }
  const url = buildUrl("/search", { q: query, limit });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to search gifs");
  const data = await res.json();
  return data.data || [];
}
