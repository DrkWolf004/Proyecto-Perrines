"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

// Importa el controlador 'anuncios.controller.js'
import {crearAnuncio,actualizarAnuncio,eliminarAnuncio,obternerAnuncios,obternerComentarios, crearComentario } from "../controllers/anuncios.controller.js";

// Importa las validaciones
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

// Crea una instancia de un router

const router = Router();

router.post('/',isAdmin ,crearAnuncio);
router.put('/:id',isAdmin ,actualizarAnuncio);
router.delete('/:id',isAdmin ,eliminarAnuncio);
router.get('/',obternerAnuncios);
router.post('/comentario',crearComentario);
router.get('/comentario',obternerComentarios);


export default router;