const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Si el rol existe en la BD
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD.`);
    }
}

 // Verificar si el correo existe en BD
 const mailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya esta registrado.`);
    }
 }


 const idExiste = async( id ) => {
    const existeID = await Usuario.findById( id );
    if ( !existeID ) {
        throw new Error(`El id: ${ id }, no esta registrado en la BD.`);
    }
 }


module.exports = {
    esRoleValido,
    mailExiste,
    idExiste
}