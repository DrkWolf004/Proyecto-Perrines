"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { create, edit, deleteComment, getAll, getOne } from "../controllers/comment.controller.js";

import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', create);
router.put('/', edit);
router.delete('/', deleteComment);
router.get('/', getAll);
router.get('/', getOne);

export default router;