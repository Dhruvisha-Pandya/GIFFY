const STORAGE_KEY = "favourite_gifs";

export function getFavourites() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveFavourites(list) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function toggleFavouriteForGif(gif) {
  const favs = getFavourites();
  const idx = favs.findIndex((f) => f.id === gif.id);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    const imageUrl =
      gif.images?.fixed_width?.url ||
      gif.images?.downsized_medium?.url ||
      gif.images?.original?.url;
    favs.push({
      id: gif.id,
      title: gif.title || "GIF",
      url: imageUrl,
    });
  }
  saveFavourites(favs);
  return favs;
}
