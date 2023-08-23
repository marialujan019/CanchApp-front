import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

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
      <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className='form_container 40-w p-5 rounded bg-white'>
          <form>
            <h3>
              Bienvenido a Canchapp
            </h3>
            <div className='mb-2'>
              <label htmlFor="email">Mail</label>
              <input
                type="email"
                placeholder='Ingrese el mail'
                className='form-control'
                onChange={this.onEmailChange}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder='Ingrese contrasena'
                className='form-control'
                onChange={this.onPasswordChange}
              />
            </div>
            <div>
              <button onClick={this.onSubmitSignIn}>
                Ingresar
              </button>
            </div>
            <p className='text-right'>
              <Link to=''>Olvidé la contraseña</Link>
            </p>
            <p className='text-right'>
              <Link to={"registro"}>Registrarse</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Ingreso;
