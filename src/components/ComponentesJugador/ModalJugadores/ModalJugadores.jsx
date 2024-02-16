import React, { useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
} from "@nextui-org/react";
import "./modalJugadores.css";
import { useNavigate } from "react-router-dom";

const columns = [
    { key: "nombre", label: "Jugador" },
    { key: "pie_habil", label: "Pie Hábil" },
    { key: "sexo", label: "Sexo" },
    { key: "posicion", label: "Posición" },
    { key: "telefono", label: "Teléfono" },
];

const ModalJugadores = ({ jugadores, show, onHide, invitarJugadores }) => {
    const navigate = useNavigate();

    const renderCell = useCallback((jugador, columnKey) => {
        const cellValue = jugador[columnKey];

        switch (columnKey) {
            case "nombre":
                return (
                    <User
                        avatarProps={{ src: jugador.imagen }}
                        description={`Edad: ${jugador.edad}`}
                        name={`${jugador.nombre} ${jugador.apellido}`}
                    >
                        {jugador.email}
                    </User>
                );
            case "edad":
            case "sexo":
            case "telefono":
                return cellValue;
            case "pie_habil":
            case "posicion":
                return cellValue || "Información privada";
            default:
                return cellValue;
        }
    }, []);

    const handleBuscarJugadores = () => {
        navigate("/buscarjugador");
    };
    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
            <Modal.Body>
                <div className='tablaContainer'>
                    <h3 className='tituloTabla3'>Jugadores</h3>
                    <Table aria-label='Tabla de Jugadores' removeWrapper>
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.key}
                                    style={{ textAlign: "center" }}
                                    className='headerTabla py-0 px-0'
                                >
                                    {column.label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={jugadores}>
                            {(item) => (
                                <TableRow
                                    key={item.id_jug}
                                    className='py-0 px-0 contenidoTabla'
                                >
                                    {(columnKey) => (
                                        <TableCell className='py-0 px-0'>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {invitarJugadores && (
                    <Button variant='primary' onClick={handleBuscarJugadores}>
                        Invitar jugadores
                    </Button>
                )}
                <Button variant='danger' onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalJugadores;
