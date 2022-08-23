import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

export default function MoviesCard({ card, handleCardLike }) {
  const { currentUser, savedCards, deleteCard } =
    useContext(CurrentUserContext);

  const location = useLocation();

  const isSaved = savedCards.some((elem) =>
    currentUser.id === elem.owner ? elem.movieId === card.id : false
  );

  const cardLike = `card__like ${isSaved && "card__like_active"}`;

  function handleSaveClick(savedCard) {
    handleCardLike(savedCard);
  }

  function handleDelClick(card) {
    deleteCard(card);
  }

  return (
    <li className="card-movies" key={card.id || card.moviesId}>
      <div className="card-movies__description">
        <div className="card-movies__rows">
          <p className="card-movies__name">{card.nameRU}</p>

          {location.pathname === "/movies" && (
            <button
              type="button"
              className={cardLike}
              onClick={() => {
                handleSaveClick(card);
              }}
            ></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button
              type="button"
              className="card__like card__like_inactive"
              onClick={() => handleDelClick(card)}
            ></button>
          )}
        </div>

        <p className="card-movies__length">{(card.duration > 60) ? `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м` : `${card.duration} минут`}</p>
      </div>

      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={
            card.thumbnail
              ? card.thumbnail
              : `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`
          }
          alt="card.nameRU"
          className="card-movies__image"
        />
      </a>
    </li>
  );
}
