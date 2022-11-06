const { Schema, model } = require('mongoose');

const CervezaSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    Graduacion: {
        type: String,
        required: [true, 'La graduación es obligatoria'],
    },
    Envase: {
        type: String,
        required: [true, 'El envase es obligatorio'],
    },
    Precio: {
        type: String,
        required: true
    },
});


module.exports = model( 'Cerveza', CervezaSchema );