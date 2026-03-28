const BASE_URL = "https://api.tvmaze.com";

export async function getMovies(query = "") {
  try {
    let url = "";

    if (query) {
      url = `${BASE_URL}/search/shows?q=${query}`;
    } else {
      url = `${BASE_URL}/shows`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error("Error en API");

    const data = await res.json();

    // 🔥 IMPORTANTE: TVMaze devuelve diferente estructura
    const shows = query ? data.map(d => d.show) : data;

    return shows.map(s => ({
      id: s.id,
      title: s.name,
      image: s.image?.medium || "https://via.placeholder.com/300x450",
      rating: s.rating?.average || "N/A",
      genres: s.genres
    }));

  } catch (error) {
    console.error("ERROR:", error);
    return [];
  }
}