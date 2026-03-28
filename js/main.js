import { getMovies } from "./service.js";
import { renderMovies } from "./ui.js";
import { state, setState } from "./state.js";

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

async function loadMovies() {
  try {
    const movies = await getMovies(state.query);

    console.log("PELÍCULAS:", movies); // 👈 para verificar

    setState({ movies });

    renderMovies(movies);

  } catch (error) {
    console.error("Error cargando películas:", error);
  }
}

// 🔍 BUSCADOR
function handleSearch(e) {
  e.preventDefault();

  const query = input.value.trim();

  setState({ query });

  loadMovies();
}

// 🚀 INICIO
function init() {
  if (form) {
    form.addEventListener("submit", handleSearch);
  }

  loadMovies(); // carga inicial
}

init();