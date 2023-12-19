import React from 'react';
import Button from 'react-bootstrap/Button';

const RecuperarContrasenia = () => {
    return (
          <div className='formularioIngresoContainer'>
            <form className='formularioIngresoContainer2'>
              <h3>Recuperar contraseña</h3>
              
              <div className="formularioIngreso">
                <label htmlFor="email" className='formularioIngresoLabel'>Ingrese su correo electrónico</label>
                <input
                  type="email"
                  placeholder='example@gmail.com'
                  className='formularioIngresoInput'
                  required
                />
              </div>
  
                <div className='formularioBotonSubmitcontainer'>
                    <button className='formularioIngresoBoton'type="submit" > Aceptar </button>
                </div>
            </form>            
        </div>
    );
}

export default RecuperarContrasenia;
