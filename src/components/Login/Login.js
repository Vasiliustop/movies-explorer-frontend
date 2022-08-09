import React from "react";
import logo from "../../images/logo.svg"
import {Link} from "react-router-dom";

export default function Login () {
    
    
    return(
        <section className="login">
            <img className='login__logo' src={ logo } alt='Логотип'/>
            <form className="login__form">
            <h2 className="login__title">Рады видеть!</h2>
                <label className="login__label">E-mail</label>
                <input className="login__input" name="email" type="email" required />
                <span className="login__error"></span>
                <label className="login__label">Password</label>
                <input className="login__input" name="password" type="password" required />
                <span className="login__error"></span>
                <button className="login__save-button" type="submit">Войти</button>
            </form>
            <p className="login__text">Ещё не зарегистрированы?
                <Link className="login__link" to="/signup">Регистрация</Link>
            </p>


        </section>
    )
}