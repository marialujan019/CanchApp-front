import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Asegúrate de tener un archivo CSS para el estilo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <button className="menu-button" onClick={toggleMenu}>
        <i class="bi bi-list"></i>
      </button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/ingreso" className="nav-link">Registrarse</Link>
      </nav>
    </header>
  );
};

export default Header;
