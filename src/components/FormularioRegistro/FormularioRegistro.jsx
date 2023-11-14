import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponenteInput from "../input/ComponenteInput";
import "./formularioRegistro.css"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { LocationIQProvider } from 'leaflet-geosearch';

const FormularioRegistro = () => {
    //Estados para controlar el valor de los input

    //Datos del complejo
    const [nombreComplejo, cambiarNombreComplejo] = useState({campo:"", valido: null})
    const [cuit, cambiarCuit] = useState({campo:"", valido: null})
    const [calle, cambiarCalle] = useState({ campo: "", valido: null });
    const [altura, cambiarAltura] = useState({ campo: "", valido: null });
    const [provincia, cambiarProvincia] = useState({ campo: "", valido: null });
    const [ciudad, cambiarCiudad] = useState({ campo: "", valido: null });
    const [telefono, cambiarTelefono] = useState({campo:"", valido: null})

    //Datos del jugador-administrador
    const [nombre, cambiarNombre] = useState({campo:"", valido: null})
    const [apellido, cambiarApellido] = useState({campo:"", valido: null})
    const [email1, cambiarEmail1] = useState({campo:"", valido: null})
    const [email2, cambiarEmail2] = useState({campo:"", valido: null})
    const [celular, cambiarCelular] = useState({campo:"", valido: null})
    const [contrasenia1, cambiarContrasenia1] = useState({campo:"", valido: null})
    const [contrasenia2, cambiarContrasenia2] = useState({campo:"", valido: null})

    //API mapa
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const locationiqProvider = new LocationIQProvider({
        params: {
        key: 'pk.79ec038c6078903d6573f59fbc11b4f9'
        },
    });

    //funcion para obtener latitud y longitud
    const obtenerDireccion = async (calle, altura, provincia, ciudad) => {
        try {
            // Create the desired address format
            const direccionCompleta = `${calle} ${altura}, Argentina, ${provincia}, ${ciudad}`;
            
            const results = await locationiqProvider.search({ query: direccionCompleta });
            if (results && results.length > 0) {
                const { y: latitude, x: longitude } = results[0];
                return { latitude, longitude };
            } else {
                // Handle an error or return a default value
                return null;
            }
        } catch (error) {
            console.error('Error al buscar la ubicación:', error);
            return null;
        }
    };
        
    //Expresiones regulares
    const expresiones = {
        usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,25}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        numero: /^[0-9]+$/
    }


    
    //Funcion para validar que la segunda contraseña sea igual a la primera
    const validarContrasenia2 = () => {
        if (contrasenia1.campo.length > 0) {
            if (contrasenia1.campo !== contrasenia2.campo) {
                cambiarContrasenia2((estadoPrevio) => ({ ...estadoPrevio, valido: false }));
            } else {
                cambiarContrasenia2((estadoPrevio) => ({ ...estadoPrevio, valido: true }));
            }
        } else {
            cambiarContrasenia2((estadoPrevio) => ({ ...estadoPrevio, valido: null }));
        }
    };

    //Funcion para validar que el segundo email sea igual a la primera
    const validarEmail2 = () => {
        if (email1.campo.length > 0) {
            if (email1.campo !== email2.campo) {
                cambiarEmail2((estadoPrevio) => ({ ...estadoPrevio, valido: false }));
            } else {
                cambiarEmail2((estadoPrevio) => ({ ...estadoPrevio, valido: true }));
            }
        } else {
            cambiarEmail2((estadoPrevio) => ({ ...estadoPrevio, valido: null }));
        }
    };


    //FUNCIONES DE ENVIO DE FORMULARIO

    //Guardo el formulario
    const datosFormulario = useRef();
    const navigate = useNavigate();
    
    //Estado para saber si quien se registra es administrador o no
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleAdminForm = () => {
        setIsAdmin(!isAdmin);
    };

    //Funcion para tomar los datos ingresados como objeto
    axios.defaults.withCredentials = true;
    const consultarFormulario = async (e) => {
        e.preventDefault();

        const data = new FormData(datosFormulario.current);
        const cliente = Object.fromEntries(data);
        const tipoUsuario = isAdmin ? "administrador" : "jugador";
        
        //Llamado a la funcion para obtener latitud y longitud
        const coordinates = await obtenerDireccion(calle.campo, altura.campo, provincia.campo, ciudad.campo);
    
        const usuarioObjeto = {
            usuario: tipoUsuario,
            ...cliente,
            latitud: coordinates ? coordinates.latitude : null,
            longitud: coordinates ? coordinates.longitude : null,
        };
    
        console.log(usuarioObjeto);
        console.log(usuarioObjeto);

        //Se modifcan los campos para que matcheen con la ddbb. Mejorar!
        usuarioObjeto.mail = usuarioObjeto.email1
        usuarioObjeto.contrasena = usuarioObjeto.contrasenia1
        usuarioObjeto.fecha_nac = usuarioObjeto.nacimiento
        usuarioObjeto.telefonoComplejo = usuarioObjeto.telefono
        usuarioObjeto.telefono = usuarioObjeto.celular
        usuarioObjeto.tipo = usuarioObjeto.usuario
        delete usuarioObjeto.contrasenia1
        delete usuarioObjeto.contrasenia2
        delete usuarioObjeto.email1
        delete usuarioObjeto.email2
        delete usuarioObjeto.nacimiento
        delete usuarioObjeto.celular
        delete usuarioObjeto.usuario

        if(isAdmin){
            var complejo = {
                nombreComplejo: usuarioObjeto.nombreComplejo,
                cuit: usuarioObjeto.cuit,
                ciudad: usuarioObjeto.ciudad,
                direccion: usuarioObjeto.calle + " " + usuarioObjeto.altura,
                telefonoComplejo: usuarioObjeto.telefonoComplejo,
              };
              
              console.log(complejo)
              // Crear el objeto administrador
              var administrador = {
                nombre: usuarioObjeto.nombre,
                apellido: usuarioObjeto.apellido,
                mail: usuarioObjeto.mail,
                contrasena: usuarioObjeto.contrasena,
                telefono: usuarioObjeto.telefono
              };
              console.log(administrador)
              // Crear el objeto data que contiene los objetos complejo y administrador
              var dataAdmin = {
                complejo: complejo,
                administrador: administrador
              };

        }

        e.target.reset();
        console.log(dataAdmin);

        if (isAdmin) {
            axios.post('http://localhost:3001/complejo', dataAdmin)
            .then(res => {
                console.log(res)
                if(res.data.message === "Created"){
                    alert("Administrador registrado"); //Poner mesajes con sweet alert
                    navigate('/home')
                } else {
                    alert(res.data.Message)
                }
            })
            .catch(err => console.log(err))
           
        } else {
            axios.post('http://localhost:3001/registro', usuarioObjeto)
            .then(res => {
                console.log(res)
                if(res.data.message === "Created"){
                    alert("Usuario registrado");
                    navigate('/home')
                } else {
                    alert(res.data.Message)
                }
            })
            .catch(err => console.log(err))
        }
        
    };

    return (
        <div className="formularioContainer">
                <div className="switch-container">
                    <label className="formularioLabelCheckAdmin">
                        Registrarse como Administrador
                        <input type="checkbox" onChange={toggleAdminForm} className="formularioInputCheckAdmin"/>
                        <div className="switch"></div>
                    </label>
                </div>


                {isAdmin ? 
                    <div className='formularioContainer2'>
                        <form onSubmit={consultarFormulario} ref={datosFormulario} className="formularioRegistro">
                        <h2 className="formularioTituloRegistro">Datos del complejo</h2>
                        <div className="formularioRegistroInputs">
                            <ComponenteInput
                                tipo="text"
                                label="Nombre del complejo"
                                placeholder="Ej: Pepito"
                                idHTMLName="nombreComplejo"
                                leyendaError="Nombre de más de 4 letras"
                                expresionRegular={expresiones.nombre}
                                estado={nombreComplejo}
                                cambiarEstado={cambiarNombreComplejo}
                            />
                            <ComponenteInput
                                tipo="number"
                                label="CUIT"
                                placeholder="Ej: 3123"
                                idHTMLName="cuit"
                                leyendaError="Cuit"
                                expresionRegular={expresiones.telefono}
                                estado={cuit}
                                cambiarEstado={cambiarCuit}
                            />
                            <ComponenteInput
                                tipo="text"
                                label="Provincia"
                                placeholder="Ej: Chaco"
                                idHTMLName="provincia"
                                leyendaError="provincia"
                                expresionRegular={expresiones.nombre}
                                estado={provincia}
                                cambiarEstado={cambiarProvincia}
                            />
                            <ComponenteInput
                                tipo="text"
                                label="Ciudad"
                                placeholder="Ej: Resistencia"
                                idHTMLName="ciudad"
                                leyendaError="Ciudad"
                                expresionRegular={expresiones.nombre}
                                estado={ciudad}
                                cambiarEstado={cambiarCiudad}
                            />
                            <ComponenteInput
                                tipo="text"
                                label="Calle"
                                placeholder="Ej: Edison"
                                idHTMLName="calle"
                                leyendaError="calle"
                                expresionRegular={expresiones.nombre}
                                estado={calle}
                                cambiarEstado={cambiarCalle}
                            />
                            <ComponenteInput
                                tipo="number"
                                label="Altura"
                                placeholder="Ej: 3123"
                                idHTMLName="altura"
                                leyendaError="Altura"
                                expresionRegular={expresiones.numero}
                                estado={altura}
                                cambiarEstado={cambiarAltura}
                            />
                            <ComponenteInput
                                tipo="number"
                                label="Telefono o celular del local"
                                placeholder="Ej: 3624657745"
                                idHTMLName="telefono"
                                leyendaError="telefono"
                                expresionRegular={expresiones.telefono}
                                estado={telefono}
                                cambiarEstado={cambiarTelefono}
                            />
                        </div>
                        
                        <h2 className="formularioTituloRegistro">Datos del administrador</h2>
                        <div className="formularioRegistroInputs">
                            <ComponenteInput
                                tipo="text"
                                label="Nombre"
                                placeholder="Ej: Mirtha"
                                idHTMLName="nombre"
                                expresionRegular={expresiones.nombre}
                                estado={nombre}
                                cambiarEstado={cambiarNombre}
                            />
                            <ComponenteInput
                                tipo="text"
                                label="Apellido"
                                placeholder="Ej: Legrand"
                                idHTMLName="apellido"
                                expresionRegular={expresiones.nombre}
                                estado={apellido}
                                cambiarEstado={cambiarApellido}
                            />
                            <ComponenteInput
                                tipo="email"
                                label="Correo electrónico"
                                placeholder="ejemplo@gmail.com"
                                idHTMLName="email1"
                                leyendaError="correo electronico"
                                expresionRegular={expresiones.correo}
                                estado={email1}
                                cambiarEstado={cambiarEmail1}
                            />
                            <ComponenteInput
                                tipo="email"
                                label="Repetir correo electrónico"
                                placeholder="ejemplo@gmail.com"
                                idHTMLName="email2"
                                leyendaError="Las correos deben ser iguales"
                                expresionRegular={expresiones.correo}
                                estado={email2}
                                cambiarEstado={cambiarEmail2}
                                funcionValidarDoble={validarEmail2}
                                //Desactiva el campo de email2 si email1.campo (el input de email1) está vacío
                                disabled={email1.campo === ""}
                            />
                            <ComponenteInput
                                tipo="password"
                                label="Contraseña"
                                placeholder=""
                                idHTMLName="contrasenia1"
                                leyendaError="contraseña de mas de 3 caracteres"
                                expresionRegular={expresiones.password}
                                estado={contrasenia1}
                                cambiarEstado={cambiarContrasenia1}
                            />
                            <ComponenteInput
                                tipo="password"
                                label="Repetir contraseña"
                                placeholder=""
                                idHTMLName="contrasenia2"
                                leyendaError="Las contraseñas deben ser iguales"
                                expresionRegular={expresiones.password}
                                estado={contrasenia2}
                                cambiarEstado={cambiarContrasenia2}
                                funcionValidarDoble={validarContrasenia2}
                                //Desactiva el campo de contrasenia2 si contrasenia1.campo (el input de contrasenia1) está vacío
                                disabled={contrasenia1.campo === ""}
                            />                           
                            <ComponenteInput
                                tipo="number"
                                label="Celular"
                                placeholder="Ej: 3625475267"
                                idHTMLName="celular"
                                leyendaError="Celular"
                                expresionRegular={expresiones.telefono}
                                estado={celular}
                                cambiarEstado={cambiarCelular}
                            />
                        </div>

                        {/* Boton de enviar formulario*/}
                        <div className='formularioBotonSubmitcontainer'>
                            <button className='formularioIngresoBotonRegistro'type="submit" > Finalizar registro </button>
                        </div>
                        </form>
                    </div>
                : 
                <div className="formularioContainer2">
                    
                    <form onSubmit={consultarFormulario} ref={datosFormulario} className="formularioRegistro">
                    <h2 className="formularioTituloRegistro">Datos del jugador</h2>
                    <div className="formularioRegistroInputs">
                        <ComponenteInput
                            tipo="text"
                            label="Nombre"
                            placeholder="Ej: Emmanuel"
                            idHTMLName="nombre"
                            expresionRegular={expresiones.nombre}
                            estado={nombre}
                            cambiarEstado={cambiarNombre}
                        />
                        <ComponenteInput
                            tipo="text"
                            label="Apellido"
                            placeholder="Ej: Martinez"
                            idHTMLName="apellido"
                            expresionRegular={expresiones.nombre}
                            estado={apellido}
                            cambiarEstado={cambiarApellido}
                        />
                        <div className="formularioInputEspecial">
                            <label htmlFor="sexo" >Sexo</label>
                            <div>
                                <input type="radio" name="sexo" id="hombre" value="Hombre" required/>
                                <label htmlFor="hombre">Hombre</label>
                            </div>
                            <div>
                                <input type="radio" name="sexo" id="mujer" value="Mujer" required/>
                                <label htmlFor="mujer">Mujer</label>
                            </div>
                        </div>
                        <div className="formularioInputEspecial">
                            <label htmlFor="nacimiento">Nacimiento</label>
                            <input type="date" name="nacimiento" id="nacimiento" />
                        </div>
                        <ComponenteInput
                            tipo="email"
                            label="Correo electrónico"
                            placeholder="ejemplo@gmail.com"
                            idHTMLName="email1"
                            leyendaError="correo electronico"
                            expresionRegular={expresiones.correo}
                            estado={email1}
                            cambiarEstado={cambiarEmail1}
                        />
                        <ComponenteInput
                            tipo="email"
                            label="Repetir correo electrónico"
                            placeholder="ejemplo@gmail.com"
                            idHTMLName="email2"
                            leyendaError="Las correos deben ser iguales"
                            expresionRegular={expresiones.correo}
                            estado={email2}
                            cambiarEstado={cambiarEmail2}
                            funcionValidarDoble={validarEmail2}
                            //Desactiva el campo de email2 si email1.campo (el input de email1) está vacío
                            disabled={email1.campo === ""}
                        />
                        <ComponenteInput
                            tipo="password"
                            label="Contraseña"
                            placeholder=""
                            idHTMLName="contrasenia1"
                            leyendaError="contraseña de mas de 3 caracteres"
                            expresionRegular={expresiones.password}
                            estado={contrasenia1}
                            cambiarEstado={cambiarContrasenia1}
                        />
                        <ComponenteInput
                            tipo="password"
                            label="Repetir contraseña"
                            placeholder=""
                            idHTMLName="contrasenia2"
                            leyendaError="Las contraseñas deben ser iguales"
                            expresionRegular={expresiones.password}
                            estado={contrasenia2}
                            cambiarEstado={cambiarContrasenia2}
                            funcionValidarDoble={validarContrasenia2}
                            //Desactiva el campo de contrasenia2 si contrasenia1.campo (el input de contrasenia1) está vacío
                            disabled={contrasenia1.campo === ""}
                        />
                        <ComponenteInput
                            tipo="number"
                            label="Celular"
                            placeholder="Ej: 3625475267"
                            idHTMLName="celular"
                            leyendaError="Celular"
                            expresionRegular={expresiones.telefono}
                            estado={celular}
                            cambiarEstado={cambiarCelular}
                        />
                        </div>

                        {/* Boton de enviar formulario*/}
                        <div className='formularioBotonSubmitcontainer'>
                            <button className='formularioIngresoBotonRegistro'type="submit" > Finalizar registro </button>
                        </div>

                    </form>
                </div>
                
                }                
        </div>  
    );
};

export default FormularioRegistro;