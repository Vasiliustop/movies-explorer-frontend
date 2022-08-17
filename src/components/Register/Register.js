import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";


export default function Register({onRegister}) {
 
  
    const [state, setState] = useState({
      name: "",
      email: "",
      password: "",

    });
  
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const { name, email, password } = state;
      if (onRegister && name && email && password) {
        onRegister(name, email, password);
      }
    };
  
  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form"  onSubmit={handleSubmit}>
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          name="name"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={state.name ?? ""}
        />
        <span className="register__error"></span>
        <label className="register__label">E-mail</label>
        <input className="register__input" name="email" type="email" required  onChange={handleChange}  value={state.email ?? ""}/>
        <span className="register__error"></span>
        <label className="register__label">Password</label>
        <input
          className="register__input"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={state.password ?? ""}
        />
        <span className="register__error"></span>
        <button className="register__save-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </p>
    </section>
  );
}
