import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { updateDog } from '../services/dog.service'; 
import { useLocation, useNavigate } from 'react-router-dom';

const EditarDog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { editDog } = location.state;

    const handleFormSubmit = (formData) => {
        guardarDog(formData);
    };

    const guardarDog = (data) => {
        const updatedData = {
            name: data.name || editDog.Nombre,
            breed: data.breed || editDog.Raza,
            age: data.age || editDog.Edad,
        };

        modAnuncio(updatedData);
    };

    const modAnuncio = (data) => {
        updateDog(data, editDog._id)
            .then(response => {
                console.log("Advertisement updated successfully:", response);
                navigate('/dogs');
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
                        title="Editar Perro"
                        fields={[
                            {
                                label: "Nombre del Perro",
                                name: "Nombre",
                                placeholder: editDog.Nombre || "Nombre",
                                type: "text",
                            },
                            {
                                label: "Raza del Perro",
                                name: "Raza",
                                placeholder: editDog.Raza || "Raza",
                                type: "text",
                            },
                            {
                                label: "Edad del Perro",
                                name: "Edad",
                                placeholder: editDog.Edad || "Edad",
                                type: "number",
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

export default EditarDog;