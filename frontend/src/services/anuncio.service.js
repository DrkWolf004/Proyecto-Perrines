

import axios from './root.service.js';

export async function getAnuncios() {
    try {
      const { data } = await axios.get('/anuncios/'); // Realiza una solicitud GET a la ruta /anuncios/
      return data; // Retorna los datos obtenidos
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  

export async function createAnuncios(data) {
  try {
    const response = await axios.post("/anuncios/", data); // Realiza una solicitud POST a la ruta /anuncios/ con los datos del nuevo anuncio
    return response.data; // Retorna los datos del anuncio creado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}


export async function updateAnuncios(data, id) {
  try {
    const response = await axios.put(`/anuncios/${id}`, data); // Realiza una solicitud PUT a la ruta /anuncios/{id} con los datos actualizados del anuncio
    return response.data; // Retorna los datos del anuncio actualizado
  } catch (error) {
    throw error.response?.data || error.message; // Lanza un error con el mensaje de error de la respuesta o el mensaje de error general
  }
}

export async function deleteAnuncios(id) {
  try {
    const { data } = await axios.delete(`/anuncios/delete/${id}`); // Realiza una solicitud DELETE a la ruta /anuncios/{id}
    return data; // Retorna los datos del anuncio eliminado
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

