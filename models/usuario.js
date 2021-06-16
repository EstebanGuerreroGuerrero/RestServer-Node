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

// Validacion de seguridad: Esto se utiliza para ocultar o mas bien, no retornar datos delicados al FRONT
UsuarioSchema.methods.toJSON = function() {
    const { __v , password , ...usuario } = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario' , UsuarioSchema );