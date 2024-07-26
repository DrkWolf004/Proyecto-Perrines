import { useState, useEffect } from "react"; // Importa useState y useEffect de React
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks para la navegación y la ubicación
import { createDog, updateDog } from "../services/dog.service"; // Importa los servicios de perro para crear y actualizar

const DogForm = () => {
  // Estados para manejar los valores del formulario
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  const location = useLocation(); // Hook para obtener la ubicación actual
  const dog = location.state?.dog; // Obtiene los datos del perro desde el estado de la ubicación si existen

  // Efecto que se ejecuta cuando el componente se monta o cuando el valor de 'dog' cambia
  useEffect(() => {
    if (dog) {
      // Si hay datos de perro, establece los valores del formulario
      setName(dog.name);
      setBreed(dog.breed);
      setAge(dog.age);
    }
  }, [dog]);

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const dogData = { name, breed, age }; // Crea un objeto con los datos del perro

    try {
      if (dog) {
        // Si hay datos de perro, llama al servicio para actualizar
        await updateDog(dogData, dog.id);
      } else {
        // Si no hay datos de perro, llama al servicio para crear
        await createDog(dogData);
      }
      navigate("/dogs"); // Navega a la ruta /dogs después de crear o actualizar
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  return (
    <div>
      <h1>{dog ? "Actualizar Perro" : "Registrar Perro"}</h1>{" "}
      {/* Muestra el título según si se está actualizando o registrando */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)} // Actualiza el estado 'name' cuando cambia el valor del input
        />
        <input
          type="text"
          placeholder="Raza"
          value={breed}
          onChange={(e) => setBreed(e.target.value)} // Actualiza el estado 'breed' cuando cambia el valor del input
        />
        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)} // Actualiza el estado 'age' cuando cambia el valor del input
        />
        <button type="submit">{dog ? "Actualizar" : "Registrar"}</button>{" "}
        {/* Muestra el texto del botón según si se está actualizando o registrando */}
      </form>
    </div>
  );
};

export default DogForm;
