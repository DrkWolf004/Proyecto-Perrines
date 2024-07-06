"use strict";

//importar el modulo express
import { express } from "express";
import { visitaController } from "../controllers/Visita.controller"; 

const router = express.Router();

// Obtener todas las visitas de una mascota
router.get('/:mascotaId', visitaController.obtenerVisitas);

// Crear una nueva visita (solo administradores)
router.post('/', visitaController.crearVisita);

// Actualizar una visita existente (solo administradores)
router.put('/:id', visitaController.actualizarVisita);

module.exports = router;
