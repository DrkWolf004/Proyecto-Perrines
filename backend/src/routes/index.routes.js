"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de mascota */
import mascotaRoutes from "./mascota.routes.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

//Defino las rutas de mascotas /api/mascota
router.use("/mascota", mascotaRoutes);

export default router;
