import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getAnuncios, deleteAnuncios, createAnuncios } from "../services/anuncio.service.js";
import searchIcon from "../assets/searchIcon.svg";
import { useNavigate } from 'react-router-dom';

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = ['Titulo', 'Descripcion', 'Acción'];

  const dataAnuncio = async () => {
    try {
      const response = await getAnuncios();
      const formattedData = response.data.map(anuncio => ({
        Titulo: anuncio.titulo,
        Descripcion: anuncio.descripcion,
        _id: anuncio._id,
      }));
      setAnuncios(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    dataAnuncio();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await deleteAnuncios(_id);
      setAnuncios(anuncios.filter((anuncio) => anuncio._id !== _id));
    } catch (error) {
      console.error("Error deleting anuncio:", error);
    }
  };

  const navigate = useNavigate();
  const handleEdit = async (id) => {
    const editAnuncio = anuncios.find(r => r._id === id);
    navigate(`/editA/${id}`, { state: { editAnuncio } });
  }


  // Función para registrar un nuevo anuncio
  const handleRegister = async () => {
    try {
      const newAnuncio = { titulo, descripcion }; // Crea un nuevo objeto anuncio con los datos del formulario
      await createAnuncios(newAnuncio); // Llama al servicio para crear el nuevo anuncio
      dataAnuncio(); // Refresca la lista de anuncios después de registrar uno nuevo
      // Limpiar campos del formulario
      setTitulo("");
      setDescripcion("");
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
        <h1>Crear Anuncio</h1>
        {/* Campos del formulario para registrar un nuevo anuncio */}
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
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
              placeholder="Buscar Anuncio por Titulo"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        {/* Componente de tabla para mostrar la lista de Anuncios */}
        <Table
          columns={columns}
          data={anuncios}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  </>
);
};


export default Anuncios;
