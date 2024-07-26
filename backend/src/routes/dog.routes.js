import { Router } from "express"; // Importa el módulo Router de Express
import { createDog, getDogs } from "../controllers/dog.controller.js"; // Importa los controladores createDog y getDogs

const router = Router(); // Crea una nueva instancia del enrutador

// Define una ruta POST en la raíz ("/") para crear un nuevo perro
// Cuando se recibe una solicitud POST en "/", se ejecuta la función createDog del controlador
router.post("/", createDog);

// Define una ruta GET en la raíz ("/") para obtener todos los perros
// Cuando se recibe una solicitud GET en "/", se ejecuta la función getDogs del controlador
router.get("/", getDogs);

export default router; // Exporta el enrutador para que pueda ser utilizado en otros módulos
