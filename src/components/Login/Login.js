import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Login({ onLogin }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    if (onLogin && email && password) {
      onLogin(email, password);
    }
  };



  return (
    <section className="login">
      <Logo />
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Рады видеть!</h2>
        <label className="login__label">E-mail</label>
        <input className="login__input" name="email" type="email" required onChange={handleChange} value={inputs.email ?? ""} />
        <span className="login__error"></span>
        <label className="login__label">Password</label>
        <input
          className="login__input"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={inputs.password ?? ""}
        />
        <span className="login__error"></span>
        <button className="login__save-button" type="submit">
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
