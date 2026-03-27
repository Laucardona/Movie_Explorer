import { getShows, searchShows } from "./service.js";
import {
    loadInitialState,
    addFavoritePersist,
    removeFavoritePersist,
    saveSearchPersist
} from "./persistence.js";

import {
    setState,
    setShows,
    getState
} from "./state.js";

import {
    renderShows,
    renderFavorites,
    showMessage
} from "./ui.js";

// 📌 Elementos del DOM
const container = document.getElementById("app");
const favoritesContainer = document.getElementById("favorites");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("btnSearch");


// 🚀 INIT
async function init() {
    const initial = loadInitialState();
    setState(initial);

    const shows = await getShows();
    setShows(shows.slice(0, initial.itemsPerPage));

    renderShows(container);
    renderFavorites(favoritesContainer, initial.favorites);
}


// 🔍 BUSCAR
searchBtn.addEventListener("click", async () => {
    const query = searchInput.value;

    const result = saveSearchPersist(query);
    showMessage(result.message);

    const shows = await searchShows(query);
    setShows(shows);

    renderShows(container);
});


// ❤️ FAVORITOS (delegación)
container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = e.target.dataset.id;

        const state = getState();
        const show = state.shows.find(s => s.id == id);

        if (!show) return;

        const result = addFavoritePersist(show);
        showMessage(result.message);

        // actualizar favoritos en pantalla
        const newFavorites = loadInitialState().favorites;
        renderFavorites(favoritesContainer, newFavorites);
    }
});


// ❌ ELIMINAR FAVORITO
favoritesContainer.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        const id = e.target.dataset.id;

        const result = removeFavoritePersist(id);
        showMessage(result.message);

        const newFavorites = loadInitialState().favorites;
        renderFavorites(favoritesContainer, newFavorites);
    }
});


init();