import dotenv from 'dotenv' ;
import path from 'path' ; 

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


export const fetchMovies = async () => {
  const apiKey=process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("❌ La clé TMDB_API_KEY est introuvable dans process.env");
    return;
  }
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&page=1`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Nombre total de résultats:', data.total_results);
    console.log('Nombre total de pages:', data.total_pages);
    console.log('Films sur cette page:', data.results.length);
    console.log('Premier film exemple:', data.results[0]);

    
    
    return data.results;

  } catch (error) {
    console.error("Erreur lors du fetch TMDB:", error);
    throw error;
  }
};
fetchMovies() ;   