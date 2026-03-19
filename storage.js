
const STORAGE_KEYS = {
    FAVORITES: "movieExplorer_favorites",
    SEARCH_HISTORY: "movieExplorer_search_history",
    ITEMS_PER_PAGE: "movieExplorer_items_per_page"
};



export function getFavorites() {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

export function addFavorite(show) {
    const favorites = getFavorites();

    
    const exists = favorites.some(fav => fav.id === show.id);
    if (exists) return;

    favorites.push(show);
    saveFavorites(favorites);
}

export function removeFavorite(id) {
    const favorites = getFavorites().filter(fav => fav.id !== id);
    saveFavorites(favorites);
}

export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
}


export function getSearchHistory() {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
}

export function saveSearchHistory(history) {
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
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

export function clearSearchHistory() {
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
}


export function getItemsPerPage() {
    const data = localStorage.getItem(STORAGE_KEYS.ITEMS_PER_PAGE);
    return data ? parseInt(data) : 10; 
}

export function setItemsPerPage(value) {
    localStorage.setItem(STORAGE_KEYS.ITEMS_PER_PAGE, value);
}
