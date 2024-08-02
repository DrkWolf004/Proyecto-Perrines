import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getVeterinarias,createVeterinarias, deleteVeterinarias } from '../services/Veterinarias.service';
import searchIcon from "../assets/searchIcon.svg";
import { useNavigate } from 'react-router-dom';

const Veterinarias = () => {
  const [veterinarias, setVeterinarias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [horarioinicio, sethorarioinicio] = useState("");
  const [horariofin, sethorariofin] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = ['nombre', 'telefono','direccion', 'horarioinicio', 'horariofin' ,'Acción'];

  const dataVeterinaria = async () => {
    try {
      const response = await getVeterinarias();
      const formattedData = response.data.map(veterinaria => ({
        nombre: veterinaria.nombre,
        telefono: veterinaria.telefono,
        direccion: veterinaria.direccion,
        horarioinicio: veterinaria.horarioinicio,
        horariofin: veterinaria.horariofin,
        _id: veterinaria._id
      }));
      setVeterinarias(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    dataVeterinaria();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await deleteVeterinarias(_id);
      setNombre(veterinarias.filter((veterinary) => veterinary._id !== _id));
    } catch (error) {
      console.error("Error deleting veterinary:", error);
    }
  };

  const navigate = useNavigate();
  const handleEdit = async (id) => {
    const editVeterinaria = veterinarias.find(r => r._id === id);
    navigate(`/EditarVeterinaria/${id}`, { state: { editVeterinaria } });
  }


  // Función para registrar una nueva veterinaria
  const handleRegister = async () => {
    try {
      const newAnuncio = { nombre, telefono,direccion, horarioinicio, horariofin}; // Crea un nuevo objeto anuncio con los datos del formulario
      await createVeterinarias(newAnuncio); // Llama al servicio para crear la nueva veterinaria
      dataVeterinaria(); // Refresca la lista de veterinarias después de registrar uno nuevo
      // Limpiar campos del formulario
      setNombre("");
      setTelefono("");
      setDireccion("");
      sethorarioinicio("");
      sethorariofin("");
    } catch (error) {
      console.error("Error: ", error); // Manejo de errores
    }
  };
 // Función para manejar el término de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el estado
  };


return (
  <>
    <Navbar /> {/* Componente de navegación */}
    <div className="main-container">
      <div className="form2-container">
        <h1>Crear Veterinaria</h1>
        {/* Campos del formulario para registrar una nueva veterinaria*/}
        <input
          type="text"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="date"
          placeholder="horarioinicio"
          value={horarioinicio}
          onChange={(e) => sethorarioinicio(e.target.value)}
        />
        <input
          type="date"
          placeholder="horariofin"
          value={horariofin}
          onChange={(e) => sethorariofin(e.target.value)}
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
              placeholder="Buscar veterunaria por nombre"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        {/* Componente de tabla para mostrar la lista de Anuncios */}
        <Table
          columns={columns}
          data={veterinarias}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  </>
);
};


export default Veterinarias;
