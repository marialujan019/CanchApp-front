const PerfilJugador = ({nombre,  telefono, piernaHabil, posicion}) => {
    return (
        <div>
        <div className="card-content">
            <h2>Mi perfil </h2>               
        </div>
        <div>
            Mi nombre es {nombre}
        </div>
        <div>
            Llamame al {telefono}
        </div>
        <div>
            Soy {piernaHabil} para jugar
        </div>
        <div>
            Me gusta jugar de {posicion}
        </div>
    </div>
    ); 
}

export default PerfilJugador;