"use strict";
//importar el modulo express
import { Router } from "express";

/** Controlador de mascotas */
import { createMascota } from "../controllers/mascota.controller";

/** Middlewares de autorizacion */
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

//Realizo una instancia de express
const router = Router();

//Defino las rutas de mascota
router.post('/', createMascota);

export default router;