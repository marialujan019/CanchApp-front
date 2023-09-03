import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Inicio from '../Inicio/Inicio';
import axios from 'axios';

function Home() {
    const [auth, setAuth] = useState(false)
    const [nombre, setNombre] = useState('')
    const [message, setMessage] = useState('')
    const [tipo, setTipo] = useState('')
    // Obtén los datos de la prop responseData en lugar de hacer una nueva solicitud GET
    const location = useLocation();
    const responseData = location.state && location.state.responseData;
   
    useEffect(()=> {
        axios.get('http://localhost:3001')
        .then(res => {
            console.log(res)
            if(res.data.Status === "Respuesta ok") {
                
                setAuth(true);
                setNombre(res.data.nombre)
            } else {
                setAuth(false);
                setMessage(res.data.message)
            }
        })
    }, [responseData])

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res=> {
            if(res.data.Status === "Respuesta ok"){
                window.location.reload(true);
            } else {
                alert('error');
            }
        }).catch(err => console.log(err))
    }
    console.log(auth)
    return(
        <div>{
                auth ?
                responseData.tipo === "administrador" ?
                <div>
                    Bienvenido a canchapp {responseData.nombre}. Acá podrás administrar tus canchas
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Salir
                    </button>
                </div> :
                <div>
                Bienvenido a canchapp {responseData.nombre}. Acá podrás encontrar y reservar tu cancha
                <button className="btn btn-danger" onClick={handleLogout}>
                    Salir
                </button>
            </div>
                :
                <div>
                    <Inicio/>
                </div>


            } 
        </div>
    )
}

export default Home;