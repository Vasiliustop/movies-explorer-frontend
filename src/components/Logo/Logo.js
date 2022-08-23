import React from "react";
import { Link } from "react-router-dom";
import iconLogo from "../../images/logo.svg";

export default function Logo () {
  return (
    <Link className="logo" to="/">
      <img src={iconLogo} alt="Логотип. Переход к главной странице."/>
    </Link>
  );
}


