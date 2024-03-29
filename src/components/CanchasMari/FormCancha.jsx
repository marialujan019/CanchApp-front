import React, { Component, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FormCancha.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function CrearCancha() {
    const { id_complejo } = useParams();
    const [values, setValues] = useState({
        nombre_cancha: "",
        cant_jugador: "",
        techo: "",
        id_complejo: id_complejo,
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    console.log(values);
    axios.defaults.withCredentials = true;
    const handleCrearCancha = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/crear_cancha", {
                nombre_cancha: values.nombre_cancha,
                cant_jugador: values.cant_jugador,
                techo: values.techo,
                id_complejo: id_complejo,
                precio_turno: values.precio_turno,
            })

            .then((res) => {
                console.log(res);
                if (res.data.Status === "Respuesta ok") {
                    console.log(res.data);
                    navigate("/crearCancha", {
                        state: { responseData: res.data },
                    });
                } else {
                    alert(res.data.Message);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='formularioIngresoContainer'>
            <form onSubmit={handleCrearCancha}>
                <h3> Crea tu cancha</h3>

                <div className='formularioIngreso'>
                    <label htmlFor='text' className='formularioLabel'>
                        Nombre de la cancha
                    </label>
                    <input
                        type='text'
                        name='nombre_cancha'
                        placeholder='Nombre o numero de cancha'
                        className='formularioInput'
                        onChange={handleInputChange}
                        value={values.nombre_cancha}
                        required
                    />
                </div>

                <div className='formularioIngreso'>
                    <label htmlFor='text' className='formularioLabel'>
                        Precio turno
                    </label>
                    <input
                        type='text'
                        name='precio_turno'
                        placeholder='precio'
                        className='formularioInput'
                        onChange={handleInputChange}
                        value={values.precio_turno}
                        required
                    />
                </div>

                <div className='formularioInputEspecial'>
                    <label htmlFor='number'>Cantidad Jugadores</label>
                    <div>
                        <input
                            type='radio'
                            name='cant_jugador'
                            id='5'
                            value='5'
                            onChange={handleInputChange}
                            checked={values.cant_jugador === "5"}
                            required
                        />
                        <label htmlFor='cant_jugador'>5</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            name='cant_jugador'
                            id='7'
                            value='7'
                            onChange={handleInputChange}
                            checked={values.cant_jugador === "7"}
                            required
                        />
                        <label htmlFor='cant_jugador'>7</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            name='cant_jugador'
                            id='11'
                            value='11'
                            onChange={handleInputChange}
                            checked={values.cant_jugador === "11"}
                            required
                        />
                        <label htmlFor='cant_jugador'>11</label>
                    </div>
                </div>

                <div className='formularioInputEspecial'>
                    <label htmlFor='number'>Tiene techo?</label>
                    <div>
                        <input
                            type='radio'
                            name='techo'
                            id='si'
                            value='si'
                            onChange={handleInputChange}
                            checked={values.techo === "si"}
                            required
                        />
                        <label htmlFor='techo'>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            name='techo'
                            id='no'
                            value='no'
                            onChange={handleInputChange}
                            checked={values.techo === "no"}
                            required
                        />
                        <label htmlFor='techo'>No</label>
                    </div>
                </div>

                <div className='formularioBotonSubmitcontainer'>
                    <Button variant='outline-primary' type='submit'>
                        Crear cancha
                    </Button>
                </div>
            </form>
        </div>
    );
}
