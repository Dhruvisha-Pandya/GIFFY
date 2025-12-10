import axios from "axios";

const GIPHY_API_KEY = "GIVGYHkr3WSBnllca54iNt0yFbjz7L65";

export async function fetchTrending(limit = 24) {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${limit}`;
  return (await axios.get(url)).data.data;
}

export async function searchGifs(queryText, limit = 24) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(queryText)}&limit=${limit}`;
  return (await axios.get(url)).data.data;
}

export async function fetchRandom(tag = "") {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`;
  return (await axios.get(url)).data.data;
}

