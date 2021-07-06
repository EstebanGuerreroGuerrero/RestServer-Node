const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');


    /**
     * Validaciones de USUARIO
     */

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

    const usuarioExiste = async( id ) => {
        const existeID = await Usuario.findById( id );
        if ( !existeID ) {
            throw new Error(`El Usuario con id: ${ id }, no esta registrado en la BD.`);
        }
    }

/**
 * Validaciones de CATEGORIA
 */
    const existeCategoria = async( id ) => {
        const existeID = await Categoria.findById( id );
        if ( !existeID ) {
            throw new Error(`La Categoria con id: ${ id }, no esta registrado en la BD.`);
        }
    }


module.exports = {
    esRoleValido,
    mailExiste,
    usuarioExiste,
    existeCategoria
}