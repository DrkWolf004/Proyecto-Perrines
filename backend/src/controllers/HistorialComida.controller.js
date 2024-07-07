//Importaciones
import HistorialComida from '../models/HistorialComida.model.js'

//CREAR
export async function createHistorial(req, res) {
    try{

        const HistorialData = req.body;

        const newHistorial = new HistorialComida ({

            id: HistorialData.id,
            Fecha: HistorialData.Fecha

        });

        await newHistorial.save();

        res.status(201).json({ 
            message: "Fecha de alimentacion registrada exitosamente",
            data: newHistorial
        });


    }catch(error){
        console.log("Error en HistorialComida.controller.js -> createHistorial():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

//ELIMINAR
export async function deleteHistorial(req,res){
    const {id} = req.params
    try{

        const ElimHistorial = await HistorialComida.findByIdAndDelete(id);

        res.status(404).json({
            message: "Fecha de alimentacion no encontrada",
            data: null
        });

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
        const comida = await HistorialComida.findById(id).populate('Mascota');

        res.status(404).json({
            message: "Fecha de alimentacion no encontrada",
            data: null
        });

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

        const Historial = await HistorialComida.find();

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
        if (!Hitorial) {

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
