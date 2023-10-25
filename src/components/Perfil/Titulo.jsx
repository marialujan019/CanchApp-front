import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';


const Titulo = () => {
    const { user } = useUser();


   
    return(
        <div>
            Bienvenido a Canchapp {user.nombre}!
        </div>
    );
};

export default Titulo;