import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Василий!</h2>
      <div className="profile__container">
        <p className="profile__field">
          <span>Имя</span>
          <span>Василий</span>
        </p>
        <p className="profile__field">
          <span>E-mail</span>
          <span>vasiliy@yandex.ru</span>
        </p>
      </div>
      <div className="profile__buttons">
        <button type="button" className="profile__button">Редактировать</button>
        <NavLink className="profile__link" to={"/signin"}>Выйти из аккаунта</NavLink>
      </div>
    </section>
  );
}
