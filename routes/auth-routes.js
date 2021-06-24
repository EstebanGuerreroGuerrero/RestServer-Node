const { Router } = require('express'); // Extraimos una funcion de express llamada Router
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth-controller');





const router = Router();


router.post( '/login' , [
    check('correo' , 'El correo es obligatorio').isEmail(),
    check('password' , 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] , login );


module.exports = router;