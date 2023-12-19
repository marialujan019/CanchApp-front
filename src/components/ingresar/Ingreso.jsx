import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ingreso.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useUser } from '../UserContext';

export default function Login() {
  const { setUser } = useUser();
  const [values, setValues] = useState({
    mail: '',
    pass: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSumit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/ingreso', {
      mail: values.mail,
      pass: values.pass
    })
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        setUser({
          id: res.data.id,
          tipo: res.data.tipo,
          auth: true,
          nombre: res.data.nombre
        });
        navigate('/home', { state: { responseData: res.data } });
      } else {
        setErrorMessage("Usuario o contraseña incorrecta");
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='formularioIngresoContainer'>   
      <form className='formularioIngresoContainer2' onSubmit={handleSumit}>
        <h3 className='formularioIngresoTitulo'> ¡Bienvenido a Canchapp! </h3>

        <div className="formularioIngreso">
          <label htmlFor="email" className='formularioIngresoLabel'>Correo electrónico</label>
          <input
            type="email"
            placeholder='example@gmail.com'
            className='formularioIngresoInput'
            onChange={e=> setValues({...values, mail: e.target.value})}
            required
          />
        </div>

        <div className='formularioIngreso'>
          <label htmlFor="password" className='formularioIngresoLabel'>Contraseña</label>
          <input
            type="password"
            placeholder='example123'
            className='formularioIngresoInput'
            onChange={e=> setValues({...values, pass: e.target.value})}
            required
          />
        </div>

        {errorMessage && (
          <div className="mensajeErrorIngreso">
            <strong>{errorMessage}</strong>
          </div>
        )}

        <div className='formularioBotonSubmitcontainer'>
          <button className='formularioIngresoBoton' type="submit"> Ingresar </button>
        </div>

        <div className='ingresoRutas'>
          <Link to={'recuperar'} className='ingresoRuta'>Olvidé mi contraseña</Link>
          <Link to={"registro"} className='ingresoRuta'>Registrarse</Link>
        </div>
      </form>
    </div>
  );
}
