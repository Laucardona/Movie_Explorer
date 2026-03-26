import {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getSearchHistory,
    addSearch,
    clearSearchHistory,
    getItemsPerPage,
    setItemsPerPage
} from "./storage.js";


export function loadInitialState() {
    return {
        favorites: getFavorites(),
        searchHistory: getSearchHistory(),
        itemsPerPage: getItemsPerPage()
    };
}


export function addFavoritePersist(show) {
    if (!show || !show.id) {
        return { success: false, message: "Serie inválida" };
    }

    if (isFavorite(show.id)) {
        return { success: false, message: "Ya está en favoritos" };
    }

    addFavorite(show);

    return { success: true, message: "Agregado a favoritos" };
}


export function removeFavoritePersist(id) {
    if (!id) {
        return { success: false, message: "ID inválido" };
    }

    if (!isFavorite(id)) {
        return { success: false, message: "No está en favoritos" };
    }

    removeFavorite(id);

    return { success: true, message: "Eliminado de favoritos" };
}


export function saveSearchPersist(query) {
    if (!query || !query.trim()) {
        return { success: false, message: "Búsqueda vacía" };
    }

    const cleanQuery = query.trim().toLowerCase();

    addSearch(cleanQuery);

    return {
        success: true,
        message: "Búsqueda guardada",
        history: getSearchHistory()
    };
}


export function clearSearchPersist() {
    clearSearchHistory();

    return {
        success: true,
        message: "Historial eliminado"
    };
}


export function changeItemsPerPagePersist(value) {
    const validValues = [10, 20, 50];
    const parsed = Number(value);

    if (!validValues.includes(parsed)) {
        return {
            success: false,
            message: "Valor no permitido (10, 20, 50)"
        };
    }

    setItemsPerPage(parsed);

    return {
        success: true,
        message: "Items por página actualizados",
        itemsPerPage: getItemsPerPage()
    };
}


export function getFavoritesPersist() {
    return getFavorites();
}

export function getSearchHistoryPersist() {
    return getSearchHistory();
}

export function getItemsPerPagePersist() {
    return getItemsPerPage();
}
