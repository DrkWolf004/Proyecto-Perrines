//Importaciones

import Visita from '../models/Visita.model.js';


// Funcion para obtener todas las visitas de una mascota
export async function obtenerVisitas(req, res){

  try {

    const visitas = await Visita.find({ mascotaId: req.params.mascotaId });
    res.json(visitas);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

}
  

// Funcion para crear una nueva visita
export async function crearVisita(req, res){
  try{
    const VisitaData = req.body;

    const nuevaVisita = new Visita({

      mascotaId: VisitaData.id,
      fecha: VisitaData.fecha,
      motivo: VisitaData.motivo,
    });

  

    const visitaGuardada = await nuevaVisita.save();
    res.status(201).json(visitaGuardada);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};

}
// Funcion para actualizar una visita existente
export async function actualizarVisita(req, res){

  const { fecha, motivo} = req.body;

  try {

    const visita = await Visita.findById(req.params.id);
    if (!visita) {

      return res.status(404).json({ message: 'Visita no encontrada' });

    }

    visita.fecha = fecha || visita.fecha;
    visita.motivo = motivo || visita.motivo;
  
    const visitaActualizada = await visita.save();
    res.json(visitaActualizada);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};
