

export const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.results;

  } catch (error) {
    console.error("Erreur lors du fetch TMDB:", error);
    throw error;
  }
};