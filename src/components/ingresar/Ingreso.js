import React from 'react';
import './style.css'

class Ingreso extends React.Component {
    //Datos que necesita el user para ingresar
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    //completar el fetch con el link a la consulta de la db
    fetch('http://localhost:3000/ingreso', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        mail: this.state.signInEmail,
        pass: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
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
              <input type="email" placeholder='Ingrese el mail' className='form-control' />
            </div>
            <div className='mb-2'>
              <label htmlFor="password">Contraseña</label>
              <input type="password" placeholder='Ingrese contrasena' className='form-control' />
            </div>
            <div>
              <button>
                Ingresar
              </button>
            </div>
            <p className='text-right'> 
               <a href=''>Olvide la contraseña</a>
            </p>
            <p className='text-right'>
              <a href=''>Registrarse</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Ingreso;