export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <ul className="footer__list">
          <li className="footer__item">
            <a href="https://practicum.yandex.ru" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a href="https://github.com/Vasiliustop" className="footer__link">
              Github
            </a>
          </li>
          <li className="footer__item">
            <a href="https://facebook.com" className="footer__link">
              Facebook
            </a>
          </li>
        </ul>
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
