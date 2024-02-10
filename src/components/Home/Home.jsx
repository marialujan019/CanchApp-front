import React from "react";
import Inicio from '../Inicio/Inicio';
import axios from 'axios';
import { useUser } from '../UserContext';

import Administrador from "../Perfil/Administrador";
import InicioSesion from "../InicioSesion/InicioSesion";


function Home() {
    const { user } = useUser();
    console.log(user)
    const handleLogout = () => {
        
        axios.get('http://localhost:3001/logout')
        .then(res=> {
            if(res.data.Status === "Respuesta ok"){
                console.log(res.data)
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
                    <InicioSesion nombre_usuario={user.nombre} id={user.id}/>
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