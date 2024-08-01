import { useState, useEffect } from "react"; // Importa useState y useEffect de React
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks para la navegación y la ubicación
import { createAnuncios, updateAnuncios } from "../services/anuncio.service"; // Importa los servicios de perro para crear y actualizar

const AnuncioForm = () => {
  // Estados para manejar los valores del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const location = useLocation(); // Hook para obtener la ubicación actual
  const anuncio = location.state?.anuncio; // Obtiene los datos del perro desde el estado de la ubicación si existen

  // Efecto que se ejecuta cuando el componente se monta o cuando el valor de 'dog' cambia
  useEffect(() => {
    if (anuncio) {
      // Si hay datos de perro, establece los valores del formulario
      setTitulo(anuncio.titulo);
      setDescripcion(anuncio.descripcion);
    }
  }, [anuncio]);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const anuncioData = { titulo, descripcion}; // Crea un objeto con los datos del perro

    try {
      if (anuncio) {
        // Si hay datos de perro, llama al servicio para actualizar
        await updateAnuncios(anuncioData, anuncio.id);
      } else {
        // Si no hay datos de perro, llama al servicio para crear
        await createAnuncios(anuncioData);
      }
      navigate("/anuncios"); // Navega a la ruta /dogs después de crear o actualizar
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  return (
    <div>
      <h1>{anuncio ? "Actualizar Anuncio" : "Crear Anuncio"}</h1>{" "}
      {/* Muestra el título según si se está actualizando o registrando */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)} // Actualiza el estado 'name' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        
        <button type="submit">{anuncio ? "Actualizar" : "Registrar"}</button>{" "}
        {/* Muestra el texto del botón según si se está actualizando o registrando */}
      </form>
    </div>
  );
};

export default AnuncioForm;