const { response , request } = require('express');





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



    const usuariosPOST = ( req = request , res = response ) => {

        const body = req.body;  // req: SOLICITAMOS informacion
                                // Podemos desestructurar esta sentencia para extraer solo los elementos que queremos del JSON
                                // así: const { nombre, edad, apellido, etc } = req.body;
        res.json({             // res: ENVIAMOS informacion 
            msg: 'post API - controladorjja',
            body    //*No tira el body no se pq*
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