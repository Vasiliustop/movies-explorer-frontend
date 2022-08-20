import { useLocation } from "react-router-dom";
import MoviesCard from "./../MoviesCard/MoviesCard";


export default function MoviesCardList({
  movies,
  savedMovies,
  onMovieSave,
  onMovieDel,
  showPreloader,
  isSearchError,
  onClicPopupOpen,
  inputSearch,
  displayedMovies 
}) {
  const location = useLocation();

  return (
    <ul className="movies-list">
      {location.pathname === "/movies" &&
        displayedMovies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            savedMovies={savedMovies}
            onMovieSave={onMovieSave}
            onMovieDel={onMovieDel}
            onClicPopupOpen={onClicPopupOpen}
          />
        ))}
      {location.pathname === "/saved-movies" &&
        movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            onMovieSave={onMovieSave}
            onMovieDel={onMovieDel}
            onClicPopupOpen={onClicPopupOpen}
          />
        ))}
    </ul>
  );
}
