import { useState, useEffect, useContext } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "./../Footer/Footer";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useLocation } from "react-router-dom";
export default function Movies({ loading }) {
  const {
    cards,
    handlerSearchForm,
    searchForm,
    searchFormDirty,
    searchFormError,
    setFormValid,
    formValid,
    handleSearchCard,
    setCards,
    setSearchInput,
    setSearchForm,
    handleCardLike,
    savedCards,
    getSavedCard,
  } = useContext(CurrentUserContext);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  const [movies, setMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [idx, setIdx] = useState(0);
  const [countMoviesWindow, setCountMoviesWindow] = useState(0);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  function updateWindowWidth() {
    setWinWidth(window.innerWidth);
  }

  function filterMovies(unmovies) {
    const searchRequestData = JSON.parse(localStorage.searchRequest);
    const checkBoxState = searchRequestData.checkBox;
    const request = searchRequestData.request;
    return unmovies.filter((movie) => {
      if (checkBoxState === true) {
        return (
          movie.duration <= 40 &&
          movie.nameRU.toLowerCase().includes(request.toLowerCase())
        );
      } else {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
      }
    });
  }

  function getMoviesFromLocalStorage() {
    if (localStorage.getItem("searchRequest") !== null) {
      const searchRequestData = JSON.parse(localStorage.searchRequest);
      const movies = filterMovies(searchRequestData.movies);
      setMovies(movies);
    } else {
      return;
    }
  }

  function handleSearchSubmit(moviesFromApi) {
    const movies = filterMovies(moviesFromApi);
    setRenderedMovies([]);
    setMovies(movies);
    setIdx(0);
  }

  function renderMovies() {
    if (winWidth > 1154) {
      setIdx((prev) => prev + 3);
    } else if (winWidth < 768) {
      setIdx((prev) => prev + 2);
    }
    const moviesToRender = movies.slice(
      renderedMovies.length,
      countMoviesWindow + idx
    );
    setRenderedMovies([...renderedMovies, ...moviesToRender]);
  }
  useEffect(() => {
    if (winWidth > 1150) {
      setCountMoviesWindow(12);
    }
    if (winWidth < 1150) {
      setCountMoviesWindow(8);
    }
    if (winWidth < 767) {
      setCountMoviesWindow(5);
    }
  }, [winWidth]);

  useEffect(() => {
    renderMovies();
  }, [movies]);

  useEffect(() => {
    getMoviesFromLocalStorage();
    renderMovies();
    return () => {
      setMovies([]);
      setRenderedMovies([]);
    };
  }, []);

  return (
    <section className="movies">
      <SearchForm
        setRenderedMovies={setRenderedMovies}
        setSearchForm={setSearchForm}
        handleSearchSubmit={handleSearchSubmit}
        setSearchInput={setSearchInput}
        cards={cards}
        handlerSearchForm={handlerSearchForm}
        searchForm={searchForm}
        searchFormDirty={searchFormDirty}
        searchFormError={searchFormError}
        setFormValid={setFormValid}
        formValid={formValid}
        setCards={setCards}
        handleSearchCard={handleSearchCard}
      />

      <MoviesCardList
        getSavedCard={getSavedCard}
        savedCards={savedCards}
        handleCardLike={handleCardLike}
        cards={renderedMovies}
        loading={loading}
      />

      {Boolean(
        (location.pathname === "/movies") &
          (filterMovies.length > renderMovies.length)
      ) && (
        <button
          type="button"
          className="movies__next-button"
          onClick={renderMovies}
        >
          Ещё
        </button>
      )}

      <Footer />
    </section>
  );
}
