"use strict"

//  Importacion 

import Comment from "../models/comment.model.js";


//  Funciones

export async function create(req, res) { 
    try {
    const CommentData = req.body;

    const nuevoComment = new Comment({
        tittle: CommentData.tittle,
        descripcion: CommentData.descripcion,
        date: CommentData.date
    });
    
    await nuevoComment.save();

    res.status(201).json({
        message: "El anuncio se ha guardado correctamente",
        data: nuevoComment,
    });
}catch (error) { 
    console.log("Error en anuncios.controller.js -> crearAnuncio()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function deleteComment(req, res){
    try{
        const { idcomment } = req.params


        const comment = await Comment.findOneAndDelete( idcomment );

        if (!comment) {
            return res.status(404).json({
                message: "comentario no encontrado",
                data: null
            });
        }

        res.status(200).json({
            message: "Comentario eliminado exitosamente!",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> deleteComment():", error);
        res.status(500).json({ message: "Error interno del servidor." });
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
        const { id } = req.params
        const comment = await Comment.findOne(id );
        
        if(!comment){
            res.status(404).json({
                message: "Comentario no encontrado",
                data: null
            })
            return;
        }


        res.status(200).json({
            message: "Comentario encontrado",
            data: comment
        });
    }catch(error){
        console.log("Error en comment.controller.js -> getOne(): ", error);
        res.status(500).json({ message: error.message });
    }    
}

export async function edit(req,res){
    try {
        const { id } = req.params
        const updatedData = req.body;
        const comment = await Comment.findOneAndUpdate( id , updatedData, {new: true});
        res.status(200).json({
            message: "Comentario actualizado",
            data: comment
        });
    }
    catch(error){
        console.log("Error en comment.controller.js -> edit(): ", error);
        res.status(500).json({ message: error.message });
    }
}