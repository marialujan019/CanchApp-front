
import PerfilAdmin from './PerfilAdmin';
import PerfilJugador from './PerfilJugador';
import React, {useState, useEffect}  from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../UserContext';
import axios from 'axios';

function Perfil() {
  const { user } = useUser();
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')  
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [piernaHabil, setPiernaHabil] = useState('');
  const [posicion, setPosicion] = useState('');

  useEffect(() => {
    axios.post('http://localhost:3001/perfil', {
      tipo: user.tipo,
      id: user.id
    })
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        console.log(res.data)
        console.log("Tipo: " + user.tipo)
        if(user.tipo === "administrador") {
          setNombre(res.data.nombre);
          setDireccion(res.data.direccion);
          setTelefono(res.data.telefono);
          setContrasena(res.data.contrasena);
        }
        
        if(user.tipo === "jugador") {
          setNombre(res.data.nombre);
          setTelefono(res.data.telefono);
          setPiernaHabil(res.data.pierna_habil);
          setPosicion(res.data.posicion);
        }

      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  }, []); 

  console.log("Perfil: " + user.tipo)
  return (
    <div>
      {user.tipo === "administrador" ? (
        // Renderizar el perfil del administrador
        <PerfilAdmin nombre={nombre} direccion={direccion} telefono={telefono} contrasena={contrasena}/>
      ) : (
        // Renderizar el perfil del jugador
        <PerfilJugador nombre={nombre} telefono={telefono} piernaHabil={piernaHabil} posicion={posicion} />
      )}
    </div>
  );
}

export default Perfil;
