

import axios from './root.service.js';

export async function getComments() {
    try {
      const { data } = await axios.get('/comment/'); // Realiza una solicitud GET a la ruta /comment/
      return data; // Retorna los datos obtenidos
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  

export async function createComments(data) {
  try {
    const response = await axios.post("/comment/", data); // Realiza una solicitud POST a la ruta /comment/ con los datos del nuevo anuncio
    return response.data; // Retorna los datos del anuncio creado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}


export async function updateComments(data, id) {
  try {
    const response = await axios.put(`/comment/${id}`, data); // Realiza una solicitud PUT a la ruta /comment/{id} con los datos actualizados del anuncio
    return response.data; // Retorna los datos del anuncio actualizado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}

export async function deleteComments(id) {
  try {
    const { data } = await axios.delete(`/comment/delete/${id}`); // Realiza una solicitud DELETE a la ruta /comment/delete/{id}
    return data; // Retorna los datos del anuncio eliminado
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

