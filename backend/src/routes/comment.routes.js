"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { create, edit, deleteComment, getAll, getOne } from "../controllers/comment.controller.js";

const router = Router();
//admin
router.post('/',create);
router.put('/:id', edit);
router.delete('/delete/:id', deleteComment);
router.get('/', getAll);
router.get('/:id', getOne);



export default router;