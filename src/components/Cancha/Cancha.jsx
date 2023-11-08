import React, {  useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cancha = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState();
  const [cantidadJugadores, setCantidadJugadores] = useState();
  const [techo, setTecho] = useState();
  const [editandoFoto, setEditandoFoto] = useState();
  const [precioTurno, setPrecioTurno] = useState();
  const navigate = useNavigate()


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
        setPrecioTurno(res.data.precio_turno)
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
    axios.put(`http://localhost:3001/update_cancha/${id}`, {
      cant_jugador: cantidadJugadores,
      techo: techo,
      nombre_cancha: nombre,
      imagen: editandoFoto,
      precio_turno: precioTurno
    })
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        navigate('/home', { state: { responseData: res.data } })
      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  };

  const handleAgenda = () => {
    // Agregar lógica para mostrar la agenda de la cancha
  };

  const handleEliminarCancha = () => {
    //Falta popUp que diga si quiere confirmar, if yes == delete else== misCanchas
    axios.delete(`http://localhost:3001/borrar_cancha/${id}`)
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        navigate('/home', { state: { responseData: res.data } })
      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
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
        <label>Precio turno:</label>
        <input type="text" value={precioTurno} onChange={(e) => setPrecioTurno(e.target.value)} />
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