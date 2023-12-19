import { useState } from "react";
const ComponenteInput = ({ tipo, label, placeholder, idHTMLName, expresionRegular, estado, cambiarEstado, funcionValidarDoble, leyendaError, disabled}) => {
    
    //Funciones para saber si un input está activo
    const [touched, setTouched] = useState(false);
    
    const handleFocus = () => {
        setTouched(true); // Marcar el input como tocado al enfocarse
    };


    //Funcion para saber que se escribe en el input
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value });
    };

    
    //Funcion que se usa para saber si lo que está en el input cumple con las expresiones regulares (del otro componente)
    const validar = () => {
        if (expresionRegular) {
            if (expresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: true });
            } else cambiarEstado({ ...estado, valido: false });
        }

        if (funcionValidarDoble) {
            funcionValidarDoble();
        }
    };


    return (
        <div>
            <label htmlFor={idHTMLName} className="formularioLabel">
                {label}
            </label>
            <div className="formularioGrupoInput flex justify-start">
                <input
                    type={tipo}
                    placeholder={placeholder}
                    id={idHTMLName}
                    name={idHTMLName}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validar}
                    onBlur={validar}
                    onFocus={handleFocus}
                    className={estado.valido ? "formularioInput" : "formularioInput formularioInputFalso"}
                    disabled={disabled}
                    required
                />
                {touched && (estado.valido ? <i className="formularioIconoInput bi bi-check-circle"></i> : <i className="formularioIconoInput bi bi-x-circle"></i>)}
            </div>
            {touched && estado.campo !== '' && !estado.valido && <p className="leyendaError">{leyendaError}</p>}
        </div>
    );
};

export default ComponenteInput;
