import React from "react";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "./../Footer/Footer";
import Preloader from "./Preloader/Preloader";
import * as MoviesApi from "../../utils/MoviesApi"
import { UseFilterMovies } from '../UseFilterMovies.js';

export default function Movies({ loggedIn,
  savedMovies,
  onMovieSave,
  isMenuOpen,
  onClicOpen,
  onClicPopupOpen,
  onClickCloseMenu }) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [beatFilmMovies, setBeatFilmMovies] = useState([]);
  const [showPreloader, setShowPreloader] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    filterMovies,
  } = UseFilterMovies(beatFilmMovies, false, getMoviesBeatfilm);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(!isLoading), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsSearchError(false);
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies((JSON.parse(localStorage.getItem('beatFilmMovies'))));
    }
  }, [])


  function getMoviesBeatfilm() {
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
      filterMovies(JSON.parse(localStorage.getItem('beatFilmMovies')), inputSearch, short)
    } else {
      
      MoviesApi
      .getInitialMovies()
        .then(data => {
          setBeatFilmMovies(data);
          localStorage.setItem('beatFilmMovies', JSON.stringify(data));
          filterMovies(data, inputSearch, short);
          
        }
        ).catch(err => {
          setIsSearchError(true);
          console.log(err)
        })
        
    }
  }


  return (
    <section className="movies">
      <SearchForm  
         onSubmitSearch={onSubmitSearch}
         short={short}
         handleChange={handleInputChange}
         handleShort={handleSwitchShort}
         inputSearch={inputSearch}  />
      {!isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList   short={short}
        movies={filteredMovies}
        savedMovies={savedMovies}
        onMovieSave={onMovieSave}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
        onClicPopupOpen={onClicPopupOpen}
        isSaved={false} 
        />
      )}

      <button className="movies__next-button">Ещё</button>
      <Footer />
    </section>
  );
}
