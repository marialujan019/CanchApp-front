import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import Inicio from '../Inicio/Inicio';
import axios from 'axios';
import { useUser } from '../UserContext';

import Administrador from "../Perfil/Administrador";

function Home() {
    const { user } = useUser();
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

    return(
        <div>{
            user.auth ?
                (user?.tipo === "administrador" ?
                <div>
                    <Administrador idAdmin={user.id} />
                </div>
                
                :
                <div>
                    Bienvenido a canchapp {user.nombre}. Acá podrás encontrar y reservar tu cancha
                    <div>
                        <button className="btn btn-danger" onClick={handleLogout}>
                        Salir
                        </button>
                    </div>
                </div>)
                :
                <div>
                    <Inicio/>
                </div>


            } 
        </div>
    )
}

export default Home;