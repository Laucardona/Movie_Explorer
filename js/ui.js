import { getState } from "./state.js";

export function renderShows(container) {
    const { shows } = getState();

    container.innerHTML = "";

    shows.forEach(show => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${show.name}</h3>
            <img src="${show.image?.medium || ''}" />
            <button data-id="${show.id}">❤️ Favorito</button>
        `;

        container.appendChild(div);
    });
}

export function renderFavorites(container, favorites) {
    container.innerHTML = "";

    favorites.forEach(show => {
        const div = document.createElement("div");

        div.innerHTML = `
            <span>${show.name}</span>
            <button data-id="${show.id}">❌</button>
        `;

        container.appendChild(div);
    });
}

export function showMessage(msg) {
    alert(msg);
}