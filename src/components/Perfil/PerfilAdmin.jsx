const PerfilAdmin = ({nombre, direccion, telefono}) => {

    return (
        <div>
            <div className="card-content">
                <h2>Mi perfil de administrador</h2>               
            </div>
            <div>
                El nombre del complejo es {nombre}
            </div>
            <div>
                El telefono es {telefono}
            </div>
            <div>
                La direccion es {direccion}
            </div>
        </div>
    ); 
}

export default PerfilAdmin;