const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true , 'El nombre es obligatorio' ]
    },
    correo: {
        type: String,
        required: [ true , 'El correo es obligatorio' ],
        unique: true   // IMPORTANTE: Validacin New Style - Que no exista otro correo igual en la BD.
    },
    password: {
        type: String,
        required: [ true , 'El nombre es obligatorio' ]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: [ 'ADMIN_ROLE' , 'USER_ROLE' ]
    }
});


module.exports = model( 'Usuario' , UsuarioSchema );