import React from "react";
import Photo from "../../../images/iam.jpg";

export default function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h2 className="aboutme__title">студент</h2>
      <div className="aboutme__content">
        <img className="aboutme__photo" src={Photo} alt="Персональное фото" />
        <div className="aboutme__information">
          <h3 className="aboutme__name">Василий</h3>
          <p className="aboutme__subtitle"> Фронтенд-разработчик, 32 года</p>
          <p className="aboutme__description">
        Приветики, меня зовут Василий, мне 32 года живу в Санкт - Петербурге! Наконец то, окончил курс веб разработки,
         и готов покорять новые вершины. Мне очень нравится писать код и смотреть на результат своих действий. 
         В свободное время, люблю играть в шахматы, и занимаюсь инвестициями на фондовом рынке. 
          </p>
        </div>
      </div>

      <ul className="aboutme__list-link">
        <li>
          <a
            className="aboutme__link"
            href="https://t.me/vasiliustop"
            rel="noreferrer"
            target="_blank"
          >
            Telegram
          </a>
        </li>
        <li>
          <a
            className="aboutme__link"
            href="https://github.com/Vasiliustop"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </li>
      </ul>
    </section>
  );
}
