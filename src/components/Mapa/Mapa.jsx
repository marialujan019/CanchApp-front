import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';
import { Icon } from 'leaflet';
import axios from 'axios';
import Marcadores from './Marcadores/Marcadores';
import CardComplejos from './CardComplejos/CardComplejos';
import { Input } from '@nextui-org/react';

const customIcon = new Icon({
  iconUrl: "/images/mapa/marcador.png",
  iconSize: [38, 38]
});


const Mapa = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapPosition, setMapPosition] = useState([-27.4613063, -58.984803]);
  const [mapZoom, setMapZoom] = useState(13);
  const markerRefs = useRef({});
  const [currentSection, setCurrentSection] = useState('mapaSeccion1');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await axios.get('http://localhost:3001/popups');
      setData(jsonData.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const newMarkerRefs = {};
    data.forEach((item) => {
      newMarkerRefs[item.id_complejo] = markerRefs.current[item.id_complejo];
    });
    markerRefs.current = newMarkerRefs;
  }, [data]);

  const cambiarPosicionZoom = (latitud, longitud, nuevoZoom, id_complejo) => {
    setMapPosition([latitud, longitud]);
    setMapZoom(nuevoZoom);
    setTimeout(() => {
      const marker = markerRefs.current[id_complejo];
      if (marker) {
        marker.openPopup();
      }
    }, 0);
  };

  const filteredComplejos = data.filter(complejo =>
    complejo.nombre_complejo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = () => {
    setCurrentSection((prevSection) =>
      prevSection === 'mapaSeccion1' ? 'mapaSeccion2' : 'mapaSeccion1'
    );
  };

  return (
    <div className=''>
      <div>
        <Input
          style={{ padding: '0' }}
          className='busquedaComplejoMapa p-0	'
          type="text"
          placeholder="Buscá tu complejo acá"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small"><i class="bi bi-search"></i></span>
            </div>
          }
        />
      </div>

      {isMobile ? (
        <div>
          <div className='mobileButtons'>
            <button onClick={toggleSection}>
              {currentSection === 'mapaSeccion1' ? 'Ver mapa' : 'Ver complejos'}
            </button>
          </div>
          <div>
            
          </div>
          <section className={isMobile ? 'mapaMobile' : (currentSection === 'mapaSeccion1' ? 'mapaSeccion1' : 'mapaSeccion2')}>
            {currentSection === 'mapaSeccion1' && <CardComplejos complejos={filteredComplejos} cambiarPosicionZoom={cambiarPosicionZoom} />}
          </section>
          {currentSection === 'mapaSeccion2' && (
            <div className='mapaContainerMobile'>
              <section className={isMobile ? 'mapaMobile' : 'mapaSeccion2'}>
                <MapContainer key={`${mapPosition[0]}_${mapPosition[1]}_${mapZoom}`} center={[-27.4613063, -58.984803]} zoom={13} scrollWheelZoom={false} className='mapa'>
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
                      nombre={item.nombre_complejo}
                      direccion={item.direccion}
                      telefono={item.telefono}
                      markerRefs={markerRefs}
                    />
                  ))}
                </MapContainer>
              </section>
            </div>
          )}
        </div>
          
      
      ) : (
        <div className='mapaContainer'>
          <section className='mapaSeccion1'>
            <CardComplejos complejos={filteredComplejos} cambiarPosicionZoom={cambiarPosicionZoom} />
          </section>
          <section className='mapaSeccion2'>
            <MapContainer key={`${mapPosition[0]}_${mapPosition[1]}_${mapZoom}`} center={mapPosition} zoom={mapZoom} scrollWheelZoom={false} className='mapa'>
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
                  nombre={item.nombre_complejo}
                  direccion={item.direccion}
                  telefono={item.telefono}
                  markerRefs={markerRefs}
                />
              ))}
            </MapContainer>
          </section>
        </div>
      )}
    </div>
  );
};

export default Mapa;
