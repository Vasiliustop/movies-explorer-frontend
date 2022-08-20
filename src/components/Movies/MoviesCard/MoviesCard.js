import React, { useState } from "react";
import { useLocation } from "react-router-dom";


export default function MoviesCard({ movie, savedMovies, onMovieSave, onMovieDel, onClicPopupOpen }) {


  const isSaved = savedMovies?.some(i => i.movieId === movie.id)

const location = useLocation();


function handleSaveClick() {
  onMovieSave(movie);
}

function handleDelClick() {
  onMovieDel(movie);
}

function handlePopupOpen() {
  onClicPopupOpen(movie)
}

const cardLikeButtonClassName = `card__like ${
  isSaved ? "card__like_active" : ""
}`;



  return (
    <li className="card-movies" key={movie.id}>
      <div className="card-movies__description">
        <div className="card-movies__rows">
          <p className="card-movies__name">{movie.nameRU}</p>
          {location.pathname === "/movies" ? (
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleSaveClick}
        />
      ) : (
        <button
          aria-label="Delete"
          type="button"
          className="card__like card__like_inactive"
          onClick={handleDelClick}
        />
      )}
    </div>
        <p className="card-movies__length">{movie.duration}</p>
      </div>
      
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">    
       {location.pathname === "/movies" ? (
          <img
            className="card-movies__image"
            alt={movie.nameRU}
            src={`https://api.nomoreparties.co${movie.image.url}`}
          />
        ) : (
          <img
            className="card-movies__image"
            alt={movie.nameRU}
            src={movie.image}
          />
        )}</a>
    </li>
  );
}
