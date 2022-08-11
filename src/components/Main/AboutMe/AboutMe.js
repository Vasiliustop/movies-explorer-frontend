import React from "react";
import Photo from "../../../images/photo.jpg";

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
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
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
