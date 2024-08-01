import { Router } from "express"; // Importa el módulo Router de Express
import { createDog, getDogs, deleteDogs, updateDogs } from "../controllers/dog.controller.js"; // Importa los controladores createDog y getDogs
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router(); // Crea una nueva instancia del enrutador

// Define una ruta POST en la raíz ("/") para crear un nuevo perro
// Cuando se recibe una solicitud POST en "/", se ejecuta la función createDog del controlador
router.post("/", createDog);

// Define una ruta GET en la raíz ("/") para obtener todos los perros
// Cuando se recibe una solicitud GET en "/", se ejecuta la función getDogs del controlador
router.get("/", getDogs);
router.delete('/delete/:id',isAdmin ,deleteDogs);
router.put('/:id',isAdmin ,updateDogs);

export default router; // Exporta el enrutador para que pueda ser utilizado en otros módulos
