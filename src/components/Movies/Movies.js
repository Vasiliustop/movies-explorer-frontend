import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "./../Footer/Footer";
import Preloader from "./Preloader/Preloader";
import * as MoviesApi from "../../utils/MoviesApi";
import { UseFilterMovies } from "../UseFilterMovies.js";
import { useScreenWidthBinding } from '../useScreenWidthBinding';

export default function Movies({
  
  loggedIn,
  savedMovies,
  onMovieSave,
  isMenuOpen,
  onClicOpen,
  onClicPopupOpen,
  onClickCloseMenu,
}) {

  const [beatFilmMovies, setBeatFilmMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    filterMovies,
  } = UseFilterMovies(beatFilmMovies, 'beatFilm', false, getMoviesBeatfilm)


  useEffect(() => {
    setSearchError(false);
    if (localStorage.getItem("filmMovies")) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem("filmMovies")));
    }
  }, []);

  function getMoviesBeatfilm() {
    if (localStorage.getItem("filmMovies")) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem("filmMovies")));
      filterMovies(
        JSON.parse(localStorage.getItem("filmMovies")),
        inputSearch,
        short
      );
    } else {
      MoviesApi.getInitialMovies()
        .then((data) => {
          setBeatFilmMovies(data);
          localStorage.setItem("filmMovies", JSON.stringify(data));
          filterMovies(data, inputSearch, short);
        })
        .catch((err) => {
          setSearchError(true);
          console.log(err);
        });
    }
  }

  const location = useLocation();

  const {
    displayedMovies,
    displayMoreMovies,
  } = useScreenWidthBinding(filteredMovies)


  return (
    <section className="movies">
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
   
        <MoviesCardList
          short={short}
          movies={filteredMovies}
          savedMovies={savedMovies}
          onMovieSave={onMovieSave}
          showPreloader={showPreloader}
          searchError={searchError}
          onClicPopupOpen={onClicPopupOpen}
          isSaved={false}
          displayedMovies={displayedMovies}
        />
     

     {Boolean(location.pathname === '/movies' & (filteredMovies.length > displayedMovies.length)) &&
          <button type="button"
            className="movies__next-button"
            onClick={displayMoreMovies}
          >Ещё</button>
        }
<Footer />
    </section>
  );
}
