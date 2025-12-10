import { useEffect, useState } from "react";

const API_KEY = "VaAVtLcJcnpvF7KPI7vMdGbg1UJ04sK4"; // Not used env because of errors and for testing only
const BASE_URL = "https://api.giphy.com/v1/gifs";

async function giphyFetch(endpoint, params = "") {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Giphy API Fetch Error:", error);
    throw error;
  }
}


export async function searchGifs(query, limit = 24) {
  if (!query) return [];
  const params = `&q=${encodeURIComponent(query)}&limit=${limit}`;
  const data = await giphyFetch("/search", params);
  return data.data || [];
}

export async function getRandomGif() {
  const data = await giphyFetch("/random");
  return data.data;
}


export function useTrendingGifs(limit = 24) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const data = await giphyFetch(`/trending`, `&limit=${limit}`);
        setGifs(data.data || []);
      } catch (e) {
        setError(e.message || "Failed to fetch trending GIFs.");
        setGifs([]); // Clear GIFs on error
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, [limit]);

  return { gifs, loading, error }; // Expose error state
}