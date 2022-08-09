import React from "react";

export default function SearchForm() {
  return (
    <form className="search-form">
      <fieldset className="form__container">
        <input className="search-form__input" placeholder="Фильм" />
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </fieldset>
      <label className="checkbox__label">
        <input className="checkbox" type="checkbox" />
        <span className="checkbox__pseudo"></span>
        Короткометражки
      </label>
    </form>
  );
}
