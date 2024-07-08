//importar el modulo express
import { Router } from "express";

import { getEncargados, createEncargado, updateEncargado, deleteEncargado,
    getVeterinarias, createVeterinaria, updateVeterinaria, deleteVeterinaria } from "../controllers/info.controller.js";

// Middlewares de autorizacion
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas para encargados
router.get("/encargados", isUser, getEncargados); // Visualización de los datos (usuarios)

// Protegida con isAdmin
router.post("/encargados", isAdmin, createEncargado); 
router.put("/encargados/:id", isAdmin, updateEncargado); 
router.delete("/encargados/:id", isAdmin, deleteEncargado);


// Rutas para veterinarias
router.get("/veterinarias", isUser, getVeterinarias); // Visualización de los datos (usuarios)

// Protegida con isAdmin
router.post("/veterinarias", isAdmin, createVeterinaria); 
router.put("/veterinarias/:id", isAdmin, updateVeterinaria); 
router.delete("/veterinarias/:id", isAdmin, deleteVeterinaria);

export default router;
