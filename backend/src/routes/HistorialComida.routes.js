"use strict";
//importar el modulo express
import { Router } from "express";

/** Controlador de Historial comida */
import { createHistorial, updateHistorial, getHistorial, getHistoriales, deleteHistorial } from "../controllers/HistorialComida.controller.js";

/** Middlewares de autorizacion */
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

//Realizo una instancia de express
const router = Router();

//Defino las rutas de Historial comida
router.post('/', createHistorial);
router.delete('/:id', deleteHistorial);
router.get('/', getHistoriales);
router.get('/:id', getHistorial);
router.put('/:id', updateHistorial);

export default router;