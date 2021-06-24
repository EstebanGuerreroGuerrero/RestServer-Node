const { request , response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');




const login = async ( req = request , res = response ) => {

    const { correo , password } = req.body;


    try {



        const usuario = await Usuario.findOne({ correo });

        // Verificar si el email existe ---------
            if( !usuario ) {
                return res.status(400).json({
                    msg: 'Usuario no es correctos'
                });
            }

        // Si el usuario está activo ---------
            if( !usuario ) {
                return res.status(400).json({
                    msg: 'Usuario / Password no está activo | estado: false'
                });
            }

        // Verificar la contraseña  ----------
            const validPassword = bcryptjs.compareSync( password , usuario.password ); // Compara la contraseña que estan enviando con la que esta en la BD.

            if( !validPassword ) {
                return res.status(400).json({
                    msg: 'La password es incorrecta'
                });
            }

        // Generar el JWT  ----------------
            const token = await generarJWT( usuario.id );

            
        res.json({
            msg: 'Login ok',
            usuario,
            token
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}