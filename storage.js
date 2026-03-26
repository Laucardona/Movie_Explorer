const KEYS = {
    FAVORITES: "favorites",
    SEARCH_HISTORY: "search_history",
    ITEMS_PER_PAGE: "items_per_page"
};

export function getFavorites() {
    const data = localStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
}


export function addFavorite(show) {
    const favorites = getFavorites();

    const exists = favorites.some(fav => fav.id === show.id);
    if (!exists) {
        favorites.push(show);
        saveFavorites(favorites);
    }
}

export function removeFavorite(id) {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.id !== id);
    saveFavorites(updated);
}

export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
}


export function getSearchHistory() {
    const data = localStorage.getItem(KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
}

export function saveSearchHistory(history) {
    localStorage.setItem(KEYS.SEARCH_HISTORY, JSON.stringify(history));
}

export function addSearch(query) {
    let history = getSearchHistory();

    
    history = history.filter(item => item !== query);

    
    history.unshift(query);

  
    if (history.length > 5) {
        history.pop();
    }

    saveSearchHistory(history);
}

export function getItemsPerPage() {
    const value = localStorage.getItem(KEYS.ITEMS_PER_PAGE);
    return value ? parseInt(value) : 10;
}

export function setItemsPerPage(value) {
    localStorage.setItem(KEYS.ITEMS_PER_PAGE, value);
}