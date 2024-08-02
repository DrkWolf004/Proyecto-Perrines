import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getAnuncios} from "../services/anuncio.service.js";

const Useranuncios = () => {
  const [anuncios, setAnuncios] = useState([]);


  const columns = ['Titulo', 'Descripcion'];

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

return (
<>
<Navbar /> {/* Componente de navegación */}
<div className="main-container">
    {/* Componente de tabla para mostrar la lista de Anuncios */}
    <Table
      columns={columns}
      data={anuncios}
    />
  
</div>
</>
);
};


export default Useranuncios;
