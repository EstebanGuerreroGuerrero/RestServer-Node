const { response , request } = require('express');
const bcryptjs = require('bcryptjs');
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


    const usuariosPUT = async ( req = request , res = response ) => {

        const { id } = req.params;
        const { _id, password, google, correo, ...resto } = req.body; // Excluimos _id, pass, google, etc y enviamos el resto de datos para que se actualicen

        if( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync( password , salt );
        }

        const usuario = await Usuario.findOneAndUpdate( id , resto );

        res.json({              
            msg: 'put API - controlador',
            usuario
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