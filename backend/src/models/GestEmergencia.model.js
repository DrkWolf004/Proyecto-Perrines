// Importación de mongoose
import mongoose from 'mongoose';

// Esquema para Encargado
const encargadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});

// Esquema para Veterinaria
const veterinariaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    horario: {
        inicio: {
            type: String,
            required: true
        },
        fin: {
            type: String,
            required: true
        }
    },
    disponibilidad: {
        type: Boolean,
        default: false // Por defecto, la veterinaria no está disponible hasta que se actualice el horario
    }
});

// Modelos
const Encargado = mongoose.model('Encargado', encargadoSchema);
const Veterinaria = mongoose.model('Veterinaria', veterinariaSchema);

export { Encargado, Veterinaria };
