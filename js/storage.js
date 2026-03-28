const KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function toggleFavorite(movie) {
  let favs = getFavorites();

  const exists = favs.find(f => f.id === movie.id);

  if (exists) {
    favs = favs.filter(f => f.id !== movie.id);
  } else {
    favs.push(movie);
  }

  localStorage.setItem(KEY, JSON.stringify(favs));
}