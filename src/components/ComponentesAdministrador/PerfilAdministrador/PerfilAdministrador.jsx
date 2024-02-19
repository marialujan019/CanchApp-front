import React from "react";
import "./perfilAdministrador.css"; // Importa tu archivo CSS donde definirás los estilos

const PerfilAdministrador = ({ nombre, direccion, telefono, contrasena }) => {
    return (
        <div className='perfil-container'>
            <h2>Perfil</h2>
            <div className='imagen-circulo'>
                <img
                    src='https://img.a.transfermarkt.technology/portrait/big/28003-1694590254.jpg?lm=1'
                    alt=''
                />
            </div>
            <div className='perfil-datos'>
                <div>El nombre del usuar es {nombre}</div>
                <div>El telefono es {telefono}</div>
                <div>La direccion es {direccion}</div>
                <div>La contraseña es {contrasena}</div>
            </div>
        </div>
    );
};

export default PerfilAdministrador;
