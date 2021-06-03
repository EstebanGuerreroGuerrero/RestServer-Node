const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE } = require('../controllers/usuarios-routes');

const router = Router(); 

    // EndPoints:
        //       status() = se mandan los status de las peticiones, para que el programador front end tenga informacion.

// EJEMPLO:
//      router.get( 'URL' , funcionCorrespondiente )
    router.get( '/' , usuariosGET );
    router.post( '/' , usuariosPOST );
    router.put( '/:IDusuario' , usuariosPUT ); // :id express recoje este valor que viene en la URL para poder utilizarlo.
    router.patch( '/' , usuariosPATCH );
    router.delete( '/' , usuariosDELETE );


module.exports = router;