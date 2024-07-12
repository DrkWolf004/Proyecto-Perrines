"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

//crear coleccion de mascotas

const mascotaSchema = new mongoose.Schema(
    {
        id:{
            type: Number,
            required: true,
            unique: true
        },
        nombre:{
            type: String,
            required: true
        },
        genero:{
            type: String,
            required: true
        },
        raza:{
            type: String,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        salud:{
            type: String,
            required: true
        }
    }
);

export default mongoose.model('Mascota', mascotaSchema);