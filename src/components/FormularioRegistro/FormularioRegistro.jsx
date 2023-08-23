import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormularioRegistro = () => {
    const datosFormulario = useRef();
    const navigate = useNavigate();
    
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleAdminForm = () => {
        setIsAdmin(!isAdmin);
    };

    const validarContraseñas = () => {
        const contrasenia = datosFormulario.current.contrasenia.value;
        const repetirContrasenia = datosFormulario.current.repetirContrasenia.value;
        
        if (contrasenia !== repetirContrasenia) {
            alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
            return false;
        }
        
        return true;
    };

    const validarEmails = () => {
        const email = datosFormulario.current.email.value;
        const repetirEmail = datosFormulario.current.repetirEmail.value;
        
        if (email !== repetirEmail) {
            alert("Los correos electrónicos no coinciden. Por favor, inténtelo de nuevo.");
            return false;
        }
        
        return true;
    };

    const consultarFormulario = (e) => {
        e.preventDefault();

        if (!validarContraseñas() || !validarEmails()) {
            return;
        }

        const data = new FormData(datosFormulario.current);
        const cliente = Object.fromEntries(data);
        const tipoUsuario = isAdmin ? "administrador" : "jugador";

        const usuarioObjeto = {
            usuario: tipoUsuario,
            ...cliente,
        };

        console.log(usuarioObjeto);

        e.target.reset();
        
        if (isAdmin) {
            alert("Administrador registrado");
        } else {
            alert("Usuario registrado");
        }
        
        navigate("/");
    };

    return (
        <div>
            <label>
                <input type="checkbox" onChange={toggleAdminForm} />
                Registrarse como Administrador
            </label>
            
            <form onSubmit={consultarFormulario} ref={datosFormulario}>
                {isAdmin ? 
                    <div>
                    <h2>Datos del complejo</h2>
                        <div>
                            <label htmlFor="nombreDelComplejo">Nombre del complejo</label>
                            <input type="text" name="nombreDelComplejo" id="" />
                        </div>
                        <div>
                            <label htmlFor="cuit">CUIT</label>
                            <input type="number" name="cuit" id="" />
                        </div>
                        <div>
                            <label htmlFor="ciudad">Ciudad</label>
                            <input type="ciudad" name="ciudad" id="" />
                        </div>
                        <div>
                            <label htmlFor="calle">Calle del complejo</label>
                            <input type="text" name="calle" id="" />
                        </div>
                        <div>
                            <label htmlFor="altura">Altura</label>
                            <input type="number" name="altura" id="" />
                        </div>
                        <div>
                            <label htmlFor="telefono">Ingrese su numero de telefono</label>
                            <input type="number" name="telefono" id="telefono" />
                        </div>

                    <h2>Datos del administrador</h2>
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" name="apellido" id="apellido" />
                    </div>
                    <div>
                        <label htmlFor="email">Ingrese su correo electronico</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="repetirEmail">Repetir Correo Electronico</label>
                        <input type="email" name="repetirEmail" id="repetirEmail" />
                    </div>
                    <div>
                        <label htmlFor="telefono">Ingrese su numero de telefono o celular</label>
                        <input type="number" name="telefono" id="telefono" />
                    </div>
                    <div>
                        <label htmlFor="contrasenia">Contraseña</label>
                        <input type="password" name="contrasenia" id="contrasenia" />
                    </div>
                    <div>
                        <label htmlFor="repetirContrasenia">Repetir Contraseña</label>
                        <input type="password" name="repetirContrasenia" id="repetirContrasenia" />
                    </div>
                </div>
                : 
                <div>
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" name="apellido" id="apellido" />
                    </div>
                    <div>
                        <label htmlFor="sexo">Sexo</label>
                        <div>
                            <input type="radio" name="sexo" id="hombre" value="Hombre" />
                            <label htmlFor="hombre">Hombre</label>
                        </div>
                        <div>
                            <input type="radio" name="sexo" id="mujer" value="Mujer" />
                            <label htmlFor="mujer">Mujer</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="nacimiento">Nacimiento</label>
                        <input type="date" name="nacimiento" id="nacimiento" />
                    </div>
                    <div>
                        <label htmlFor="email">Ingrese su correo electronico</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="repetirEmail">Repetir Correo Electronico</label>
                        <input type="email" name="repetirEmail" id="repetirEmail" />
                    </div>
                    <div>
                        <label htmlFor="telefono">Ingrese su numero de telefono o celular</label>
                        <input type="number" name="telefono" id="telefono" />
                    </div>
                    <div>
                        <label htmlFor="contrasenia">Contraseña</label>
                        <input type="password" name="contrasenia" id="contrasenia" />
                    </div>
                    <div>
                        <label htmlFor="repetirContrasenia">Repetir Contraseña</label>
                        <input type="password" name="repetirContrasenia" id="repetirContrasenia" />
                    </div>
                </div>
                }

                <button type="submit">Finalizar registro</button>
            </form>
        </div>
    );
};

export default FormularioRegistro;
