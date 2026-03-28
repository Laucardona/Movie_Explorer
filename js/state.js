export const state = {
  movies: [],
  page: 1,
  query: "",
  itemsPerPage: 10 
};

export function setState(newState) {
  Object.assign(state, newState);
}