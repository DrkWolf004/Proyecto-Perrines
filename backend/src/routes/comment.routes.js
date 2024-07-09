"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { create, edit, deleteComment, getAll, getOne } from "../controllers/comment.controller.js";

import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();
//admin
router.post('/',isAdmin ,create);
router.put('/',isAdmin, edit);
router.delete('/',isAdmin, deleteComment);
router.get('/',isAdmin, getAll);
router.get('/1',isAdmin, getOne);

//usuario
router.post('/',isUser ,create);
router.put('/',isUser, edit);
router.delete('/',isUser ,deleteComment);
router.get('/',isUser, getAll);
router.get('/1',isUser, getOne);


export default router;