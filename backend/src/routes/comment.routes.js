"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { create, edit, deleteComment, getAll, getOne } from "../controllers/comment.controller.js";

import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();
//admin
router.post('/',create);
router.put('/', edit);
router.delete('/', deleteComment);
router.get('/', getAll);
router.get('/1', getOne);



export default router;