import React, { Component } from 'react';
import './App.css';
//React-router-doom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
//Home page - en construccion
import Home from './components/Home/Home'

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
    return (
      
      <div className="App">
        <BrowserRouter>
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
            <Route path= '/home/crearcancha' element={<FormCancha />}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
