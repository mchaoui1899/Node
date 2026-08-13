import {fetchMovies} from "./fetchMovies";
import "dotenv/config";

fetchMovies().then((movies) => console.log(JSON.stringify(movies, null, 2))).catch((err) => console.error(err));

