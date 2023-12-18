import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'; // Asegúrate de tener un archivo CSS para el estilo
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import Banner from '../Banner/Banner';
import logo from '../../imagen/LogoHeader.png'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');
  const [tipo, setTipo] = useState('');
  const [id, setId] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();
  const responseData = location.state && location.state.responseData;
  const { user } = useUser();
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://localhost:3001').then((res) => {
      if (res.data.Status === 'Respuesta ok') {
        setAuth(true);
        setNombre(res.data.nombre);
      } else {
        setAuth(false);
        setMessage(res.data.message);
      }
    });
  }, [responseData]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout').then((res) => {
      if (res.data.Status === 'Respuesta ok') {
        navigate('/ingreso')
        window.location.reload(true);
      } else {
        alert('error');
      }
    });
  };

  console.log('Header:' + user.json);

  return (
    auth ? (
      <>
        <nav className="header">
          <div className="logo"><img src={logo} /></div>
          <button className="menu-button" onClick={toggleMenu}>
            <i className="bi bi-list" />
          </button>
          <section className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link
              to="/home"
              className="nav-link"
            >
              Inicio
          </Link>
          <Link
              to={`/perfil/${user.tipo}/${user.id}`}
              className="nav-link"
            >
              Mi perfil
            </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
              Salir
          </button>
          </section>
        </nav>
        <Banner />

      </>
    ) : (
      <header className="header">
        <div className="logo"><img src={logo} /></div>
        <button className="menu-button" onClick={toggleMenu}>
          <i className="bi bi-list" />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" className="nav-link">
            Inicio
          </Link>
          <Link to="/ingreso" className="nav-link">

            Ingresar
          </Link>
        </nav>
      </header>
    )
  );
};

export default Header;