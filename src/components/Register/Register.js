import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import UserFormValidation from "../Validation/validation";

export default function Register({onRegister}) {
  const NameRegExp = /^[а-яА-ЯёЁa-zA-Z0-9\s-]+$/;
  const EmailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const { values, handleChange, errors, isValid, resetForm } = UserFormValidation({
    password: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (value.length < 2) {
        return 'Минимальное количество символов - 4'
      }
      return '';
    },
    name: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (!NameRegExp.test(value)) {
        return 'Поле содержит недопустимые символы'
      } else if (value.length < 2) {
        return 'Минимальное количество символов - 2'
      } else if (value.length > 30) {
        return 'Максимальное количество символов - 30'
      }
      return '';
    },
    email: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (!EmailRegExp.test(value)) {
        return 'Поле не соотвествует адресу электронной почты'
      }
      return '';
    }
  });

  const handleSubmit = (e) => {
    const {name, email, password} = values;
    e.preventDefault();
    onRegister(name, email, password);
    console.log(name, email, password)
  }


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
          id='register-name' 
        />
       
       {Object.keys(errors).map((errorKey, index) => (
              errorKey === 'name' ? 
        <span className="register__error" key={index}>{errors[errorKey]}</span> : '' ))}



        <label className="register__label">E-mail</label>
        <input className="register__input" name="email" type="email" required  onChange={handleChange} />
        {Object.keys(errors).map((errorKey, index) => (
              errorKey === 'email' ? 
        <span className="register__error" key={index}>{errors[errorKey]}</span> : '' ))}
        <label className="register__label">Password</label>
        <input
          className="register__input"
          name="password"
          type="password"
          required
          onChange={handleChange}
          id='register-email' 
        />


{Object.keys(errors).map((errorKey, index) => (
              errorKey === 'password' ? 
        <span className="register__error" key={index}>{errors[errorKey]}</span> : '' ))}




        <button className={`register__save-button ${!isValid ? 'register__save-button_type_disabled' : ''} type='submit' aria-label='Зарегистрироваться`} disabled={!isValid}>Зарегистрироваться</button>
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
