
import "./header.css"
import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };


    return (
      <header>
        <div className="container">
        <Link to={"/"} className="logo">Canchap</Link>
          <div className={`menu-toggle ${navActive ? 'active' : ''}`} onClick={toggleNav}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <ul className={`nav-links ${navActive ? 'active' : ''}`}>
            <Link to={"/"}>Inicio</Link>
            <Link to={"/ingreso"}>Ingresar</Link>
          </ul>
        </div>
      </header>
    );
}

export default Header;
