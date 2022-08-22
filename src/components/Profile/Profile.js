import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Profile({ onLogout, onSubmit, currentUser }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (userName === currentUser.name && userEmail === currentUser.email) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userName, userEmail, currentUser.name, currentUser.email]);

  function handleChangeName(evt) {
    const input = evt.target;
    setUserName(input.value);
  }

  function handleChangeEmail(evt) {
    const input = evt.target;
    setUserEmail(input.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email: userEmail, name: userName });
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="profile">
        <h3 className="profile__title">Привет, {userName}!</h3>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              type="text"
              required
              value={userName || ""}
              onChange={handleChangeName}
              pattern="[a-zA-Zа-яА-ЯёЁ\- ]{2,}"
            />
          </label>

          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              pattern="\S+@\S+\.\S+"
              name="email"
              type="text"
              required
              value={userEmail || ""}
              onChange={handleChangeEmail}
            />
          </label>

          <button type="submit" className="profile__button" disabled={disabled}>
            Редактировать
          </button>
        </form>

        <button className="profile__link" type="button" onClick={onLogout}>
          Выйти из аккаунта
        </button>
      </section>
    </CurrentUserContext.Provider>
  );
}
