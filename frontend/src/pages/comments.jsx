import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Table from '../components/Table2';
import { getComments, deleteComments } from '../services/comments.service';


const Comments = () => {
  const [Comentarios, setComentarios] = useState([]);

  const columns = ['Titulo', 'Descripcion','Fecha', 'Acción'];
 //mostrar
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


  

  


  // Función para eliminar un comment

  const handleDelete = async (_id) => {
    try {
        await deleteComments(_id);
        setComentarios(Comentarios.filter((comment) => comment._id !== _id));
    } catch (error) {
        console.error("Error deleting comentario:", error);
    }
  };

return (
  <>
    <Navbar /> {/* Componente de navegación */}
    <div className="main-container">
        {/* Componente de tabla para mostrar la lista de Anuncios */}
        <Table
          columns={columns}
          data={Comentarios}
          onDelete={handleDelete}
        />
      
    </div>
  </>
);
};


export default Comments;
