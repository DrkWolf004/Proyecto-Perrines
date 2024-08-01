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
        type: Date,
        required: true
    },
    horariofin: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Veterinaria', veterinariaSchema);