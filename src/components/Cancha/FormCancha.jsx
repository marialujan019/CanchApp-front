import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormCancha.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function CrearCancha() {
  const [values, setValues] = useState({
    nombre_cancha: '',
    cant_jugador: '',
    techo: ''
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleCrearCancha = (e) => {
      e.preventDefault();
      console.log(values.mail)
      axios.post('http://localhost:3001/crearCancha', {
        nombre_cancha: values.nombre_cancha,
        cant_jugador: values.cant_jugador,
        techo: values.techo
      })
      .then(res => {
          console.log(res)
          if(res.data.Status === "Respuesta ok" ){
            console.log(res.data)
              navigate('/crearCancha', { state: { responseData: res.data } })
          } else {
              alert(res.data.Message)
          }
      })
      .catch(err => console.log(err))
  }

    return (
      <div className='formularioIngresoContainer'>   
          <form onSubmit={handleCrearCancha}>
            <h3> Crea tu cancha</h3>
            
            <div className="formularioIngreso">
              <label htmlFor="text" className='formularioLabel'>Nombre de la cancha</label>
              <input
                type="text"
                placeholder='Nombre o numero de cancha'
                className='formularioInput'
                onChange={e=> setValues({...values, nombre_cancha: e.target.value})}
                required
              />
            </div>
          
            <div className="formularioInputEspecial">
            <label htmlFor="number" >Cantidad Jugadores</label>
                <div>
                    <input type="radio" name="cant_jugador" id="5" value="5" required/>
                    <label htmlFor="hombre">5</label>
                </div>
                <div>
                    <input type="radio" name="cant_jugador" id="7" value="7" required/>
                    <label htmlFor="mujer">7</label>
                </div>
                <div>
                    <input type="radio" name="cant_jugador" id="11" value="11" required/>
                    <label htmlFor="mujer">11</label>
                </div>
            </div>

            <div className="formularioInputEspecial">
            <label htmlFor="number" >Tiene techo?</label>
                <div>
                    <input type="radio" name="techo" id="si" value="si" required/>
                    <label htmlFor="hombre">Si</label>
                </div>
                <div>
                    <input type="radio" name="techo" id="no" value="no" required/>
                    <label htmlFor="mujer">No</label>
                </div>
            </div>

            <div className='formularioBotonSubmitcontainer'>
              <Button variant="outline-primary" type="submit">Crear cancha</Button>
            </div>

          </form>
      </div>
    );
  }