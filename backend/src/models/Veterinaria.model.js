import mongoose from 'mongoose';

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
 
    horarioinicio: {
        type: String,
        required: true
    },
    horariofin: {
        type: String,
        required: true
    }
});

export default mongoose.model('Veterinaria', veterinariaSchema);