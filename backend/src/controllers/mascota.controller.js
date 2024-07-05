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
            salud:MascotaData.salud,
            ultima_visita:MascotaData.ultima_visita,
            ultima_comida:MascotaData.ultima_comida
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

