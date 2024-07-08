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
    },
    disponibilidad:{
        type: Boolean,
        required: false
    }

});

// Modelos

export default mongoose.model('Encargado', encargadoSchema);