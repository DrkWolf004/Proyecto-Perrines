import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { updateAnuncios } from '../services/anuncio.service';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarAnuncio = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { editAnuncio } = location.state;

    const handleFormSubmit = (formData) => {
        guardarAnuncio(formData);
    };

    const guardarAnuncio = (data) => {
        const updatedData = {
            titulo: data.Titulo || editAnuncio.titulo,
            descripcion: data.Descripcion || editAnuncio.descripcion,
        };

        modAnuncio(updatedData);
    };

    const modAnuncio = (data) => {
        updateAnuncios(data, editAnuncio._id)
            .then(response => {
                console.log("Advertisement updated successfully:", response);
                navigate('/anuncios');
            })
            .catch(error => {   
                console.error("Error updating advertisement:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar Anuncio"
                        fields={[
                            {
                                label: "Titulo Anuncio",
                                name: "Titulo",
                                placeholder: editAnuncio.titulo || "Titulo",
                                type: "text",
                            },
                            {
                                label: "Descripcion Anuncio",
                                name: "Descripcion",
                                placeholder: editAnuncio.descripcion || "Descripcion",
                                type: "text",
                            },
                            
                        ]}
                        buttonText="Guardar cambios"
                        onSubmit={handleFormSubmit}
                    />
                </div>
            </div>
        </>
    );
}

export default EditarAnuncio;