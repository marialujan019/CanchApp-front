import React, {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Popup, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './mapa.css';
import { Link } from 'react-router-dom';
import { Icon } from 'leaflet';


const Mapa = () => {

    const customIcon = new Icon ({
        iconUrl: "/images/mapa/marcador.png",
        iconSize: [38,38]
    });
    
    const position = [-27.4613063, -58.984803]

    return (
        
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='mapa'>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
            <Popup>
                <Link to={"/ingreso"}>Hola</Link>
            </Popup>
        </Marker>
        </MapContainer>

    );
}

export default Mapa;
