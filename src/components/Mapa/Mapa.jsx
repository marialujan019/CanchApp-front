import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';
import { consultarBaseDeDatos } from '../utils/Funciones';
import Marcadores from './Marcadores/Marcadores';
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

    <div>
      <h1>Hola</h1>
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
            id_complejo={item.id_complejo}
            nombre={item.nombre}
            direccion={item.direccion}
            telefono={item.telefono}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
