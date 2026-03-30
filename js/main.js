import { getMovies } from "./service.js";
import { renderMovies } from "./ui.js";
import { state, setState } from "./state.js";
import { getFavorites } from "./storage.js";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");


async function loadMovies() {
  try {
    const movies = await getMovies(state.query);

    setState({ movies, page: 1 });

    renderMoviesPaginated();

  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}

function renderMoviesPaginated() {
  const start = (state.page - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;

  const paginated = state.movies.slice(start, end);

  renderMovies(paginated);
  renderPagination();
}

function renderPagination() {
  let pagination = document.getElementById("pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.classList.add("pagination");
    document.body.appendChild(pagination);
  }

  const totalPages = Math.ceil(state.movies.length / state.itemsPerPage);

  pagination.innerHTML = `
    <div class="pagination-controls">
      <button id="prevBtn" ${state.page === 1 ? "disabled" : ""}>⬅</button>

      <span class="page-indicator">
        Página ${state.page} de ${totalPages || 1}
      </span>

      <button id="nextBtn" ${state.page === totalPages ? "disabled" : ""}>➡</button>
    </div>

    <div class="per-page">
      Mostrar por página:
      <button data-size="10" class="${state.itemsPerPage === 10 ? "active" : ""}">10</button>
      <button data-size="20" class="${state.itemsPerPage === 20 ? "active" : ""}">20</button>
      <button data-size="50" class="${state.itemsPerPage === 50 ? "active" : ""}">50</button>
    </div>
  `;

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (state.page > 1) {
      setState({ page: state.page - 1 });
      renderMoviesPaginated();
    }
  });


  document.getElementById("nextBtn").addEventListener("click", () => {
    if (state.page < totalPages) {
      setState({ page: state.page + 1 });
      renderMoviesPaginated();
    }
  });

  
  document.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      const size = Number(btn.dataset.size);

      setState({
        itemsPerPage: size,
        page: 1
      });

      renderMoviesPaginated();
    });
  });
}


function handleSearch(e) {
  e.preventDefault();

  const query = input.value.trim();

  setState({ query, page: 1 });

  loadMovies();
}


function init() {
  if (form) {
    form.addEventListener("submit", handleSearch);
  }

  loadMovies();
}

init();

const btnInicio = document.getElementById("btnInicio");
const btnPopulares = document.getElementById("btnPopulares");
const btnFavoritos = document.getElementById("btnFavoritos");
const themeToggle = document.getElementById("themeToggle");


btnInicio.addEventListener("click", (e) => {
  e.preventDefault();

  setState({ query: "", page: 1 });
  loadMovies();
});


btnPopulares.addEventListener("click", (e) => {
  e.preventDefault();

  setState({ query: "popular", page: 1 });
  loadMovies();
});


btnFavoritos.addEventListener("click", (e) => {
  e.preventDefault();

  const favs = getFavorites();

  renderMovies(favs);
});

let isLight = localStorage.getItem("theme") === "light";

if (isLight) {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  isLight = !isLight;

  localStorage.setItem("theme", isLight ? "light" : "dark");

  themeToggle.textContent = isLight ? "☀️" : "🌙";
});