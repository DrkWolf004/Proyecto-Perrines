"use strict";

import mongoose from "mongoose";

const visitaSchema = new mongoose.Schema({
  
    mascotaId: {
      type: mongoose.Types.ObjectId,
      ref: 'Mascota',
      required: true,
      unique: false
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
