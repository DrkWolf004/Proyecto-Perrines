// Importaciones de modelos
import Encargado from '../models/encargado.model.js';
import Veterinaria from '../models/veterinaria.model.js';

// Encargado controllers

// Obtener todos los encargados
export async function getEncargados(req, res) {
    try {
        const encargados = await Encargado.find();
        res.status(200).json(encargados);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los encargados", error });
    }
}

// Crear un nuevo encargado
export async function createEncargado(req, res) {
    const { nombre, correo, telefono } = req.body;

    try {
        const newEncargado = new Encargado({ nombre, correo, telefono });
        await newEncargado.save();
        res.status(201).json(newEncargado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el encargado", error });
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
        res.status(200).json(veterinarias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las veterinarias", error });
    }
}

// Crear una nueva veterinaria
export async function createVeterinaria(req, res) {
    const { nombre, telefono, direccion, horario } = req.body;

    try {
        const newVeterinaria = new Veterinaria({ nombre, telefono, direccion, horario });
        newVeterinaria.disponibilidad = verificarDisponibilidad(horario); // Verificar disponibilidad al crear
        await newVeterinaria.save();
        res.status(201).json(newVeterinaria);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la veterinaria", error });
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

    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutoActual = ahora.getMinutes();

    const inicio = parseInt(horario.inicio.split(':')[0]);
    const fin = parseInt(horario.fin.split(':')[0]);

    if (horaActual > inicio && horaActual < fin) {
        return true;
    } else if (horaActual === inicio && minutoActual >= parseInt(horario.inicio.split(':')[1])) {
        return true;
    } else if (horaActual === fin && minutoActual <= parseInt(horario.fin.split(':')[1])) {
        return true;
    }

    return false;
}
