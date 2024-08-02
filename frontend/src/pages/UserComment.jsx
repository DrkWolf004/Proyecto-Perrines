import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getComments, createComments } from '../services/comments.service';
import searchIcon from "../assets/searchIcon.svg";

const UserComments = () => {
  const [Comentarios, setComentarios] = useState([]);
  const [tittle, settittle] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [date, setdate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = ['Titulo', 'Descripcion','Fecha'];

  const dataAnuncio = async () => {
    try {
      const response = await getComments();
      const formattedData = response.data.map(comment => ({
            Titulo: comment.tittle,
            Descripcion: comment.descripcion,
            Fecha: comment.date,
            _id: comment._id,
      }));
      setComentarios(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    dataAnuncio();
  }, []);


  // Función para registrar un nuevo anuncio
  const handleRegister = async () => {
    try {
      const newcomment = { tittle, descripcion, date}; // Crea un nuevo objeto anuncio con los datos del formulario
      await createComments(newcomment); // Llama al servicio para crear el nuevo anuncio
      dataAnuncio(); // Refresca la lista de anuncios después de registrar uno nuevo
      // Limpiar campos del formulario
      settittle("");
      setdescripcion("");
      setdate("");
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
        <h1>Crear comentario</h1>
        {/* Campos del formulario para registrar un nuevo anuncio */}
        <input
          type="text"
          placeholder="Titulo"
          value={tittle}
          onChange={(e) => settittle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setdescripcion(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha"
          value={date}
          onChange={(e) => setdate(e.target.value)}
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
          data={Comentarios}
        />
      </div>
    </div>
  </>
);
};


export default UserComments;
