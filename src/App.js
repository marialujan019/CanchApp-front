import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
 import Ingreso from './components/ingresar/Ingreso';
import Registro from './components/registrarse/Registro';
import './App.css';

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
        {
             route === 'signin'
             ? <Ingreso loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Registro loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        
        }
      </div>
    );
  }
}

export default App;
