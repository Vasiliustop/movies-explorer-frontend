import React from "react";


export default function SearchForm({ onSubmitSearch, short, handleShort, handleChange, inputSearch }) {
 



  return (
    <form className="search-form" noValidate onSubmit={onSubmitSearch}>
      <fieldset className="form__container">
        <input className="search-form__input" placeholder="Фильм" required name="searchinput" onChange={handleChange}
          value={inputSearch || ''} />
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </fieldset>
      <label className="checkbox__label">
        <input className="checkbox" type="checkbox"  
        checked={short}
        onChange={handleShort} />
        <span className="checkbox__pseudo"></span>
        Короткометражки
      </label>
    </form>
  );
}
