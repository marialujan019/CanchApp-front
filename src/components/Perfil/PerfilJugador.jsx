import React, { useState, useEffect } from "react";
import "./perfilJugador.css";
import axios from 'axios';

const PerfilJugador = ({ id, nombre2, telefono2, pieHabil, posicion2, sexo2, mail2 }) => {
  const [mail, setMail] = useState(mail2);
  const [nombre, setNombre] = useState(nombre2);
  const [telefono, setTelefono] = useState(telefono2);
  const [sexo, setSexo] = useState(sexo2);
  const [posicion, setPosicion] = useState(posicion2);
  const [pie_habil, setPiernaHabil] = useState(pieHabil);
  const [contrasena, setContrasena] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mailEditado, setMailEditado] = useState(mail2);
  const [editandoMail, setEditandoMail] = useState(false);
  const [editandoTelefono, setEditandoTelefono] = useState(false);
  const [editandoSexo, setEditandoSexo] = useState(false);
  const [editandoContrasena, setEditandoContrasena] = useState(false);
  const [editandoPieHabil, setEditandoPieHabil] = useState(false);
  const [editandoPosicion, setEditandoPosicion] = useState(false);

  useEffect( () => {
    axios.post('http://localhost:3001/perfil', {
      tipo: "jugador",
      id: id
    }).then(res => {
    setNombre(res.data.nombre);
    setTelefono(res.data.telefono);
    setPiernaHabil(res.data.pierna_habil);
    setPosicion(res.data.posicion);
    setMail(res.data.mail);
    setSexo(res.data.sexo)})

  });

  //Los console.log son las cosas que envio al back
  const handleEditarMail = () => {
    setEditandoMail(true);
  };

  const handleGuardarMail = () => {
    console.log("Mail editado:", mail);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      mail: mailEditado,
      mailViejo: mail2
    })
    setEditandoMail(false);
  };

  const handleEditarTelefono = () => {
    setEditandoTelefono(true);
  };

  const handleGuardarTelefono = () => {
    console.log("Teléfono editado:", telefono);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      telefono: telefono
    })
    setEditandoTelefono(false);
  };

  const handleEditarSexo = () => {
    setEditandoSexo(true);
  };

  const handleGuardarSexo = () => {
    console.log("Sexo editado:", sexo);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      sexo: sexo
    })
    setEditandoSexo(false);
  };

  const handleEditarContrasena = () => {
    setEditandoContrasena(true);
  };

  const handleGuardarContrasena = () => {
    console.log("Contraseña editada:", nuevaContrasena);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      contrasena: contrasena
    })
    setContrasena(nuevaContrasena);
    setEditandoContrasena(false);
  };

  const handleEditarPieHabil = () => {
    setEditandoPieHabil(true);
  };

  const handleGuardarPieHabil = (valorSeleccionado) => {
    console.log("Pie habil editado:", valorSeleccionado === "Prefiero no decirlo" ? null : valorSeleccionado);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      pierna_habil: pie_habil
    })
    setEditandoPieHabil(false);
  };

  const handleEditarPosicion = () => {
    setEditandoPosicion(true);
  };

  const handleGuardarPosicion = (valorSeleccionado) => {
    console.log("Posición editada:", valorSeleccionado === "Prefiero no decirlo" ? null : valorSeleccionado);
    axios.put(`http://localhost:3001/perfil/update/${id}`, {
      posicion: posicion
    })
    setEditandoPosicion(false);
  };

  return (
    <div className="perfilContainer">
      <div className="wrapper">
        <div className="left">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s" alt="" />
          <h4>{nombre}</h4>
          <p>Miembro de CanchApp</p>
        </div>
        <div className="right">
          <div className="info">
            <h3>Información personal</h3>
            <div className="info_data">
              <div className="data">
                <h4>Mail</h4>
                {editandoMail ? (
                  <div>
                    <input type="text" value={mailEditado} onChange={(e) => setMailEditado(e.target.value)} />
                    <button onClick={handleGuardarMail}>Guardar</button>
                  </div>
                ) : (
                  <p>
                    {mail} <button onClick={handleEditarMail}>Editar</button>
                  </p>
                )}
              </div>
              <div className="data">
                <h4>Phone</h4>
                {editandoTelefono ? (
                  <div>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    <button onClick={handleGuardarTelefono}>Guardar</button>
                  </div>
                ) : (
                  <p>
                    {telefono} <button onClick={handleEditarTelefono}>Editar</button>
                  </p>
                )}
              </div>
              {/* Nuevo campo "sexo" */}
              <div className="data">
                <h4>Sexo</h4>
                {editandoSexo ? (
                  <div>
                    <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                    <button onClick={handleGuardarSexo}>Guardar</button>
                  </div>
                ) : (
                  <p>
                    {sexo} <button onClick={handleEditarSexo}>Editar</button>
                  </p>
                )}
              </div>
              <div className="data">
                <h4>Contraseña</h4>
                {editandoContrasena ? (
                  <div>
                    <input type="password" placeholder="Nueva contraseña" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} />
                    <button onClick={handleGuardarContrasena}>Guardar</button>
                  </div>
                ) : (
                  <p>
                    {contrasena} <button onClick={handleEditarContrasena}>Editar</button>
                  </p>
                )}
              </div>
              <div className="data">
                <h4>Pie Hábil</h4>
                {editandoPieHabil ? (
                  <div>
                    <select onChange={(e) => handleGuardarPieHabil(e.target.value)}>
                      <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                      <option value="Izquierdo">Izquierdo</option>
                      <option value="Derecho">Derecho</option>
                    </select>
                    <button onClick={() => handleGuardarPieHabil("Prefiero no decirlo")}>Cancelar</button>
                  </div>
                ) : (
                  <p>
                    {pieHabil == null ? "Prefiero no decirlo" : pieHabil}
                    <button onClick={handleEditarPieHabil}>Editar</button>
                  </p>
                )}
              </div>

              <div className="data">
                <h4>Posición</h4>
                {editandoPosicion ? (
                  <div>
                    <select onChange={(e) => handleGuardarPosicion(e.target.value)}>
                      <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                      <option value="Arquero">Arquero</option>
                      <option value="Defensor">Defensor</option>
                      <option value="Mediocampista">Mediocampista</option>
                      <option value="Delantero">Delantero</option>
                    </select>
                    <button onClick={() => handleGuardarPosicion("Prefiero no decirlo")}>Cancelar</button>
                  </div>
                ) : (
                  <p>
                    {posicion === null ? "Prefiero no decirlo" : posicion}{" "}
                    <button onClick={handleEditarPosicion}>Editar</button>
                  </p>
                )}
              </div>
            </div>
              {/* Nuevo campo "pie_habil" */}
              
            </div>
          </div>
        </div>
      </div>
  );
};

export default PerfilJugador;
