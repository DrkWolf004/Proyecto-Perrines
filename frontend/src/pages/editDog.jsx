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
            name: data.Nombre || editDog.name,
            breed: data.Raza || editDog.breed,
            age: data.Edad || editDog.age,
        };

        modDog(updatedData);
    };

    const modDog = (data) => {
        updateDog(data, editDog.id)
            .then(response => {
                console.log("Advertisement updated successfully:", response);
                navigate('/dogs');
            })
            .catch(error => {   
                console.error("Error updating advertisement:", error);
            }
        );
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
                                placeholder: editDog.name || "name",
                                type: "text",
                            },
                            {
                                label: "Raza del perro",
                                name: "Raza",
                                placeholder: editDog.breed || "breed",
                                type: "text",
                            },
                            {
                                label: "Edad del perro",
                                name: "Edad",
                                placeholder: editDog.age || "age",
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