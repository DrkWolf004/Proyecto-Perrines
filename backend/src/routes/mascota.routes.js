"use strict";
//importar el modulo express
import { Router } from "express";

/** Controlador de mascotas */
import { createMascota, DeleteMascota, GetMascota, GetMascotas, UpdateMascota } from "../controllers/mascota.controller.js";

/** Middlewares de autorizacion */
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

//Realizo una instancia de express
const router = Router();

//Defino las rutas de mascota
router.post('/',isAdmin ,createMascota);
router.delete('/',isAdmin ,DeleteMascota);
router.get('/', GetMascotas);
router.get('/1', GetMascota);
router.put('/',isAdmin ,UpdateMascota);


export default router;