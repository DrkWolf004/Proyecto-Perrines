"use strict";

// Se importa el módulo de 'mongoose'
import mongoose from "mongoose";

//crear coleccion de Historial de alimentacion

const comidaSchema = new mongoose.Schema({

    comidaId:{
        type: mongoose.Types.ObjectId,
        ref: 'Mascota',
        required: true,
        unique: false
    },
    fechaComida:{
        type: Date,
        required: true
    }

});

export default mongoose.model('HistorialComida', comidaSchema);