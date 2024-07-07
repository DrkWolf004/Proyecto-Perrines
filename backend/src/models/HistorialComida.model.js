"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

//crear coleccion de Historial de alimentacion

const comidaSchema = new mongoose.Schema({

    id:{
        type: mongoose.Types.ObjectId,
        Ref: 'Mascota',
        required: true
    },
    Fecha:{
        type: Date,
        required: true
    }

});

export default mongoose.model('HistorialComida', comidaSchema);