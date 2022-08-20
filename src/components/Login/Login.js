import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import UserFormValidation from "../Validation/validation";

export default function Login({ onLogin, loginErrMessage }) {
  const EmailReg =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const { values, handleChange, errors, isValid, resetForm} =
    UserFormValidation({
      password: (value) => {
        if (!value) {
          return "Необходимо заполнить это поле";
        } else if (value.length < 4) {
          return "Минимальное количество символов - 4";
        }
        return "";
      },
      email: (value) => {
        if (!value) {
          return "Необходимо заполнить это поле";
        } else if (!EmailReg.test(value)) {
          return "Поле не соотвествует адресу электронной почты";
        }
        return "";
      },
    });

  const handleSubmit = (e) => {
    const { email, password } = values;
    e.preventDefault();
    onLogin(email, password);
    console.log(email, password)
  };

  return (
    <section className="login">
      <Logo />
      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <h2 className="login__title">Рады видеть!</h2>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="email"
          type="email"
          id="login-email"
          required
          onChange={handleChange}
        />
        {Object.keys(errors).map((errorKey, index) =>
          errorKey === "email" ? (
            <span className="login__error" key={index}>
              {errors[errorKey]}
            </span>
          ) : (
            ""
          )
        )}

        <label className="login__label">Password</label>
        <input
          className="login__input"
          name="password"
          type="password"
          required
          onChange={handleChange}
          id="login-password"
        />
        {Object.keys(errors).map((errorKey, index) =>
          errorKey === "password" ? (
            <span className="login__error" key={index}>
              {errors[errorKey]}
            </span>
          ) : (
            ""
          )
        )}

        <button
          className={`login__save-button ${
            !isValid ? "login__save-button_type_disabled" : ""
          } type='submit' aria-label='Войти`}
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <p className="login__text">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </section>
  );
}
