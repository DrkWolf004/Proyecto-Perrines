"use strict";

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
    },

    descripcion: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

});


export default mongoose.model('Comment', commentSchema);

