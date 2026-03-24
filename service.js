const BASE_URL = "https://api.tvmaze.com";


export async function getShows() {
    try {
        const response = await fetch(`${BASE_URL}/shows`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener shows:", error);
        return [];
    }
}


export async function searchShows(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/shows?q=${query}`);
        const data = await response.json();


        return data.map(item => item.show);
    } catch (error) {
        console.error("Error en búsqueda:", error);
        return [];
    }
}

  
export async function getShowById(id) {
    try {
        const response = await fetch(`${BASE_URL}/shows/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener detalle:", error);
        return null;
    }
}