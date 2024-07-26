//importar el modulo express
import { Router } from "express";

import { getEncargados, createEncargado, updateEncargado, deleteEncargado,
<<<<<<< HEAD
    getVeterinarias, createVeterinaria, updateVeterinaria, deleteVeterinaria } from "../controllers/info.controller.js";

// Middlewares de autorizacion
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";
=======
    getVeterinarias, createVeterinaria, updateVeterinaria, deleteVeterinaria } from "../controllers/GestEmergency.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
>>>>>>> e817585ec254159b280b227ea7d622a8beeeca4b

const router = Router();

// Rutas para encargados
<<<<<<< HEAD
router.get("/encargados", isUser, getEncargados); // Visualización de los datos (usuarios)

// Protegida con isAdmin
router.post("/encargados", isAdmin, createEncargado); 
router.put("/encargados/:id", isAdmin, updateEncargado); 
router.delete("/encargados/:id", isAdmin, deleteEncargado);
=======
router.get("/encargados", getEncargados);
router.post("/encargados", createEncargado);
router.put("/encargados/:id", updateEncargado); // Protegida con isAdmin
router.delete("/encargados/:id", deleteEncargado);
>>>>>>> e817585ec254159b280b227ea7d622a8beeeca4b


// Rutas para veterinarias
<<<<<<< HEAD
router.get("/veterinarias", isUser, getVeterinarias); // Visualización de los datos (usuarios)

// Protegida con isAdmin
router.post("/veterinarias", isAdmin, createVeterinaria); 
router.put("/veterinarias/:id", isAdmin, updateVeterinaria); 
router.delete("/veterinarias/:id", isAdmin, deleteVeterinaria);
=======
router.get("/veterinarias", getVeterinarias);
router.post("/veterinarias", createVeterinaria);
router.put("/veterinarias/:id", updateVeterinaria); // Protegida con isAdmin
router.delete("/veterinarias/:id", deleteVeterinaria);
>>>>>>> e817585ec254159b280b227ea7d622a8beeeca4b

export default router;
