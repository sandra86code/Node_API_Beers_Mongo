const { Schema, model } = require('mongoose');

const BarSchema = Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    Direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        unique: true 
    },
    Ciudad: {
        type: String,
    },
    Telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio']
    },
});

module.exports = model( 'Bar', BarSchema );