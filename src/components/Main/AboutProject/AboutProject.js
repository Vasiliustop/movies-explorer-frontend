import React from "react";

export default function AboutProject() {
  return (
    <section className="about-project" id="aboutproject">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__info">
          <h3 className="about-project__heading">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__heading">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__backend">
          <div className="about-project__duration-backend">1 неделя</div>
          <p className="about-project__duration-text">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <div className="about-project__duration-frontend">4 недели</div>
          <p className="about-project__duration-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}
