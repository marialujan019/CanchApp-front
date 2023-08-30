import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ingreso.css';
import Button from 'react-bootstrap/Button';

class Ingreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/ingreso', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mail: this.state.signInEmail,
        pass: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  }

  render() {
    return (
      <div className='formularioIngresoContainer'>
        
          <form>
            <h3> Bienvenido a Canchapp</h3>
            
            <div className="formularioIngreso">
              <label htmlFor="email" className='formularioLabel'>Mail</label>
              <input
                type="email"
                placeholder='Ingrese el mail'
                className='formularioInput'
                onChange={this.onEmailChange}
                required
              />
            </div>
          
            <div className='formularioIngreso'>
              <label htmlFor="password" className='formularioLabel'>Contraseña</label>
              <input
                type="password"
                placeholder='Ingrese contrasena'
                className='formularioInput'
                onChange={this.onPasswordChange}
                required
              />
            </div>

            <div className='formularioBotonSubmitcontainer'>
              <Button variant="outline-primary" onClick={this.onSubmitSignIn}>Ingresar</Button>{' '}
            </div>

            <div className='ingresoRutas'>
              <Link to={'recuperar'} className='ingresoRuta'>Olvidé la contraseña</Link>
              <Link to={"registro"} className='ingresoRuta'>Registrarse</Link>
            </div>
          </form>
      </div>
    );
  }
}

export default Ingreso;
