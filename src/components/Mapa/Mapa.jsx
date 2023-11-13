import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';
import { Link } from 'react-router-dom';
import { consultarBaseDeDatos } from '../utils/Funciones';
import Marcadores from '../Marcadores/Marcadores';
import { Icon } from 'leaflet';




const customIcon = new Icon({
  iconUrl: "/images/mapa/marcador.png",
  iconSize: [38, 38]
});

const Mapa = () => {
    const position = [-27.4613063, -58.984803];

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const jsonData = await consultarBaseDeDatos('../json/popups.json'); 
            setData(jsonData);
        }

        fetchData();
    }, []);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='mapa'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item) => (
        <Marcadores
          key={item.id}
          position={[parseFloat(item.latitud), parseFloat(item.longitud)]}
          customIcon={customIcon}
          idCancha={item.idCancha}
          nombre={item.nombre}
          direccion={item.direccion}
          telefono={item.telefono}
        />
      ))}
    </MapContainer>
  );
};

export default Mapa;
