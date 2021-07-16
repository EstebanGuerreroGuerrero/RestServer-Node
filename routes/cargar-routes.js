const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');

const { cargarArchivo } = require('../controllers/cargar-controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

    router.get( '/' , cargarArchivo );


module.exports = router;