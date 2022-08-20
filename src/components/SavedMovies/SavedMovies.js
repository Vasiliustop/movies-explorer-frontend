import React, { useEffect } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { UseFilterMovies } from "../UseFilterMovies";

export default function SavedMovies({
  isSaved,
  loggedIn,
  movies,
  isMenuOpen,
  onClicOpen,
  onMovieDel,
  showPreloader,
  getMovies,
  isSearchError,
  onClicPopupOpen,
  onClickCloseMenu,
}) {
  const {
    short,
    setShort,
    filteredMovies,
    updateFilteredMovies,
    inputSearch,
    setInputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
  } = UseFilterMovies(movies, "saved", true);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    updateFilteredMovies(movies);
    setShort(false);
    setInputSearch("");
  }, [movies]);

  return (
    <section className="saved-movies">
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        movies={filteredMovies}
        short={short}
        onMovieDel={onMovieDel}
        showPreloader={showPreloader}
        isSearchError={isSearchError}
        onClicPopupOpen={onClicPopupOpen}
        isSaved={true}
      />
      <Footer />
    </section>
  );
}
