"use strict";

// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { create, edit, deleteComment, getAll, getOne } from "../controllers/comment.controller.js";

import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", create);
router.put("/edit", edit);
router.delete("/delete", deleteComment);
router.get("/getAll", getAll);
router.get("/getOne", getOne);

export default router;