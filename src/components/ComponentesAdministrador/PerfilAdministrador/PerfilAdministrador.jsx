import React from "react";
import "./perfilAdministrador.css"; // Importa tu archivo CSS donde definirás los estilos
import { Button } from "@nextui-org/react";

const PerfilAdministrador = ({
    nombre,
    direccion,
    telefono,
    contrasena,
    email,
}) => {
    return (
        <div className='container'>
            <div className='subContainer'>
                <section className='userProfile'>
                    <div className='profile'>
                        <img
                            className='imagenPerfil'
                            src='https://img.a.transfermarkt.technology/portrait/big/28003-1694590254.jpg?lm=1'
                            alt='profile'
                        />
                    </div>
                    <Button
                        className='BotonPerfil'
                        color='success'
                        variant='faded'
                    >
                        Cambiar imagen
                    </Button>
                </section>

                <section className='work_skills textoPerfilImportante'>
                    <p className='nombre'>
                        <strong>{nombre} Martinez</strong>
                    </p>
                    <p>
                        <strong>Rol: Administrador</strong>
                    </p>
                    <p>
                        <strong>¡Llevas 3 meses usando Canchapp!</strong>
                    </p>
                </section>

                <section className='timeline_about text-left'>
                    <div className='perfil-cuenta'>
                        <h2 className='tituloPerfil flex'>
                            Información personal
                            <button>
                                <i class='editarPerfil bi bi-pencil'></i>
                            </button>
                        </h2>
                        <div className='contenedorTextoPerfil'>
                            <p className='textoPerfil'>
                                <strong>Correo electrónico: </strong>
                                {email}
                            </p>
                            <p className='textoPerfil'>
                                {" "}
                                <strong>Teléfono: </strong>
                                {telefono}
                            </p>
                            <p className='textoPerfil'>
                                <strong>Dirección: </strong>
                                {direccion}
                            </p>
                            <p className='textoPerfil'>
                                <strong>Contraseña: </strong>
                                {contrasena}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PerfilAdministrador;
