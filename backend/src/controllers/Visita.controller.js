//Importaciones
import Mascota from '../models/mascota.model.js';
import Visita from '../models/Visita.model.js';
//.

// Funcion para obtener todas las visitas de una mascota
export async function obtenerVisitas(req, res){

  try {

    const visitas = await Visita.find();
    res.status(200).json({
      message:"Lista de visitas medicas",
      data: visitas
    })
    

  } catch (error) {
    console.log("Error en visita.controller.js -> obtenerVisita(): ", error);
    res.status(500).json({ message: "Error interno del servidor" });

  }

}
  

// Funcion para crear una nueva visita
export async function crearVisita(req, res){
  try{

    const VisitaData = req.body;

    const nuevaVisita = new Visita({
      
      mascotaId: VisitaData.mascotaId,
      fecha: VisitaData.fecha,
      motivo: VisitaData.motivo,

    });

  
    await nuevaVisita.save();

    res.status(201).json({
      message: "La visita se ha guardado correctamente",
      data: nuevaVisita,
    });

  } catch (error) {
    console.log("Error en visita.controller.js -> crearVisita():", error);
    res.status(500).json({ message: "Error interno del servidor" });

  }
};


// Funcion para actualizar una visita existente
export async function actualizarVisita(req, res){

  const { id } = req.params;

  try {

    const visita = await Visita.findByIdAndUpdate(id, req.body);
    if (!visita) {

      return res.status(404).json({ message: 'Visita no encontrada' });

    }

    res.status(200).json({
      message: "Visita actualizada exitosamente",
      data: visita
    })

  } catch (error) {
    console.log("Error visita.controller.js ->actualizarVisita:",error);
    res.status(400).json({ message: error.message });

  }
};

export async function getVisita(req,res){
  const { id } = req.params;
  try{

      if (!id) {
          res.status(400).json({
              message: "El parámetro 'id' es requerido.",
              data: null
          });
          return;
      }

      const visita = await Visita.findById(id).populate('mascotaId');

      if(!visita){
          res.status(404).json({
              message: "Visita al veterinario no encontrada",
              data: null
          });
  
          return;
      }
      
      res.status(200).json({ 
          message: "Visita al veterinario:",
          data: visita
      });
  
  }catch(error){
      console.log("Error en visita.controller.js -> getVisita():", error);
      res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteVisita(req,res){
  const { id } = req.params
  try{    
      if (!id) {
          res.status(400).json({
              message: "El parámetro 'id' es requerido.",
              data: null
          });
          return;
      }

      const ElimVisita = await Visita.findByIdAndDelete(id);

      if(!ElimVisita){
          res.status(404).json({
              message: "Visita al veterinario no encontrada",
              data: null
          });
          return;
      }
      
      res.status(200).json({ 
          message: "Visita al veterinario eliminada exitosamente",
          data: ElimVisita
      });

  }catch(error){
      console.log("Error en visita.controller.js -> deleteVisita():", error);
      res.status(500).json({ message: "Error interno del servidor." });
  }
}
