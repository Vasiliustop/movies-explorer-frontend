import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function NavAuth() {
  const logoStyle = {
    margin: "0 30px 0 0",
  };

  return (
    <>
      <Logo style={logoStyle} />
      <nav className="nav-auth">
        <ul className="nav-auth__list">
          <li className="nav-auth__list-item">
            <Link
              to="/signup"
              className="nav-auth__link nav-auth__link_type_signup"
            >
              Регистрация
            </Link>
          </li>
          <li className="auth__list-item">
            <Link
              to="/signin"
              className="nav-auth__link nav-auth__link_type_signin"
            >
              Войти
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
