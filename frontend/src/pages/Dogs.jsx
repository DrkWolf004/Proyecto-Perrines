import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Navegación comentada ya que no se usa en este ejemplo
import Navbar from "../components/Navbar";
import DogTable from "../components/DogTable";
import { getDogs, createDog, deleteDog } from "../services/dog.service";
import searchIcon from "../assets/searchIcon.svg";

const Dogs = () => {
  // Estados para manejar los datos de los perros, y los valores de los campos del formulario y búsqueda
  const [dogs, setDogs] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate(); // Navegación comentada ya que no se usa en este ejemplo

  // Definición de las columnas de la tabla
  const columns = ["Nombre", "Raza", "Edad", "Acción"];

  // Función para obtener la lista de perros
  const fetchDogs = async () => {
    try {
      const response = await getDogs(); // Llama al servicio para obtener los perros
      const formattedData = response.map((dog) => ({
        Nombre: dog.name,
        Raza: dog.breed,
        Edad: dog.age,
        id: dog._id,
      }));
      setDogs(formattedData); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  // Función para eliminar un perro
  const handleDelete = async (id) => {
    try {
      await deleteDog(id); // Llama al servicio para eliminar el perro
      setDogs(dogs.filter((dog) => dog.id !== id)); // Filtra la lista de perros para remover el eliminado
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  // Función para registrar un nuevo perro
  const handleRegister = async () => {
    try {
      const newDog = { name, breed, age }; // Crea un nuevo objeto perro con los datos del formulario
      await createDog(newDog); // Llama al servicio para crear el nuevo perro
      fetchDogs(); // Refresca la lista de perros después de registrar uno nuevo
      // Limpiar campos del formulario
      setName("");
      setBreed("");
      setAge("");
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };

  // Función para manejar el término de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el estado
  };

  // Hook de efecto para obtener la lista de perros cuando el componente se monta
  useEffect(() => {
    fetchDogs();
  }, []);

  // Filtra la lista de perros según el término de búsqueda
  const filteredDogs = dogs.filter((dog) =>
    dog.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar /> {/* Componente de navegación */}
      <div className="main-container">
        <div className="form-container">
          <h1>Registrar Perro</h1>
          {/* Campos del formulario para registrar un nuevo perro */}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Raza"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleRegister}>Registrar</button>{" "}
          {/* Botón para registrar el nuevo perro */}
        </div>
        <div className="table-container">
          <div className="search-container">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="Buscar" className="search-icon" />
              <input
                type="text"
                placeholder="Buscar perro por nombre"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>
          {/* Componente de tabla para mostrar la lista de perros */}
          <DogTable
            columns={columns}
            data={filteredDogs}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default Dogs;
