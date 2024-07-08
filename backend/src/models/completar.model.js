"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

const completarSchema = new mongoose.Schema(
    {
            id : {
                type: mongoose.Types.ObjectId,
                ref: 'Anuncio',
                unique: true,
                required: true,
            },
            descripcion : {
                type: String,
                required: false,
            },
            marca : {
                type: Boolean,
                required: true,
            }

}
);
export default mongoose.model('completar', completarSchema);