// Importaciones de modelos
import Encargado from '../models/Encargado.model.js';
import Veterinaria from '../models/Veterinaria.model.js';

// Encargado controllers

// Obtener todos los encargados
export async function getEncargados(req, res) {
    try {
        const encargados = await Encargado.find(); 

        if (encargados.length === 0) {
            return res.status(404).json({ message: "Encargado no encontrado" });
        }
        res.status(200).json({ message:"Lista de encargados", data: encargados});
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los encargados", error });
    }
}

// Crear un nuevo encargado
export async function createEncargado(req, res) {

    const EncargadoData = req.body; 

    try {
        const newEncargado = new Encargado({ 
            nombre:EncargadoData.nombre, 
            correo:EncargadoData.correo, 
            telefono:EncargadoData.telefono, 
            disponibilidad:EncargadoData.disponibilidad
            
        }); 

        await newEncargado.save(); 

        res.status(201).json({ 
            message: "Encargado creado exitosamente",
            data: newEncargado
        });
    } catch (error) { 
        console.log("Error en GestEmergency.controller.js -> createEncargado():", error),
        res.status(500).json({ message: "Error interno del servidor." }); 
        
    }
}

// Actualizar un encargado por su ID
export async function updateEncargado(req, res) {
    const { id } = req.params; 
    const updatedData = req.body;

    try { 
        const updatedEncargado = await Encargado.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedEncargado) {
            return res.status(404).json({ message: "Encargado no encontrado" });
        }

        res.status(200).json(updatedEncargado);

    } catch (error) { 
        res.status(500).json({ message: "Error al actualizar el encargado", error });
    }
}

// Eliminar un encargado por su ID
export async function deleteEncargado(req, res) {
    const { id } = req.params;

    try {
        const deletedEncargado = await Encargado.findByIdAndDelete(id);

        if (!deletedEncargado) { 
            return res.status(404).json({ message: "Encargado no encontrado" });
        }

        res.status(200).json({ message: "Encargado eliminado correctamente" });

    } catch (error) { 
        res.status(500).json({ message: "Error al eliminar el encargado", error });
    }
}

// Veterinaria controllers

// Obtener todas las veterinarias
export async function getVeterinarias(req, res) {
    try {
        const veterinarias = await Veterinaria.find();

        if (veterinarias.length === 0) {
            return res.status(404).json({ message: "Veterinaria no encontrada" });
        }

        res.status(200).json(veterinarias);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las veterinarias", error });
    }
}

// Crear una nueva veterinaria
export async function createVeterinaria(req, res) {
    const VeterinariaData = req.body;

    try {
        const newVeterinaria = new Veterinaria({ 

            nombre:VeterinariaData.nombre, 
            telefono:VeterinariaData.telefono, 
            direccion:VeterinariaData.direccion, 
            horarioinicio:VeterinariaData.horarioinicio, 
            horariofin:VeterinariaData.horariofin 
        });
        
        await newVeterinaria.save();

        res.status(201).json({ 
            message: "Veterinaria registrada exitosamente",
            data: newVeterinaria
        });

    } catch (error) {
        console.log("Error en GestEmergency.controller.js -> createVeterinaria():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

// Actualizar una veterinaria por su ID
export async function updateVeterinaria(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedVeterinaria = await Veterinaria.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedVeterinaria) {
            return res.status(404).json({ message: "Veterinaria no encontrada" });
        }

        // Verificar y actualizar la disponibilidad basada en el horario
        updatedVeterinaria.disponibilidad = verificarDisponibilidad(updatedVeterinaria.horario);
        await updatedVeterinaria.save();

        res.status(200).json(updatedVeterinaria);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la veterinaria", error });
    }
}

// Eliminar una veterinaria por su ID
export async function deleteVeterinaria(req, res) {
    const { id } = req.params;

    try {
        const deletedVeterinaria = await Veterinaria.findByIdAndDelete(id);

        if (!deletedVeterinaria) {
            return res.status(404).json({ message: "Veterinaria no encontrada" });
        }

        res.status(200).json({ message: "Veterinaria eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la veterinaria", error });
    }
}

// Función para verificar la disponibilidad basada en el horario actual
function verificarDisponibilidad(horario) {
    if (!horario || !horario.inicio || !horario.fin) { 
        return false; 
    }

    // obtenemos la hora y minutos actuales
    const ahora = new Date(); 
    const horaActual = ahora.getHours(); 
    const minutoActual = ahora.getMinutes(); 

    
    const inicio = parseInt(horario.inicio.split(':')[0]);

    if (horaActual > inicio && horaActual < fin) {
        return true;
    } else if (horaActual === inicio && minutoActual >= parseInt(horario.inicio.split(':')[1])) { 
        return true;
    } else if (horaActual === fin && minutoActual <= parseInt(horario.fin.split(':')[1])) { 
        return true;
    }

    return false;
}
