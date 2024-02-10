import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUser } from '../../../UserContext';


const CrearEquipo = ({ show, onHide, updateMisEquipos, equiposYaCreados }) => {
  const { user } = useUser();
  const [tipoEquipo, setTipoEquipo] = useState('');

  const [equipo, setEquipo] = useState({
    nombre_equipo: '',
    publico: false,
    cant_max: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si ya existe un equipo con el mismo nombre
    const equipoExistente = equiposYaCreados.find(
      (eq) => eq.nombre_equipo === equipo.nombre_equipo
    );

    if (equipoExistente) {
      alert('Ya tienes un equipo con ese nombre');
      return;
    }

    // Continuar con la creación del equipo si no hay un equipo existente
    console.log(equipo);
    await axios.post('http://localhost:3001/crear_equipo', {
      nombre_equipo: equipo.nombre_equipo,
      capitan: user.id,
      id_jugadores: [user.id],
      ubicacion: equipo.ubicacion,
      cant_max: equipo.cant_max,
      publico: equipo.publico
    })
    
    setEquipo({
      nombre_equipo: '',
      publico: false,
      cant_max: 0,
    });
    setTipoEquipo('')
    onHide();
    updateMisEquipos();
  };

  const handleNombreEquipoChange = (e) => {
    setEquipo({
      ...equipo,
      nombre_equipo: e.target.value,
    });
  };

  const handleUbicacionEquipoChange = (e) => {
    setEquipo({
      ...equipo,
      ubicacion: e.target.value,
    });
  };

  const handleTipoEquipoChange = (e) => {
    const tipoEquipoSeleccionado = e.target.value;
    let cant_max = 0;

    // Asignar el valor adecuado a max_jug según el tipo de equipo seleccionado
    switch (tipoEquipoSeleccionado) {
      case 'futbol5':
        cant_max = 10;
        break;
      case 'futbol7':
        cant_max = 14;
        break;
      case 'futbol11':
        cant_max = 22;
        break;
      default:
        break;
    }

    setEquipo({
      ...equipo,
      cant_max: cant_max,
    });

    setTipoEquipo(tipoEquipoSeleccionado);
  };

  const handleVisibilidadEquipoChange = (e) => {
    const esPublico = e.target.value === 'publico';

    setEquipo({
      ...equipo,
      publico: esPublico,
    });
  };

  

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body className='modalEDContainer'>
        <div className=''>
          <img className='imagenEditarEquipoModal' src="/images/misEquipos/crearEquipo.jpg" alt="" />
        </div>
        <div className='modalReservaTextoContainer'>
          <h2 className='modalReservaTitulo'>Crear Equipo</h2>
          <form onSubmit={handleSubmit} className='formularioCrearEquipoContainer'>
  
            <div>
              <label className='flex gap-2 my-2'>
                <strong>Nombre del Equipo: </strong>
                <input
                  type="text"
                  name="nombreEquipo"
                  value={equipo.nombre_equipo}
                  onChange={handleNombreEquipoChange}
                  required
                  className='inputMisEquipos'
                />
              </label>
            </div>
            
            <div>
              <label className='flex gap-2 my-2'>
                <strong>Ubicación: </strong>
                <input
                  type="text"
                  name="ubicacion"
                  value={equipo.ubicacion}
                  onChange={handleUbicacionEquipoChange}
                  required
                  className='inputMisEquipos'
                />
              </label>
            </div>
            
            <div>
              <label className='my-1'>
                <select
                  name="cant_max"
                  value={tipoEquipo}
                  onChange={handleTipoEquipoChange}
                  required
                  className='elegirEquipoModalReserva'
                >
                  <option value="">Seleccionar tipo de equipo</option>
                  <option value="futbol5">Futbol 5</option>
                  <option value="futbol7">Futbol 7</option>
                  <option value="futbol11">Futbol 11</option>
                </select>
              </label>
            </div>

            <div>
            <label className='my-1'>
            <strong>Visibilidad del equipo: </strong>
              <select
                name="publico"
                value={equipo.publico ? 'publico' : 'privado'}
                onChange={handleVisibilidadEquipoChange}
                required
                className='elegirEquipoModalReserva'
              >
                <option value="publico">Publico</option>
                <option value="privado">Privado</option>
              </select>
            </label>
            {equipo.publico ? (
              <p className='mensajeCrearEquipo'>Su equipo será visible en la búsqueda de jugadores.</p>
            ) : (
              <p className='mensajeCrearEquipo'>Su equipo no será visible en la búsqueda de jugadores.</p>
            )}
            <br />
            </div>
            
        
            <div className='flex gap-3'>
                <Button type="submit" variant="primary" >Crear Equipo</Button>
                <Button variant="danger" onClick={onHide}>Cancelar</Button>
            </div>
          </form>

        </div>

        
      </Modal.Body>
    </Modal>
  );
};

export default CrearEquipo;
