const { response , request } = require('express');
const bcryptjs = require('bcryptjs');
;

const Usuario = require('../models/usuario');



    // Leer la BD ------------------------------------------------------------------
    const usuariosGET = ( req = request , res = response ) => {
        
            // URL de ejemplo :  http://localhost:8080/api/usuarios?q=hola&name=stebe&page=20&limit=5
            // Asi se recojen los parametros opcionales de la URL
                const { q , name = 'No Name', page = 1 , limit } = req.params;
        //                              |            |
        //                              ---- --- -----> Si no nos envian dichos valores, se le podemos poner un valor por defecto.
        //                                                -------------- DESESTRUCTURACIÓN -----------
                res.json({              
                    msg: 'get API - controlador',
                    name,
                    q,
                    page,
                    limit
                });

    }


    // Guardar un Usuario en la BD -------------------------------------------------
    const usuariosPOST = async ( req = request , res = response ) => {


                                        /*  const body = req.body;                  ----> Si quisieramos guardar todo el objeto
                                            const usuario = new Usuario( body );

                                            const { nombre ...rest }                ----> O tamben asi
                                            const usuario = new Usuario( rest );
                                        */

        const { nombre, correo, password, rol } = req.body; // Elegimos que informacion queremos guardar en la BD, a modo de VALIDACIÓN.
        const usuario = new Usuario( { nombre, correo, password, rol } );    // ¡ Hay que instansear el modelo del usuario !         
                           
        
        // Verificar si el correo existe
        const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ) {
            return res.status(400).json({
                msg: 'Ese correo ya está registrado'
            });
        }

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password , salt );
        
        // Guardar en DB                                                   
        await usuario.save(); // mongoose guarda en la bd el modelo del usuario ya lleno con la info.

        res.json({           
        //  body
            usuario
        });
        
    }


    const usuariosPUT = ( req = request , res = response ) => {

        const IDusuario = req.params.IDusuario;   // Tambien podemos sesestructurar todos los parametros que vengan en la url asi:
                                    // const { id, otracosa, etc } = req.params;

        res.json({              
            msg: 'put API - controlador',
            IDusuario
        });
    }

    const usuariosPATCH = ( req = request , res = response ) => {
        res.json({              
            msg: 'patch API - controlador'
        });
    }

    const usuariosDELETE = ( req = request , res = response ) => {
        res.json({              
            msg: 'delete API - controlador'
        });
    }


module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}