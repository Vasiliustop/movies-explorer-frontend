import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../../context/CurrentUserContext';


export default function SearchForm({   handleSearchSubmit,
  handlerSearchForm,
  searchForm,
  searchFormDirty,
  searchFormError,
  setFormValid,
  cards,
  setSearchInput,
  setSearchForm, }) {
 
    const location = useLocation();
    const { setSearchFormDirty } = useContext(CurrentUserContext);
  
    const [statusCheckBox, setStatusCheckBox] = useState(false);
    useEffect(() => {
      setSearchForm('');
      setSearchFormDirty(false);
      getStatusCheckBoxAndInput();
    }, []);
  
    function getStatusCheckBoxAndInput() {
      if (location.pathname === '/movies') {
        if (localStorage.getItem('checkBox') !== null) {
          const status = JSON.parse(localStorage.checkBox)
          setStatusCheckBox(status.checkBox)
        }
        if (localStorage.getItem('searchForm') !== null) {
          const text = JSON.parse(localStorage.searchForm)
          setSearchForm(text.searchForm)
        }
        return;
      }
      if (location.pathname === '/saved-movies') {
        localStorage.setItem('searchRequestSavedMovies', JSON.stringify({ "checkBox": false, "request": '', "movies": cards }))
        setStatusCheckBox(false)
        setSearchForm('')
      }
      return;
    }

    function soldCheckBox(e) {
      if (location.pathname === '/movies') {
        const statusCheckBox = e.target.checked;
        localStorage.setItem('checkBox', JSON.stringify({ "checkBox": statusCheckBox }))
        setStatusCheckBox(statusCheckBox)
      }
      if (location.pathname === '/saved-movies') {
        setStatusCheckBox(e.target.checked)
      }
    }
  
    function handleSumbit(e) {
      e.preventDefault();
      if (location.pathname === '/movies') {
        setSearchInput(searchForm);
        localStorage.setItem('searchRequest', JSON.stringify({ "checkBox": statusCheckBox, "request": searchForm, "movies": cards }))
        handleSearchSubmit(cards, location.pathname);
      }
      if (location.pathname === '/saved-movies') {
        setSearchInput(searchForm);
        localStorage.setItem('searchRequestSavedMovies', JSON.stringify({ "checkBox": statusCheckBox, "request": searchForm, "movies": cards }))
      }
    }

    useEffect(() => {
      if (searchFormError) {
        setFormValid(false)
      } else { setFormValid(true) }
    }, [searchFormError, setFormValid])


  return (
    <form className="search-form" noValidate onSubmit={handleSumbit}>
      <fieldset className="form__container">
        <input className="search-form__input" placeholder="Фильм" required name="searchinput" onChange={(e) => { handlerSearchForm(e, location.pathname) }}
          value={searchForm}/>
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </fieldset>
      <label className="checkbox__label">
        <input checked={statusCheckBox} onChange={(e) => { soldCheckBox(e) }} id='searchShortMovies' type="checkbox"  className="checkbox" />
        <span className="checkbox__pseudo"></span>
        Короткометражки
      </label>
    </form>
  );
}
