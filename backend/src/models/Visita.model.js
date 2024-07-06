"use strict";

const mongoose = require('mongoose');

const visitaSchema = new mongoose.Schema({
  
    mascotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true
    },
  
    fecha: {
      type: Date,
      required: true
    },
  
    motivo: {
      type: String,
      required: true
    },
  
});
  
export default mongoose.model('Visita', visitaSchema);
