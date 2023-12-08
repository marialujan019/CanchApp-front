import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CrearEquipo = ({ show, onHide, updateMisEquipos, equiposYaCreados }) => {
  const [equipo, setEquipo] = useState({
    nombre_equipo: '',
    publico: false,
    max_jug: 0,
  });

  const handleSubmit = (e) => {
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
    setEquipo({
      nombre_equipo: '',
      publico: false,
      max_jug: 0,
    });
    onHide();
    updateMisEquipos();
  };

  const handleNombreEquipoChange = (e) => {
    setEquipo({
      ...equipo,
      nombre_equipo: e.target.value,
    });
  };

  const handleTipoEquipoChange = (e) => {
    const tipoEquipo = e.target.value;
    let maxJug = 0;

    // Asignar el valor adecuado a max_jug según el tipo de equipo seleccionado
    switch (tipoEquipo) {
      case 'futbol5':
        maxJug = 10;
        break;
      case 'futbol7':
        maxJug = 14;
        break;
      case 'futbol11':
        maxJug = 22;
        break;
      default:
        break;
    }

    setEquipo({
      ...equipo,
      max_jug: maxJug,
    });
  };

  const handleVisibilidadEquipoChange = (e) => {
    const esPublico = e.target.value === 'publico';

    setEquipo({
      ...equipo,
      publico: esPublico,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jugadores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2>Crear Equipo</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre del Equipo:
              <input
                type="text"
                name="nombreEquipo"
                value={equipo.nombre_equipo}
                onChange={handleNombreEquipoChange}
                required
              />
            </label>
            <label>
              Seleccione el tipo de equipo:
              <select
                name="max_jug"
                value={equipo.max_jug === 0 ? '' : equipo.max_jug}
                onChange={handleTipoEquipoChange}
                required
              >
                <option value="" disabled>
                  Seleccionar tipo de equipo
                </option>
                <option value="futbol5">Futbol 5</option>
                <option value="futbol7">Futbol 7</option>
                <option value="futbol11">Futbol 11</option>
              </select>
            </label>
            <label>
              ¿Su equipo es público o privado?
              <select
                name="publico"
                value={equipo.publico ? 'publico' : 'privado'}
                onChange={handleVisibilidadEquipoChange}
                required
              >
                <option value="publico">Publico</option>
                <option value="privado">Privado</option>
              </select>
            </label>
            {equipo.publico ? (
              <p>Su equipo será visible en la búsqueda de jugadores.</p>
            ) : (
              <p>Su equipo no será visible en la búsqueda de jugadores.</p>
            )}
            <br />
            <button type="submit">Crear Equipo</button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearEquipo;
