import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { consultarBaseDeDatos } from '../utils/Funciones';

const Complejo = () => {
  const { id_complejo } = useParams();
  const [complejo, setComplejo] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [fechas, setFechas] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  useEffect(() => {
    async function fetchComplejo() { //Función para obtener el JSON del complejo desde el back
      const jsonDataComplejo = await consultarBaseDeDatos('../json/complejo.json');
      const complejoSeleccionado = jsonDataComplejo.id_complejo === id_complejo;
      setComplejo(complejoSeleccionado ? jsonDataComplejo : null);
    }

    async function fetchCanchas() { //Función para obtener el JSON de las canchas desde el back
      const jsonDataCanchas = await consultarBaseDeDatos('../json/canchasDeUnComplejo.json');
      setCanchas(jsonDataCanchas.filter(cancha => cancha.id_complejo === id_complejo));
    }

    async function fetchFechas() { //Función para obtener el JSON de las fechas disponibles desde el back
      const jsonDataFechas = await consultarBaseDeDatos('../json/fechas.json');
      setFechas(jsonDataFechas);
    }

    fetchComplejo();
    fetchCanchas();
    fetchFechas();
  }, [id_complejo]);

  //Esta es la función que se debe modificar para enviar la fecha al back y recibir nuevamente el JSON de las fechas disponibles
  const handleFechaSeleccionada = async (fecha) => {
    setFechaSeleccionada(fecha); //Esto se envia al back
    const jsonDataFechas = await consultarBaseDeDatos('../json/fechas.json'); //Esto se recibe
    setFechas(jsonDataFechas);
  };

  if (!complejo) {
    return <div>No existe el complejo seleccionado</div>;
  }

  const horarios = fechas?.horario_disponibilidad ? Object.keys(fechas.horario_disponibilidad) : [];
  const disponibilidadPorCancha = canchas.map(cancha => ({
    cancha: cancha.nombre_cancha,
    disponibilidad: horarios.map(hora => ({
      hora,
      disponible: fechas?.horario_disponibilidad[hora]?.disponibles.includes(Number(cancha.id_cancha)),
    })),
  }));

  //Función para crear el formulario de reserva
  const handleReservaClick = (hora, canchas) => {
    const nuevaReserva = {
      id_complejo: complejo.id_complejo,
      nombre_complejo: complejo.nombre,
      direccion_complejo: complejo.direccion,
      telefono_complejo: complejo.telefono,
      id_cancha: canchas.id_cancha,
      nombre_cancha: canchas.nombre_cancha,
      fecha: fechaSeleccionada,
      hora: hora,
    };
    
    console.log(nuevaReserva)
    // Obtener las reservas existentes o inicializar un nuevo array
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
    // Verificar duplicados
    const esDuplicado = reservas.some(
      (reserva) =>
        reserva.id_complejo === nuevaReserva.id_complejo &&
        reserva.id_cancha === nuevaReserva.id_cancha &&
        reserva.fecha === nuevaReserva.fecha &&
        reserva.hora === nuevaReserva.hora
    );
  
    if (esDuplicado) {
      console.log('¡Reserva duplicada!');
      return;
    }
  
    // Verificar límite de reservas (10 reservas máximas)
    if (reservas.length >= 10) {
      console.log('¡Has alcanzado el límite de 10 reservas!');
      return;
    }
  
    // Agregar la nueva reserva al array
    reservas.push(nuevaReserva);
  
    // Guardar el array actualizado en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

  };

  return (
    <div>
      <div className='Complejo'>
        <h2>{complejo.nombre}</h2>
        <p>Dirección: {complejo.direccion}</p>
        <p>Teléfono: {complejo.telefono}</p>
        <p>Descripcion: {complejo.descripcion}</p>
      </div>

      <div>
        <label htmlFor="fecha">Seleccione una fecha:</label>
        <input type="date" id="fecha" onChange={(e) => handleFechaSeleccionada(e.target.value)} />
      </div>

      <div className='Grilla'>
        <h3>Grilla de Disponibilidad</h3>
        <table>
          <thead>
            <tr>
              <th>Horarios</th>
              {canchas.map(cancha => (
                <th key={cancha.id_cancha}>Cancha {cancha.nombre_cancha}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {fechaSeleccionada ? (
              horarios.map(hora => (
                <tr key={hora}>
                  <td>{hora}</td>
                  {disponibilidadPorCancha.map((cancha, i) => ( // Agregar el índice i como segundo parámetro
                    <td key={cancha.cancha}>
                      {cancha.disponibilidad.find(item => item.hora === hora)?.disponible ? (
                        <button onClick={() => handleReservaClick(hora, canchas[i])}>Reservar</button>
                      ) : 
                      ('No disponible')
                      }
                  </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canchas.length + 1}>Seleccione una fecha</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Complejo;
