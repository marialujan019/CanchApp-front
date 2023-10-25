import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [nombre, setNombre] = useState('')
  const [message, setMessage] = useState('')  
  const [tipo, setTipo] = useState('');
  const [id, setId] = useState('');

  useEffect(()=> {
    axios.get('http://localhost:3001')
    .then(res => {
        if(res.data.Status === "Respuesta ok") {    
            setAuth(true);
            setNombre(res.data.nombre)
            setId(res.data.id)
            setTipo(res.data.tipo)
        } else {
            setAuth(false);
            setMessage(res.data.message)
        }
    })
  })

  const initialState = {
    id: id,
    tipo: tipo,
    auth: auth,
    nombre: nombre
  }

  console.log(initialState)
  const [user, setUser] = useState(initialState); // Define initialState según tus necesidades

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
