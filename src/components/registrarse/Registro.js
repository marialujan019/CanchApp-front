import React from 'react';

class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    //completar con la db
    fetch('http://localhost:3000/registro', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        nombre: this.state.name,
        apellido: "hola",
        mail: this.state.email,
        pass: this.state.password,
        fnac: "1993-10-29",
        telefono: 121212
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
    return 
  }
}

export default Registro;