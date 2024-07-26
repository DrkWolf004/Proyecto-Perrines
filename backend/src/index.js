// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { PORT, HOST, PASS_SECRET } from "./config/configEnv.js";
// Importa el módulo 'cors' para agregar los cors
import cors from "cors";
// Importa el módulo 'express' para crear la aplicacion web
import express, { urlencoded, json } from "express";
// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from "morgan";
// Importa el módulo 'express-session' para la gestión de sesiones
import session from "express-session";
/** El enrutador principal */
import indexRoutes from "./routes/index.routes.js";
// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import { connectDB } from "./config/configDB.js";
// Importa la funcion para crear roles y usuarios
import { createRoles, createUsers } from "./config/initSetup.js";

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const app = express();
    app.disable("x-powered-by"); // Deshabilita el encabezado 'X-Powered-By' por razones de seguridad

    // Configuración de express-session
    app.use(
      session({
        name: "miCookie", // Nombre de la cookie
        secret: PASS_SECRET, // Secreto usado para firmar la cookie
        resave: false, // No guarda la sesión si no hay modificaciones
        saveUninitialized: false, // No guarda sesiones no inicializadas
      })
    );

    // Agregamos los cors
    app.use(cors({ credentials: true, origin: true })); // Habilita CORS con las credenciales permitidas
    // Agrega el middleware para el manejo de datos en formato URL
    app.use(urlencoded({ extended: true })); // Permite el análisis de cuerpos codificados en URL
    // Agrega el middleware para el manejo de datos en formato JSON
    app.use(json()); // Permite el análisis de cuerpos JSON
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    app.use(morgan("dev")); // Usa morgan en modo desarrollo para registrar solicitudes
    // Agrega el enrutador principal al servidor
    app.use("/api", indexRoutes); // Usa las rutas definidas en indexRoutes para las rutas que comienzan con /api

    // Inicia el servidor en el puerto especificado
    app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`); // Muestra un mensaje cuando el servidor está corriendo
    });
  } catch (err) {
    console.log("Error en server.js -> setupServer(): ", err); // Manejo de errores
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await connectDB(); // Llama a la función para conectar a la base de datos
    // Inicia el servidor web
    await setupServer(); // Llama a la función para configurar y empezar el servidor
    // Inicia la creación de los roles
    await createRoles(); // Llama a la función para crear roles iniciales
    // Inicia la creación del usuario admin y user
    await createUsers(); // Llama a la función para crear usuarios iniciales
  } catch (err) {
    console.log("Error en server.js -> setupAPI(): ", err); // Manejo de errores
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente")) // Muestra un mensaje cuando la API se ha iniciado con éxito
  .catch((err) => console.log("Error en server.js -> setupAPI(): ", err)); // Manejo de errores en la inicialización de la API
