import React, { useState } from "react";

export default function MoviesCard({ isSaved, movie }) {
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteToogle() {
    setFavorite(!favorite);
  }

  return (
    <li className="card-movies" key={movie.id}>
      <div className="card-movies__description">
        <div className="card-movies__rows">
          <p className="card-movies__name">{movie.nameRU}</p>
          {!isSaved ? (
            <button
              className={`card__like card__like${
                favorite ? "_inactive" : "_active"
              }`}
              onClick={handleFavoriteToogle}
              type="button"
            ></button>
          ) : (
            <button className="card__like"></button>
          )}
        </div>
        <p className="card-movies__length">{movie.duration}</p>
      </div>
      <img className="card-movies__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
    </li>
  );
}
