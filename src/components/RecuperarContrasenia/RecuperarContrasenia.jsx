import React from 'react';
import Button from 'react-bootstrap/Button';

const RecuperarContrasenia = () => {
    return (
          <div className='formularioIngresoContainer'>
            <form>
              <h3>Recuperar contraseña</h3>
              
              <div className="formularioIngreso">
                <label htmlFor="email" className='formularioLabel'>Ingrese su correo electronico</label>
                <input
                  type="email"
                  placeholder='Ingrese el mail'
                  className='formularioInput'
                  required
                />
              </div>
  
                <div className='formularioBotonSubmitcontainer'>
                    <Button variant="outline-primary" type="submit">Aceptar</Button>{' '}
                </div>
            </form>            
        </div>
    );
}

export default RecuperarContrasenia;
