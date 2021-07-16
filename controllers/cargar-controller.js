const { response } = require('express');



const cargarArchivo = ( req , res = response ) => {

    res.json({
        msg: 'Cargar exitoso jjjaa'
    })

}


module.exports = {
    cargarArchivo
}