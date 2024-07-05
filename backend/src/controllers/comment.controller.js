"use strict"

//  Importacion 

import Comment from "../models/comment.model.js";


//  Funciones

export async function create(req,res){
    try {
        const comment = await comment.create(req.body);
        res.status(201).json({
            message: "Comentario creado",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> create(): ", error);
        res.status(500).json({ message: error.message });
    }
}

