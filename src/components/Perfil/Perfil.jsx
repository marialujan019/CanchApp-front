
import PerfilAdministrador from '../ComponentesAdministrador/PerfilAdministrador/PerfilAdministrador';
import PerfilJugador from '../ComponentesJugador/PerfilJugador/PerfilJugador';
import React, {useState, useEffect}  from 'react';
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
  const [sexo, setSexo] = useState('');
  const [mail, setMail] = useState('');


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
          console.log("DATOS JUGADOR: " + JSON.stringify( res.data))
          setNombre(res.data.nombre);
          setTelefono(res.data.telefono);
          setPiernaHabil(res.data.pierna_habil);
          setPosicion(res.data.posicion);
          setMail(res.data.mail);
          setSexo(res.data.sexo)
        }
  
      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  }, [user.id, user.tipo]); // Dependencias añadidas aquí
  

  console.log("Perfil: " + user.tipo)
  return (
    <div>
      {user.tipo === "administrador" ? (
        // Renderizar el perfil del administrador
        <PerfilAdministrador nombre={nombre} direccion={direccion} telefono={telefono} contrasena={contrasena}/>
      ) : (
        // Renderizar el perfil del jugador
        <PerfilJugador id={user.id} nombre2={nombre} telefono2={telefono} piernaHabil={piernaHabil} posicion={posicion} sexo2={sexo} mail2={mail}/>
      )}
    </div>
  );
}

export default Perfil;
