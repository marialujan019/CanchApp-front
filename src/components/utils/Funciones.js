export const consultarBaseDeDatos = async (ruta) => {
    const response = await fetch(ruta) //consulto datos de forma asincrónica
    const datos = await response.json() //convertimos el objeto tipo promesa a objeto normal
    return datos
}
