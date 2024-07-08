"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

// Importa el controlador 'anuncios.controller.js'
import * as anunciosController from "../controllers/anuncios.controller";

// Importa las validaciones
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

// Crea una instancia de un router

const router = Router();

router.post('/', anunciosController.crearAnuncio);
router.put('/', anunciosController.actualizarAnuncio);
router.delete('/', anunciosController.eliminarAnuncio);
router.get('/', anunciosController.obternerAnuncios);
router.get('/comentario', anunciosController.obternerComentarios);


export default router;