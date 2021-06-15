const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');

const { usuariosGET, usuariosPOST, usuariosPUT, usuariosPATCH, usuariosDELETE } = require('../controllers/usuarios-routes');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido } = require('../helpers/db-validators');

const router = Router(); 

    // EndPoints GET, POST, DELETE, etc.
// EJEMPLO:
//  router.get( 'URL' , funcionCorrespondiente );

    router.get( '/' , usuariosGET );

    router.post( '/' , [
        // ---- Validaciones -----
        check('nombre'),
        check('password' , 'Password de minimo 6 caracteres').isLength({ min: 6}),
        check('correo' , 'El correo no es válido').isEmail(),
        // check('rol' , 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
        check('rol').custom( esRoleValido ),
        validarCampos
    ] , usuariosPOST );

    router.put( '/:IDusuario' , usuariosPUT ); // :id express recoje este valor que viene en la URL para poder utilizarlo.

    router.patch( '/' , usuariosPATCH );

    router.delete( '/' , usuariosDELETE );
            //       status() = Tambie se pueden mandar los status de las peticiones, para que el programador front end tenga informacion.

module.exports = router;