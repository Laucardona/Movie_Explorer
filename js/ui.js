import { toggleFavorite, getFavorites } from "./storage.js";

const grid = document.getElementById("moviesGrid");

export function renderMovies(movies) {
  if (!grid) return;

  grid.innerHTML = "";

  const favs = getFavorites();

  movies.forEach(m => {
    const isFav = favs.some(f => f.id === m.id);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${m.image}">
      <div class="card-overlay">
        <h3>${m.title}</h3>
        <div class="rating">⭐ ${m.rating}</div>

        <div class="card-buttons">
          <button class="btn-fav">${isFav ? "💛" : "🤍"}</button>
        </div>
      </div>
    `;

    card.querySelector(".btn-fav").addEventListener("click", () => {
      toggleFavorite(m);
      renderMovies(movies);
    });

    grid.appendChild(card);
  });
}