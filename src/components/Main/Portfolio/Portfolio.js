import React from "react";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://github.com/Vasiliustop/how-to-learn"
            rel="noreferrer"
            target="_blank"
          >
            <p className="portfolio__name">Статичный сайт</p>
            <div className="portfolio__icon">↗</div>{" "}
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://vasiliustop.github.io/russian-travel/"
            rel="noreferrer"
            target="_blank"
          >
            <p className="portfolio__name">Адаптивный сайт </p>
            <div
              className="portfolio__icon"
              href="https://vasiliustop.github.io/russian-travel/"
              rel="noreferrer"
              target="_blank"
            >
              ↗
            </div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://vasiliusmesto.students.nomoredomains.xyz/signin"
            rel="noreferrer"
            target="_blank"
          >
            <p className="portfolio__name">Одностраничное приложение</p>
            <div
              className="portfolio__icon"
              href="https://vasiliusmesto.students.nomoredomains.xyz/signin"
              rel="noreferrer"
              target="_blank"
            >
              ↗
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
