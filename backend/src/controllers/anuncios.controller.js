import Anuncio from "../models/anuncios.model.js";
import Completar from "../models/completar.model.js";

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
    
            const existenComentarios = await Completar.findOne({ descripcion: ComentarioData.descripcion });
            if (existenComentarios) {
                return res.status(200).json({ message: "Ya existe un comentario con esa descripción" });
            }
            const nuevoComentario = new Completar({
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
        const AnuncioData = req.body;
        const anuncio = await Anuncio.findByIdAndUpdate(id, AnuncioData, { new: true });
        if (!anuncio) {
            return res.status(404).json({
                message: "No se encontró el anuncio con el id " + id,
            });
        }
        res.status(200).json({
            message: "Anuncio actualizado",
            data: anuncio,
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

// eliminar un comentario por id

export async function eliminarComentario(req, res){
    try {
        const { id } = req.params;
        const comentario = await Completar.findByIdAndDelete(id);
        if (!comentario) {
            return res.status(404).json({
                message: "No se encontró el comentario con el id " + id,
            });
        }
        res.status(200).json({
            message: "Comentario eliminado",
            data: comentario,
        });
    } catch (error) {
        console.log("Error en anuncios.controller.js -> eliminarComentario()", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }


}