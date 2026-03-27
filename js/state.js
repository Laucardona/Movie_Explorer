let state = {
    shows: [],
    favorites: [],
    searchHistory: [],
    itemsPerPage: 10,
    currentPage: 1
};

export function setState(newState) {
    state = { ...state, ...newState };
}

export function getState() {
    return state;
}

export function setShows(shows) {
    state.shows = shows;
}

export function setPage(page) {
    state.currentPage = page;
}