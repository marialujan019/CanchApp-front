import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../Inicio/Inicio';
import axios from 'axios';

function Home() {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    useEffect(()=> {
        axios.get('http://localhost:3001')
        .then(res => {
            if(res.data.Status === "Respuesta ok") {
                setAuth(true);
                setName(res.data.nombre)
            } else {
                setAuth(false);
                setMessage(res.data.message)
            }
        })
    }, [])

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
                <div>
                    Aca se muestra el home del user o administrador {name}
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