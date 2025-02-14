"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de mascota */
import MascotaRoutes from "./mascota.routes.js";

/** Enrutador de HistorialComida */
import HistorialRoutes from "./HistorialComida.routes.js";

/** Enrutador de comentarios */
import commentroutes from "./comment.routes.js";

/** Enrutador de gestión de emergencia */
import gestEmergencyRoutes from "./GestEmergency.routes.js";

/** Enrutador de visitas */
import VisitasRoutes from "./Visita.routes.js";

/** Enrutador de anuncios */
import AnunciosRoutes from "./anuncios.routes.js";

/** Enrutador de perros */
import dogRoutes from "./dog.routes.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/user
router.use("/user", userRoutes);

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas de mascotas /api/mascota
router.use("/mascota", MascotaRoutes);

// Define las rutas de HistorialComidas /api/comida
router.use("/comida", HistorialRoutes);

// Define las rutas de comentarios /api/comment
router.use("/comment", commentroutes);

// Define las rutas de gestión de emergencia /api/gest-emergency
router.use("/gest-emergency", gestEmergencyRoutes);
// Define las rutas de visitas /api/visita
router.use("/visita", VisitasRoutes);

// Define las rutas de anuncios /api/anuncios
router.use("/anuncios", AnunciosRoutes);

// Define las rutas de perros /api/dog
router.use("/dog", dogRoutes);

// Exporta el modulo de rutas
export default router;
