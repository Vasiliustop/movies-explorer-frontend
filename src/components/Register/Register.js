import React from "react";
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Register () {
    
    
    return(
        <section className="register">
        <img className='register__logo' src={ logo } alt='Логотип'/>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form">
            <label className="register__label">Имя</label>
            <input className="register__input" name="name" required  minLength="2" maxLength="30"/>
            <span className="register__error"></span>
            <label className="register__label">E-mail</label>
            <input className="register__input" name="email" type="email" required />
            <span className="register__error"></span>
            <label className="register__label">Password</label>
            <input className="register__input" name="password" type="password" required />
            <span className="register__error"></span>
            <button className="register__save-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__text">Уже зарегистрированы?
            <Link className="register__link" to="/signin">Войти</Link>
        </p>


    </section>
    )
}