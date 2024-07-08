"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const anuncioSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Anuncio', anuncioSchema);
