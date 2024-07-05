"use strict"

//  Importacion 

import Comment from "../models/comment.model.js";


//  Funciones

export async function create(req,res){
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json({
            message: "Comentario creado",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> create(): ", error);
        res.status(500).json({ message: error.message });
    }

}
export async function edit(req,res){
    try {
        const id = req.query.id;
        const updatedData = req.body;
        const comment = await Comment.findByIdAndUpdate(id, updatedData, {new: true});
        res.status(200).json({
            message: "Comentario actualizado",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> edit(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteComment(req,res){
    try {
        const id = req.query.id;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            message: "Comentario eliminado",
            data: null
        });
    }catch(error){
        console.log("Error en comment.controller.js -> deleteComment(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getAll(req,res){
    try {
        const comments = await Comment.find();
        res.status(200).json({
            message: "Lista de comentarios",
            data: comments
        });
    }catch(error){
        console.log("Error en comment.controller.js -> getAll(): ", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getOne(req,res){
    try {
        const id = req.query.id;
        const comment = await Comment.findById(id);
        res.status(200).json({
            message: "Comentario encontrado",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> getOne(): ", error);
        res.status(500).json({ message: error.message });
    }
}