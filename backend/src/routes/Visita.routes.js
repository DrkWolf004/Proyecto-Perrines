"use strict";

//importar el modulo express
import { express } from "express";
import { obtenerVisitas,crearVisita,actualizarVisita } from "../controllers/Visita.controller"; 

const router = express.Router();

// Obtener todas las visitas de una mascota
router.get('/', obtenerVisitas);

// Crear una nueva visita (solo administradores)
router.post('/', crearVisita);

// Actualizar una visita existente (solo administradores)
router.put('/', actualizarVisita);

export default router;
