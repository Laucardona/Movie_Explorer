export const state = {
  movies: [],
  page: 1,
  query: ""
};

export function setState(newState) {
  Object.assign(state, newState);
}