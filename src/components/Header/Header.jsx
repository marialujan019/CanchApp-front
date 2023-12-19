import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import Banner from '../Banner/Banner';
import { Button } from '@nextui-org/react';


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

  const getPageName = (pathname) => {
    switch (pathname) {
      case '/home':
        return 'Inicio';
      case '/mapa':
        return 'Buscar complejo';
      case `/perfil/${user.tipo}/${user.id}`:
        return 'Mi perfil';
      case '/misEquipos':
        return 'Mis equipos';
      case `/buscarequipo/${user.id}`:
        return 'Buscar equipo';
      case '/buscarjugador':
        return 'Buscar jugadores';
      case '/historial':
        return 'Mi historial';
      case '/misSolicitudes':
        return 'Mis solicitudes';
      case `/misReservas/${user.id}`:
        return 'Mis reservas';
      default:
        return 'Detalles del Complejo';
    }
  };
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

  const currentPage = location.pathname;
  const pageName = getPageName(currentPage);


  return (
    auth ? (
      <>
        <nav className="header">
          <div className="logo">
            <img src="/images/header/logo.jpg" alt="" />
          </div>
          <button className="menu-button" onClick={toggleMenu}>
            <i className="bi bi-list" />
          </button>
          <section className={`nav ${menuOpen ? 'open' : ''}`}>
          <Button color='primary'><Link
              to="/home"
              className="nav-link p-0 m-0"
            >
              Inicio
          </Link>
          </Button>
          <Button color='secondary'>
          <Link 
              to={`/perfil/${user.tipo}/${user.id}`}
              className="nav-link p-0 m-0"
            >Mi perfil
            </Link>
          </Button>
          
          <Button color="danger" onClick={handleLogout}>
              Salir
          </Button>
          </section>
        </nav>
        <Banner pageName={pageName}/>

      </>
    ) : (
      <header className="header">
          <div className="logo">
            <img src="/images/header/logo.jpg" alt="" />
          </div>
        <button className="menu-button" onClick={toggleMenu}>
          <i className="bi bi-list" />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" className="nav-link p-0">
            Inicio
          </Link>
          <Link to="/ingreso" className="nav-link p-0">

            Ingresar
          </Link>
        </nav>
      </header>
    )
  );
};

export default Header;