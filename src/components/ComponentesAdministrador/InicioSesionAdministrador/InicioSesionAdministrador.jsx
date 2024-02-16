import React from "react";
import CardInicio from "../../Inicio/cardInicio/CardInicio";
import { Link } from "react-router-dom";

const InicioSesionAdministrador = ({ idAdmin, nombre_usuario }) => {
    const cardData = [
        {
            id: 1,
            title: "Mi complejo",
            description: "Acá podes admistrar tu complejo.",
            image: "/images/inicioSesion/buscarCancha.jpg",
            link: "/MiComplejo",
        },
        {
            id: 2,
            title: "Mis canchas",
            description: "Acá podrás crear y editar las canchas de tu complejo",
            image: "/images/inicioSesion/misEquipos.jpg",
            link: "/MisCanchas",
        },
        {
            id: 3,
            title: "Reservas",
            description: "Acá podes administrar las reservas de tu complejo",
            image: "/images/inicioSesion/buscarEquipo.jpg",
            link: "/Calendario",
        },
    ];

    return (
        <div className="inicioSesionContainer">
            <div className="inicioSeccionBienvenida">
                <h1 className="inicioSesionTitulo">
                    ¡Bienvenido a canchapp, {nombre_usuario}!
                </h1>
                <strong>
                    <p className="inicioSesionTextoBienvenida">
                        ¿Qué quieres hacer hoy?
                    </p>
                </strong>
            </div>

            <div className="cardInicioSesionContainer">
                {cardData.map((card) => (
                    <nav className="navCardInicioSesion" key={card.id}>
                        <Link
                            className="linkCardInicioSesion"
                            to={`${card.link}`}
                        >
                            <CardInicio
                                imagenSrc={card.image}
                                titulo={card.title}
                                descripcion={card.description}
                                className="cardInicioSesion"
                            />
                        </Link>
                    </nav>
                ))}
            </div>
        </div>
    );
};

export default InicioSesionAdministrador;
