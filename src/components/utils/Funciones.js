export const consultarBaseDeDatos = async (ruta) => {
    const response = await fetch(ruta)
    const datos = await response.json()
    return datos
}
