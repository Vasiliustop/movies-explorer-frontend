import { useState, useEffect } from 'react';

export function UseFilterMovies(movies, initialStateRender, getFilm) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [short, setShort] = useState(false);

  useEffect(() => {
    console.log("useEffect")
    updateFilteredMovies(JSON.parse(localStorage.getItem("filmFilteredMovies") || '[]'));
    updateInputSearch(localStorage.getItem("filmInputSearch") || '');
    updateShort(JSON.parse(localStorage.getItem("filmShort")));
  }, []);

  function updateFilteredMovies(filteredMovies) {
    setFilteredMovies(filteredMovies);
    localStorage.setItem("filmFilteredMovies", JSON.stringify(filteredMovies));
  }

  function updateInputSearch(inputSearch) {
    setInputSearch(inputSearch);
    localStorage.setItem("filmInputSearch", inputSearch);
  }

  function updateShort(short) {
    setShort(short);
    localStorage.setItem("filmShort", JSON.stringify(short));
  }

  function handleInputChange(evt) {
    updateInputSearch(evt.target.value.toLowerCase());
  }
  
  function filterMovies(movies, input, shortCheck) {
    if (input.length === 0 && !initialStateRender) {
      !initialStateRender && updateFilteredMovies([]);
    } else {
      
      updateFilteredMovies(movies
        .filter(({
          nameRU,
          duration,
        }) => (nameRU.toLowerCase().includes(input))
          & (!shortCheck || duration <= 40)))
    }
  }

  function handleSwitchShort(evt) {
    const inputShortCheckBox = evt.target.checked;
    updateShort(inputShortCheckBox);
    filterMovies(movies, inputSearch, inputShortCheckBox);
  }

  function onSubmitSearch(evt) {
    evt.preventDefault();
    if (!initialStateRender) {
      getFilm();
    } else {
      filterMovies(movies, inputSearch, short);
      
    }

  }

  return {
    short,
    filteredMovies,
    setFilteredMovies,
    inputSearch,
    setInputSearch,
    setShort,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies,
    filterMovies,
  }
}