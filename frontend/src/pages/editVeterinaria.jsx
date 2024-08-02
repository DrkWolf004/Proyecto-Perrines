import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { updateVeterinarias } from '../services/Veterinarias.service';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarVeterinary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { editVet } = location.state;

    const handleFormSubmit = (formData) => {
        guardarVeterinaria(formData);
    };

    const guardarVeterinaria = (data) => {
        const updatedData = {
            nombre: data.nombre || editVet.nombre,
            telefono: data.telefono || editVet.telefono,
            direccion: data.direccion || editVet.direccion,
            horarioinicio: data.horarioinicio || editVet.horarioinicio,
            horariofin: data.horariofin || editVet.horariofin,
        };

        modvet(updatedData);
    };

    const modvet = (data) => {
        updateVeterinarias(data, editVet._id)
            .then(response => {
                console.log("Advertisement updated successfully:", response);
                navigate('/veterinarias');
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
                        title="Editar Veterinaria"
                        fields={[
                            {
                                label: "Nombre de la Veterinaria",
                                name: "Nombre",
                                placeholder: editVet.nombre|| "Nombre",
                                type: "text",
                            },
                            {
                                label: "Telefono de la Veterinaria",
                                name: "Telefono",
                                placeholder: editVet.telefono || "Telefono",
                                type: "text",
                            },
                            {
                                label: "Direccion de la Veterinaria",
                                name: "Direccion",
                                placeholder: editVet.direccion || "Direccion",
                                type: "text",
                            },
                            {
                                label: "Horario de Apertura",
                                name: "Horario de Apertura",
                                placeholder: editVet.horarioinicio || "Horario de Apertura",
                                type: "date",
                            },
                            {
                                label: "Horario de Cierre",
                                name: "Horario de Cierre",
                                placeholder: editVet.horariofin || "Horario de Cierre",
                                type: "date",
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

export default EditarVeterinary;