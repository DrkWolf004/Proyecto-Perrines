import { useState, useEffect } from "react"; // Importa useState y useEffect de React
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks para la navegación y la ubicación
import { createVeterinarias, updateVeterinarias } from "../services/Veterinarias.service"; // Importa los servicios de perro para crear y actualizar

const VeterinariaForm = () => {
  // Estados para manejar los valores del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [horarioinicio, sethorarioinicio] = useState("");
  const [horariofin, sethorariofin] = useState("");
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const location = useLocation(); // Hook para obtener la ubicación actual
  const veterinaria = location.state?.veterinaria; // Obtiene los datos del perro desde el estado de la ubicación si existen

  // Efecto que se ejecuta cuando el componente se monta o cuando el valor de 'dog' cambia
  useEffect(() => {
    if (veterinaria) {
      // Si hay datos de perro, establece los valores del formulario
      setNombre(veterinaria.nombre);
      setTelefono(veterinaria.telefono);
      setDireccion(veterinaria.direccion);
      sethorarioinicio(veterinaria.horarioinicio);
      sethorariofin(veterinaria.horariofin);
    }
  }, [veterinaria]);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const VeterinariaData = { nombre, telefono, direccion, horarioinicio, horariofin}; // Crea un objeto con los datos del perro

    try {
      if (veterinaria) {
        // Si hay datos de perro, llama al servicio para actualizar
        await updateVeterinarias(VeterinariaData, veterinaria.id);
      } else {
        // Si no hay datos de perro, llama al servicio para crear
        await createVeterinarias(VeterinariaData);
      }
      navigate("/anuncios"); // Navega a la ruta /dogs después de crear o actualizar
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  return (
    <div>
      <h1>{veterinaria ? "Actualizar Anuncio" : "Crear Anuncio"}</h1>{" "}
      {/* Muestra el título según si se está actualizando o registrando */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado 'name' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="horarioinicio"
          value={horarioinicio}
          onChange={(e) => sethorarioinicio(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="horariofin"
          value={horariofin}
          onChange={(e) => sethorariofin(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        
        <button type="submit">{veterinaria ? "Actualizar" : "Registrar"}</button>{" "}
        {/* Muestra el texto del botón según si se está actualizando o registrando */}
      </form>
    </div>
  );
};

export default VeterinariaForm;