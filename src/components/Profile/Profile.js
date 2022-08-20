import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Profile({onLogout, onSubmit, currentUser}) {

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");


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
      onSubmit({email: userEmail, name: userName});
    }

  useEffect(() => {
      setUserName(currentUser.name);
      setUserEmail(currentUser.email);
  }, [currentUser]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <section className="profile">
      <div className="profile__container">
        <h3 className="profile__title">Привет, {userName}!</h3>
        <form className="profile__form" onSubmit={handleSubmit}  >
          <div className="profile_form-inputs">
            <p className="profile__text">Имя</p>
            <input
              className="profile__input"
              type="text"
              required
              value={userName || ''}
              onChange={handleChangeName}
              id='profile-name'
            />
            <p className="profile__text">Email</p>
            <input
              className="profile__input"
              type="email"
              required
              value={userEmail || ''}
              onChange={handleChangeEmail}
              id='profile-email'
            />
          </div>
          <div className="profile__buttons">
            <button className="profile__button" type="submit" onSubmit={onSubmit}>Редактировать</button>
            <button className="profile__link" type="button" onClick={onLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
    </CurrentUserContext.Provider>
  );
}
