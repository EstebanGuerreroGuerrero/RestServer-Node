const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen } = require('../controllers/cargar-controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos , validarArchivoSubir } = require('../middlewares');


const router = Router();

    router.post( '/' , validarArchivoSubir , cargarArchivo );

    router.put( '/:coleccion/:id' , 
        [
            validarArchivoSubir,
            check( 'id', 'El id debe ser de mongo' ).isMongoId(),
            check( 'coleccion' ).custom( c => coleccionesPermitidas( c , [ 'usuarios' , 'productos' ] ) ),
            validarCampos
        ] 
            , actualizarImagen )


module.exports = router;