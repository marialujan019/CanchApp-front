import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ingreso.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Login() {
  const [values, setValues] = useState({
    mail: '',
    pass: ''
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleSumit = (e) => {
      e.preventDefault();
      console.log(values.mail)
      axios.post('http://localhost:3001/ingreso', {
          mail: values.mail,
          pass: values.pass
      })
      .then(res => {
          console.log(res)
          if(res.data.Status === "Respuesta ok" ){
            console.log(res.data)
              navigate('/home', { state: { responseData: res.data } })
          } else {
              alert(res.data.Message)
          }
      })
      .catch(err => console.log(err))
  }

    return (
      <div className='formularioIngresoContainer'>   
          <form onSubmit={handleSumit}>
            <h3> Bienvenido a Canchapp</h3>
            
            <div className="formularioIngreso">
              <label htmlFor="email" className='formularioLabel'>Mail</label>
              <input
                type="email"
                placeholder='Ingrese el mail'
                className='formularioInput'
                onChange={e=> setValues({...values, mail: e.target.value})}
                required
              />
            </div>
          
            <div className='formularioIngreso'>
              <label htmlFor="password" className='formularioLabel'>Contraseña</label>
              <input
                type="password"
                placeholder='Ingrese contrasena'
                className='formularioInput'
                onChange={e=> setValues({...values, pass: e.target.value})}
                required
              />
            </div>

            <div className='formularioBotonSubmitcontainer'>
              <Button variant="outline-primary" type="submit">Ingresar</Button>
            </div>

            <div className='ingresoRutas'>
              <Link to={'recuperar'} className='ingresoRuta'>Olvidé la contraseña</Link>
              <Link to={"registro"} className='ingresoRuta'>Registrarse</Link>
            </div>
          </form>
      </div>
    );
  }

