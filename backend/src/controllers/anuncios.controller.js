"use strict"
import Anuncio from "../models/anuncios.model.js";
import completar from "../models/completar.model.js";

// crear y guardar un nuevo anuncio

export async function crearAnuncio(req, res) { 
    try {
    const AnuncioData = req.body;

    const existenAnuncios = await Anuncio.findOne({ titulo: AnuncioData.titulo });
    if (existenAnuncios) {
       return res.status(200).json({ message: "Ya existe un anuncio con ese título" });
    }
    const nuevoAnuncio = new Anuncio({
        titulo : AnuncioData.titulo,
        descripcion : AnuncioData.descripcion,
    });
    await nuevoAnuncio.save();
    res.status(201).json({
        message: "El anuncio se ha guardado correctamente",
        data: nuevoAnuncio,
    });
}catch (error) { 
    console.log("Error en anuncios.controller.js -> crearAnuncio()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
    
// crear y guardar un nuevo comentario

export async function crearComentario(req, res) { 
    try {
        const ComentarioData = req.body;

        const nuevoComentario = new completar({

            id : ComentarioData.id,
            descripcion : ComentarioData.descripcion,
            marca : ComentarioData.marca,

        });
        
        await nuevoComentario.save();

        res.status(201).json({
            message: "El comentario se ha guardado correctamente",
            data: nuevoComentario,
        });
    }catch (error) { 
        console.log("Error en anuncios.controller.js -> crearComentario()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }    
}

// Obtener todos los anuncios

export async function obternerAnuncios(req, res){
    try {
        const anuncios = await Anuncio.find();

        res.status(200).json({
            message: "Lista de anuncios",
            data: anuncios,
        });

    } catch (error) {
        console.log("Error en anuncios.controller.js -> obtenerAnuncios()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Obtener todos los comentarios

export async function obternerComentarios(req, res){
    try {

        const comentarios = await Completar.find().populate("id");

        res.status(200).json({
            message: "Lista de comentarios",
            data: comentarios,
        });

    } catch (error) {
        console.log("Error en anuncios.controller.js -> obtenerComentarios()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// actualizar un anuncio por id

export async function actualizarAnuncio(req, res){
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const anuncioupdate = await Anuncio.findByIdAndUpdate(id, updatedData, { new: true });

        if (!anuncioupdate) {
            return res.status(404).json({ message: 'id de anuncio no encontrada' });
        }
        res.status(200).json({
            message: "Anuncio actualizado",
            data: anuncioupdate,
        });
    } catch (error) {
        console.log("Error en anuncios.controller.js -> actualizarAnuncio()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// eliminar un anuncio por id

export async function eliminarAnuncio(req, res){
    try {
        const { id } = req.params;
        const anuncio = await Anuncio.findByIdAndDelete(id);
        if (!anuncio) {
            return res.status(404).json({
                message: "No se encontró el anuncio con el id " + id,
            });
        }
        res.status(200).json({
            message: "Anuncio eliminado",
            data: anuncio,
        });
    } catch (error) {
        console.log("Error en anuncios.controller.js -> eliminarAnuncio()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
