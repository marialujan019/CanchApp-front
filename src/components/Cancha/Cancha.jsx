import React, {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Cancha = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState();
  const [cantidadJugadores, setCantidadJugadores] = useState();
  const [techo, setTecho] = useState();
  const [editandoFoto, setEditandoFoto] = useState();

  useEffect(() => {
    axios.post('http://localhost:3001/cancha', {
      id: id
    })
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        console.log(res)
        setNombre(res.data.nombre);
        setCantidadJugadores(res.data.jugadores);
        setTecho(res.data.techo);
      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  }, []);

  const handleEditarFoto = () => {
    // Agregar lógica para permitir la edición de la foto
    setEditandoFoto(true);
  };

  const handleGuardarCambios = () => {
    // Agregar lógica para guardar los cambios en la base de datos
    // Usar las variables nombre, cantidadJugadores y techo
  };

  const handleAgenda = () => {
    // Agregar lógica para mostrar la agenda de la cancha
  };

  const handleEliminarCancha = () => {
    // Agregar lógica para eliminar la cancha
  };

  return (
    <div className="cancha">
      <h3>{nombre}</h3>
      <img alt="Imagen de la cancha" />
      {editandoFoto ? (
        <button onClick={handleEditarFoto}>Guardar Foto</button>
      ) : (
        <button onClick={handleEditarFoto}>Editar Foto</button>
      )}
      <div>
        <label>Nombre de la cancha:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Cantidad de Jugadores:</label>
        <select value={cantidadJugadores} onChange={(e) => setCantidadJugadores(e.target.value)}>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="11">11</option>
        </select>
      </div>
      <div>
        <label>Techo:</label>
        <select value={techo} onChange={(e) => setTecho(e.target.value)}>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      <button onClick={handleAgenda}>Agenda</button>
      <button onClick={handleEliminarCancha}>Eliminar Cancha</button>
      <button onClick={handleGuardarCambios}>Guardar Cambios</button>
    </div>
  );
};

export default Cancha;