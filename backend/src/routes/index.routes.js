"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/ Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/ Enrutador de autenticación /
import authRoutes from "./auth.routes.js";

/** Enrutador de mascota/
import MascotaRoutes from "./mascota.routes.js";

/** Enrutador de comentarios */
import commentroutes from "./comment.routes.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

//Defino las rutas de mascotas /api/mascota
router.use("/mascota", MascotaRoutes);

//Defino las rutas de comentarios /api/comment
router.use("/comment", commentroutes);


export default router;
<<<<<<< HEAD
=======



>>>>>>> main
