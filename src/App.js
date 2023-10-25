import React, { Component } from 'react';
import './App.css';
//React-router-doom
import { BrowserRouter, Routes, Route} from 'react-router-dom';


//React-boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes permanentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//Inicio
import Inicio from './components/Inicio/Inicio';

// Formularios
import FormularioRegistro from './components/FormularioRegistro/FormularioRegistro'
import Ingreso from './components/ingresar/Ingreso';
import Registro from './components/registrarse/Registro';
import RecuperarContrasenia from './components/RecuperarContrasenia/RecuperarContrasenia';
import FormCancha from './components/Cancha/FormCancha'
import MisCanchas from './components/Cancha/MisCanchas'
import Cancha from './components/Cancha/Cancha'
//Home page - en construccion
import Home from './components/Home/Home'
import Perfil from './components/Perfil/Perfil';

import { UserProvider } from './components/UserContext';


//Buscadores
import BusquedaJugador from './components/BusquedaJugador/BusquedaJugador';
import BusquedaEquipo from './components/BusquedaEquipo/BusquedaEquipo';

//Mapa
import Mapa from './components/Mapa/Mapa';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    console.log(route)

    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { route } = this.state;
    const { idAdmin } = this.state;

    return (
      <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Mapa/>
          <Header/>
          <Routes>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/ingreso' element={
              route === 'signin'
              ? <Ingreso loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Registro loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          }/>
            <Route path='/ingreso/registro' element={<FormularioRegistro/>}/>
            <Route path='/ingreso/recuperar' element={<RecuperarContrasenia/>}/>
            <Route path= '/home' element={<Home />}/>
            <Route path= '/crearcancha/:id_complejo' element={<FormCancha />}/>
            <Route path= '/miscanchas/:idAdmin' element={<MisCanchas />}/>
            <Route path= '/perfil/:tipo/:id' element={<Perfil />}/>
            <Route path= '/cancha/:id' element={<Cancha />}/>


            {/* Busqueda */}
            <Route path='/buscarjugador' element={<BusquedaJugador/>}/>
            <Route path='/buscarequipo/' element={<BusquedaEquipo/>}/>
          

          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
      </UserProvider>
    );
  }
}

export default App;
