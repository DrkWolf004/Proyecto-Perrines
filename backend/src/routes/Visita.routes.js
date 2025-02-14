"use strict";

//importar el modulo express
import { Router } from "express";

import { obtenerVisitas,crearVisita, actualizarVisita, deleteVisita, getVisita } from "../controllers/Visita.controller.js"; 

/** Middlewares de autorizacion */
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();

// Obtener todas las visitas de una mascota
router.get('/', obtenerVisitas);

// Crear una nueva visita (solo administradores)
router.post('/',isAdmin ,crearVisita);

// Actualizar una visita existente (solo administradores)
router.put('/:id',isAdmin, actualizarVisita);

router.delete('/:id',isAdmin ,deleteVisita);
router.get('/:id', getVisita);

export default router;
