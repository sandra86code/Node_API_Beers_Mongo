const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    Nick: {
        type: String,
        required: [true, 'El nick es obligatorio'],
        unique: true
    },
    Password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    Email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    Nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    Apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
    }
});


module.exports = model( 'Usuario', UsuarioSchema );