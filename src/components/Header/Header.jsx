import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Asegúrate de tener un archivo CSS para el estilo
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import Banner from '../Banner/Banner';

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

  const updateBreadcrumbs = (crumbs) => {
    setBreadcrumbs(crumbs);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout').then((res) => {
      if (res.data.Status === 'Respuesta ok') {
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
        <header className="header">
          <div className="logo">Logo</div>
          <button className="menu-button" onClick={toggleMenu}>
            <i className="bi bi-list" />
          </button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link
              to="/home"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Buscar complejo'])}
            >
              Buscar complejo
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Salir
            </button>
            <Link
              to={`/perfil/${user.tipo}/${user.id}`}
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Mi perfil'])}
            >
              Mi perfil
            </Link>
            <Link
              to="/misEquipos"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Mis equipos'])}
            >
              Mis equipos
            </Link>
            <Link
              to={`buscarequipo/${user.id}`}
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Buscar equipo'])}
            >
              Buscar equipo
            </Link>
            <Link
              to="/buscarjugador"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Buscar jugadores'])}
            >
              Buscar jugadores
            </Link>
            <Link
              to="/historial"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Mi historial'])}
            >
              Mi historial
            </Link>
            <Link
              to="/misSolicitudes"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Mis solicitudes'])}
            >
              Mis solicitudes
            </Link>
            <Link
              to="/misReservas"
              className="nav-link"
              onClick={() => updateBreadcrumbs(['Inicio', 'Mis reservas'])}
            >
              Mis reservas
            </Link>
            
          </nav>
        </header>
        <Banner breadcrumbs={breadcrumbs} />
      </>
    ) : (
      <header className="header">
        <div className="logo"> logo </div>
        <button className="menu-button" onClick={toggleMenu}>
          <i className="bi bi-list" />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" className="nav-link" onClick={() => updateBreadcrumbs(['Inicio'])}>
            Inicio
          </Link>
          <Link to="/ingreso" className="nav-link" onClick={() => updateBreadcrumbs(['Inicio', 'Ingresar'])}>
            Ingresar
          </Link>
        </nav>
      </header>
    )
  );
};

export default Header;
