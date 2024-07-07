import { Router } from "express";
import { getEncargados, createEncargado, updateEncargado, deleteEncargado,
    getVeterinarias, createVeterinaria, updateVeterinaria, deleteVeterinaria } from "../controllers/info.controller";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas para encargados
router.get("/encargados", isAdmin, getEncargados);
router.post("/encargados", isAdmin, createEncargado);
router.put("/encargados/:id", isAdmin, updateEncargado);
router.delete("/encargados/:id", isAdmin, deleteEncargado);

// Rutas para veterinarias
router.get("/veterinarias", isAdmin, getVeterinarias);
router.post("/veterinarias", isAdmin, createVeterinaria);
router.put("/veterinarias/:id", isAdmin, updateVeterinaria);
router.delete("/veterinarias/:id", isAdmin, deleteVeterinaria);

export default router;
