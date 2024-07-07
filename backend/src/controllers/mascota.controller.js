//Importaciones
import Mascota from '../models/mascota.model.js';

//Funciones

export async function createMascota(req, res) {
    try{
        const MascotaData = req.body;

        const ExisteID = await Mascota.findOne({ eid: MascotaData.id });


        if (ExisteID) {
            return res.status(400).json({ message: "El ID ya esta registrado." });
        }

        const newMascota = new Mascota ({
            id: MascotaData.id,
            nombre:MascotaData.nombre,
            genero:MascotaData.genero,
            raza:MascotaData.raza,
            color:MascotaData.color,
            salud:MascotaData.salud
        });

        await newMascota.save();

        res.status(201).json({ 
            message: "Mascota registrada exitosamente",
            data: newMascota
        });
    }catch (error) {

    console.log("Error en mascota.controller.js -> createMascota():", error);
    res.status(500).json({ message: "Error interno del servidor." });
}

};

export async function DeleteMascota(req, res){
    try{
        const idMascota = req.query.id;
        if (!idMascota) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const mascota = await Mascota.findOneAndDelete({ id: idMascota });

        if (!mascota) {
            return res.status(404).json({
                message: "Mascota no encontrada",
                data: null
            });
        }

        res.status(200).json({
            message: "Mascota eliminada exitosamente!",
            data: mascota
        });
    }catch(error){
        console.log("Error en mascota.controller.js -> DeleteMascota():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function GetMascota(req, res){
    try{
        const idMascotas = req.query.id;

        if (!idMascotas) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }

        const mascota = await Mascota.findOne({id:idMascotas});


        if(!mascota){
            res.status(404).json({
                message: "Mascota no encontrada",
                data: null
            })
            return;
        }

        res.status(200).json({
            message: "Mascota encontrada",
            data: mascota
        });
        
    }catch(error){
        console.log("Error en mascota.controller.js -> GetMascota():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function GetMascotas(req, res){
    try{
        const mascotas = await Mascota.find();
        res.status(200).json({
            message: "Lista de Mascotas",
            data: mascotas
        });
    }catch(error){
        console.log("Error en mascota.controller.js -> GetMascotas():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

export async function UpdateMascota(req, res){
    try{
        const idMascota = req.query.id;
        const updatedData = req.body;

        if (!idMascota) {
            res.status(400).json({
                message: "El parámetro 'id' es requerido.",
                data: null
            });
            return;
        }
        const MascotaMod = await Mascota.findOneAndUpdate({ id: idMascota }, updatedData, { new: true });

        if (!MascotaMod) {
            res.status(404).json({
                message: "Mascota no encontrado",
                data: null
            });
            return;
        }

        res.status(200).json({
            message: "Mascota actualizado correctamente!",
            data: MascotaMod
        });
    }catch(error){
        console.log("Error en mascota.controller.js -> UpdateMascota():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}
