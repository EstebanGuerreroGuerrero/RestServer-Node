const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');


const { validarCampos,
        validarJWT,
        esAdmin,
        tieneRol } = require('../middlewares'); // TODO esto solo es para importar una carpeta completa en una sola importacion...

const { esRoleValido , mailExiste , idExiste } = require('../helpers/db-validators');


const { usuariosGET, 
        usuariosPOST, 
        usuariosPUT, 
        usuariosPATCH, 
        usuariosDELETE } = require('../controllers/usuarios-controller');

const router = Router(); 






    // EndPoints GET, POST, DELETE, etc.
// EJEMPLO:
//  router.get( 'URL' , funcionCorrespondiente );

    // Leer
    router.get( '/' , usuariosGET );

    // Escribir
    router.post( '/' , [
        // ---- Validaciones -----
        check('nombre'),
        check('password' , 'Password de minimo 6 caracteres').isLength({ min: 6}),
        check('correo' , 'El correo no es válido').isEmail(),
        check('correo').custom( mailExiste ),
        // check('rol' , 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
        check('rol').custom( esRoleValido ),
        validarCampos
    ] , usuariosPOST );

    // Actualizar
    router.put( '/:id' , [
        // Aqui checkeamos todos los datos que queramos validar
        check('id' , 'No es un ID valido por mongo').isMongoId(),
        check('id').custom( idExiste ), 
        validarCampos
    ], usuariosPUT ); // :id express recoje este valor que viene en la URL para poder utilizarlo.

    router.patch( '/' , usuariosPATCH );

    // Borrar
    router.delete( '/:id' ,[
        validarJWT,
        //esAdmin, ----> Validacion ADMIN
        tieneRol('ADMIN_ROLE' , 'VENTAS_ROLE'), // Validacion X roles.
        check('id' , 'No es un ID valido por mongo').isMongoId(),
        check('id').custom( idExiste ), 
        validarCampos
    ], usuariosDELETE );
            //       status() = Tambie se pueden mandar los status de las peticiones, para que el programador front end tenga informacion.

module.exports = router;