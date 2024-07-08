import { Router } from "express";
import { getEncargados, createEncargado, updateEncargado, deleteEncargado,
    getVeterinarias, createVeterinaria, updateVeterinaria, deleteVeterinaria } from "../controllers/GestEmergency.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas para encargados
router.get("/encargados", getEncargados);
router.post("/encargados", createEncargado);
router.put("/encargados/:id", updateEncargado); // Protegida con isAdmin
router.delete("/encargados/:id", deleteEncargado);

// Rutas para veterinarias
router.get("/veterinarias", getVeterinarias);
router.post("/veterinarias", createVeterinaria);
router.put("/veterinarias/:id", updateVeterinaria); // Protegida con isAdmin
router.delete("/veterinarias/:id", deleteVeterinaria);

export default router;
