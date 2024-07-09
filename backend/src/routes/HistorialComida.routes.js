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

//admin
router.post('/',isAdmin ,createHistorial);
router.delete('/:id',isAdmin, deleteHistorial);
router.get('/',isAdmin, getHistoriales);
router.get('/:id',isAdmin, getHistorial);
router.put('/:id',isAdmin, updateHistorial);

//usuario
router.post('/',isUser ,createHistorial);
router.delete('/:id',isUser, deleteHistorial);
router.get('/',isUser, getHistoriales);
router.get('/:id',isUser, getHistorial);
router.put('/:id',isUser, updateHistorial);


export default router;