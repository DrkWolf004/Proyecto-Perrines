import axios from "./root.service.js";

/**
 * Obtiene la lista de todos los perros.
 * @returns {Promise<Array>} - Una promesa que resuelve a una matriz de objetos de perros.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export async function getDogs() {
  try {
    const config = {
      headers: {
        "Cache-Control": "no-cache", // Configura los encabezados para no almacenar en caché la respuesta
      },
    };
    const { data } = await axios.get("/dog/", config); // Realiza una solicitud GET a la ruta /dog/
    return data; // Retorna los datos obtenidos
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}

/**
 * Crea un nuevo perro.
 * @param {Object} data - Los datos del nuevo perro.
 * @returns {Promise<Object>} - Una promesa que resuelve al objeto del perro creado.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export async function createDog(data) {
  try {
    const response = await axios.post("/dog/", data); // Realiza una solicitud POST a la ruta /dog/ con los datos del nuevo perro
    return response.data; // Retorna los datos del perro creado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}

/**
 * Actualiza un perro existente.
 * @param {Object} data - Los nuevos datos del perro.
 * @param {string} id - El ID del perro a actualizar.
 * @returns {Promise<Object>} - Una promesa que resuelve al objeto del perro actualizado.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export async function updateDog(data, id) {
  try {
    const response = await axios.put(`/dog/${id}`, data); // Realiza una solicitud PUT a la ruta /dog/{id} con los datos actualizados del perro
    return response.data; // Retorna los datos del perro actualizado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}

/**
 * Elimina un perro existente.
 * @param {string} id - El ID del perro a eliminar.
 * @returns {Promise<Object>} - Una promesa que resuelve al objeto del perro eliminado.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export async function deleteDog(id) {
  try {
    const response = await axios.delete(`/dog/${id}`); // Realiza una solicitud DELETE a la ruta /dog/{id}
    return response.data; // Retorna los datos del perro eliminado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}
