//Importaciones
import HistorialComida from '../models/HistorialComida.model.js'

//CREAR
export async function createHistorial(req, res) {
    try{

        const comidaData = req.body;

        if (!comidaData.comidaId) {
            return res.status(400).json({ message: "El campo 'comidaId' es obligatorio." });
        }
        if (!comidaData.fechaComida) {
            return res.status(400).json({ message: "El campo 'fechaComida' es obligatorio." });
        }
    
        const newComida = new HistorialComida({
          
            comidaId: comidaData.comidaId,
            fechaComida: comidaData.fechaComida,
    
        });
    
      
        await newComida.save();
    
        res.status(201).json({
          message: "La Alimentacion se ha guardado correctamente",
          data: newComida,
        });
    
    } catch (error) {
        console.log("Error en HistorialComida.controller.js -> createHistorial():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    
    }
}

//ELIMINAR
export async function deleteHistorial(req,res){
    const { id } = req.params
    try{    
        if (!id) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const ElimHistorial = await HistorialComida.findByIdAndDelete(id);

        if(!ElimHistorial){
            res.status(404).json({
                message: "Fecha de alimentacion no encontrada",
                data: null
            });
            return;
        }
        
        res.status(200).json({ 
            message: "Fecha de alimentacion eliminada exitosamente",
            data: ElimHistorial
        });

    }catch(error){
        console.log("Error en HistorialComida.controller.js -> deleteHistorial():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

//OBTENER UNA
export async function getHistorial(req,res){
    const { id } = req.params;
    try{

        if (!id) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const comida = await HistorialComida.findById(id).populate('comidaId');

        if(!comida){
            res.status(404).json({
                message: "Fecha de alimentacion no encontrada",
                data: null
            });
    
            return;
        }
        
        res.status(200).json({ 
            message: "Fecha de alimentacion",
            data: comida
        });
    
    }catch(error){
        console.log("Error en HistorialComida.controller.js -> getHistorial():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

//OBTENER TODAS
export async function getHistoriales(req,res){
    try {

        const Historial = await HistorialComida.find().populate('comidaId');

        res.status(200).json({
          message:"Lista de alimentacion",
          data: Historial
        })
        
    
    } catch (error) {
        console.log("Error en HistorialComida.controller.js -> getHistoriale(): ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    
    }
}

//ACTUALIZAR
export async function updateHistorial(req,res){
    const { id } = req.params;

    try {

        const Historial = await HistorialComida.findByIdAndUpdate(id, req.body);
        if (!Historial) {

            return res.status(404).json({ message: 'id de alimentacion no encontrada' });

        }

        res.status(200).json({
            message: "Alimentacion actualizada exitosamente",
            data: Historial
        })

    } catch (error) {
        console.log("Error HistorialComida.controller.js ->updateHistorial:",error);
        res.status(400).json({ message: error.message });

    }
}
