import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import ModalReservas from '../ModalReservas/ModalReservas';
import axios from 'axios';
import { useUser } from '../UserContext';
import "./complejo.css"
import Carousel from 'react-bootstrap/Carousel';


const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cancha_sintetica.jpg/1200px-Cancha_sintetica.jpg',
  'https://vallealto.mx/wp-content/uploads/2021/04/IMG_0181-scaled.jpg',
  'https://obs.ucr.ac.cr/wp-content/uploads/2022/09/Cancha-de-Futbol.png',
  'https://sport-12.com/wp-content/uploads/2022/02/Cancha-Chapultepec_cuadrado.jpg',
  'https://pastosinteticoprecio.com/wp-content/uploads/2018/02/Construccion-de-Canchas-de-Futbol-7-1024x609.jpg',
];

const Complejo = () => {
  //Variable para obtener el id del complejo mediante la ruta
  const { id_complejo } = useParams();
  const { user } = useUser();
  const id_jugador = user.id

  //Variable para poner los datos del complejo y sus canchas
  const [complejo, setComplejo] = useState(null);
  const [canchas, setCanchas] = useState([]);

  //Variable para obtener el equipo
  const [equipos, setEquipos] = useState([]);


  //Variables para manejar las fechas
  const [fechas, setFechas] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  //Variable para manejar el formulario de reserva
  const [nuevaReserva, setNuevaReserva] = useState({});
  const [showModal, setShowModal] = useState(false);

  //Galeria
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (Object.keys(nuevaReserva).length > 0) {
      setShowModal(true);
    }
  }, [nuevaReserva]);
  useEffect(() => {//Esta función trae los datos de un complejo, segun el id_complejo del use params
    //O sea, toma el paramtro 1 de la url, que es el id_complejo y la envia al back
    async function fetchComplejo(id_complejo) {
      axios.get(`http://localhost:3001/complejo/${id_complejo}`).then(
        res => {
          var complejo = res.data.complejo
          if(complejo) {
            setComplejo(complejo)
          } else {
              alert("Error al obtener los datos del complejo")
          }
        })
    }

    async function fetchCanchas(id_complejo) { //Funcion para traer un json con las canchas segun el id_complejo
      axios.get(`http://localhost:3001/complejo/canchas/${id_complejo}`).then(
        res => {
          var canchas = res.data.canchas
          if(canchas) {
              setCanchas(canchas)
          } else {
              alert("Error al obtener canchas del complejo")
          }
        }
      )
      
    }

    async function fetchEquiposDelJugador(id_jugador) { //Funcion para traer un json con los equipos creados por un jugador
      const jsonDataEqipos = await axios.get(`http://localhost:3001/equipo/mis_equipos/${id_jugador}`);
      setEquipos(jsonDataEqipos.data); //setEquipos(jsonDataEqipos.data);
    }

    // Llamar a fetchFechas inicialmente para cargar fechas según la fecha seleccionada
    fetchComplejo(id_complejo);
    fetchCanchas(id_complejo);
    fetchEquiposDelJugador(id_jugador)
  }, [id_complejo]);

  // Función para obtener las fechas disponibles según la fecha seleccionada
  //Se tiene que enviar la variable fecha al back
  const fetchFechas = async (fecha) => {
    const jsonDataFechas = await axios.get(`http://localhost:3001/complejo/agenda/turnos/${id_complejo}/${fecha}`);
    setFechas(jsonDataFechas.data);
    // Verificar si la fecha seleccionada es válida
    //Esto sirve para cuando el administrador no define una fecha, 
    //si el administrador no define una cierta fecha y el jugador quiere ver esa fecha no definida, me vas a enviar "fecha_seleccionada": null, entonces pongo que no está disponible
    const fechaSeleccionadaValida = fecha === jsonDataFechas.data.fecha_seleccionada;
    if (!fechaSeleccionadaValida) {
      // Mostrar mensaje de fecha no disponible y limpiar las fechas
      setFechas(null);
    }
  };


  // Función para manejar el cambio de fecha
  const handleFechaSeleccionada = async (fecha) => {
    setFechaSeleccionada(fecha);
    // Llamar a fetchFechas para actualizar las fechas según la nueva fecha seleccionada
    fetchFechas(fecha);
  };

  if (!complejo) {
    return <div>No existe el complejo seleccionado</div>;
  }

  const renderCell = (hora, cancha) => {
    const disponibles = fechas.horario_disponibilidad[hora]?.disponibles || [];
    const ocupadas = fechas.horario_disponibilidad[hora]?.ocupadas || [];
  
    const indiceDisponible = disponibles.findIndex(item => item.id_cancha === cancha.id_cancha);

    if (disponibles.length > 0 && indiceDisponible !== -1) {
      return <button className='complejoBotonReservar' onClick={() => handleReservaClick(hora, cancha, disponibles[indiceDisponible])}>Reservar</button>;

    } else if (ocupadas.some(item => item.id_cancha === cancha.id_cancha)) {
      return "No disponible";
    } else {
      return "";
    }
  };

  //Función para crear el formulario de reserva
  const handleReservaClick = (hora, cancha, disponibles) => {
    const id_agendaDisponible = disponibles.id_agenda;
    const reserva = {
      id_jugador: id_jugador,
      id_complejo: complejo.id_complejo,
      nombre_complejo: complejo.nombre_complejo,
      direccion_complejo: complejo.direccion,
      telefono_complejo: complejo.telefono,
      id_cancha: cancha.id_cancha,
      nombre_cancha: cancha.nombre_cancha,
      fecha: fechaSeleccionada,
      hora: hora,
      id_agenda: id_agendaDisponible
    };
    console.log(id_agendaDisponible)
    setNuevaReserva(reserva);
    setShowModal(true);
  };
  

  //Funcion para cambiar formato de fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const selectedDate = new Date(dateString);
    selectedDate.setDate(selectedDate.getDate() + 1); // Sumar un día
    return selectedDate.toLocaleDateString(undefined, options);
  };
  
  
  

  return (
    <div className='ComplejoContainer main'>

      <div className='complejoHeader'>
        <h2 className='tituloComplejo text-left m-0'>{complejo.nombre_complejo}</h2>
        <p className='text-left complejoDireccion m-0'><i class="bi bi-geo-alt"></i>{complejo.direccion}</p>
      </div>

      <div className='complejoDatosContainer'>
        <div className='centradoDeCarrouselContainer'>
          <div className='carrouselContainer'>
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 imageGallery"
                    src={image}
                    alt={"si"}
                    onClick={() => handleImageClick(index)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            {selectedImage && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modalGallery">
                  <img src={selectedImage} alt="Selected" />
                </div>
              </div>
            )}
        </div>
      </div>

      <div className='centradoDeComplejoDatos'>
        <div className='complejoDatos text-left'>
          <div className='complejoAdministrador'>
            <strong className='m-0'>Administrador nombre_administrador</strong>
            <p className='m-0'>Administrador iniciante: lleva 3 meses usasndo CanchApp</p>
          </div>

          <div className='complejoDescripcion'>
            <p className='m-0'><strong>Descripcion:</strong></p>
            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem a, inventore ullam animi dolores similique error omnis iusto sapiente? Vero, alias in consequuntur ipsa autem facilis quas veniam dolorem nobis sunt, architecto asperiores distinctio enim quidem totam officia? Sit, in ducimus. Quibusdam omnis amet quia a iusto ipsum libero ipsa.</p>
          </div>

            <div className='complejoInfo'> 
              <p className='m-0'><strong>Teléfono:</strong> {complejo.telefono}</p>
              <p className='m-0'><strong>Horarios del club:</strong> horarios</p>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className='centradoDeTabla'>
        
        <div className='complejoElegirFecha'>
          <div>
           <strong><label htmlFor="fecha">Seleccione una fecha:</label></strong>
            <input type="date" id="fecha" onChange={(e) => handleFechaSeleccionada(e.target.value)} />
          </div>
        </div>
    
        <div>
        {fechas && (
          <div className='tablaContainer'>
            <h3 className='tituloTabla'>Fecha seleccionada {formatDate(fechaSeleccionada)}</h3>
            <Table removeWrapper aria-label="Tabla de fechas">
              <TableHeader isCompact className='rounded-none'>
                <TableColumn style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>Horarios</TableColumn>
                {canchas.map((cancha) => (
                  <TableColumn key={cancha.id_cancha} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>{cancha.nombre_cancha}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {Object.keys(fechas.horario_disponibilidad).map((hora) => (
                  <TableRow key={hora} className='py-0 px-0 contenidoTabla'>
                    <TableCell className='py-1 px-0'>{`${hora + ":00"}`}</TableCell>
                    {canchas.map((cancha) => (
                      <TableCell className='py-1 px-0' key={`${hora}-${cancha.id_cancha}`}>
                        {renderCell(hora, cancha)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        </div>
      </div>
      

      <ModalReservas
          show={showModal}
          onHide={() => setShowModal(false)}
          nuevaReserva={nuevaReserva}
          equipos={[]}
          origen={"complejo"}
        />
    </div>
  );
};

export default Complejo;
